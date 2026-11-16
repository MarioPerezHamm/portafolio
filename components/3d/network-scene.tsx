"use client"

import { useEffect, useMemo, useRef, useState, type MutableRefObject, type ReactNode } from "react"
import { Canvas, useFrame, type RootState } from "@react-three/fiber"
import { PerformanceMonitor } from "@react-three/drei"
import * as THREE from "three"
import type { MotionValue } from "framer-motion"
import {
  GRAPH_PRESETS,
  buildNetworkGraph,
  mulberry32,
  type EdgeKind,
  type GraphPreset,
  type NetworkGraph,
  type NodeKind,
  type SceneQuality,
} from "./network-graph"

export interface SceneScroll {
  hero: MotionValue<number>
  page: MotionValue<number>
  experience: MotionValue<number>
  heroEdge: MotionValue<number>
  experienceEdge: MotionValue<number>
}

interface PointerState {
  x: number
  y: number
  active: boolean
}

interface NetworkSceneProps {
  quality: SceneQuality
  scroll: SceneScroll
  reducedMotion: boolean
}

const FOG_NEAR = 9
const FOG_FAR = 30
const HOVER_RADIUS = 0.22
const TRAIL_GAP = 0.16
const MAX_POINT_SIZE = 320
const WIDE_VIEWPORT = 1024
const LABEL_DROP = 0.72

const CYAN = new THREE.Color("#00E5FF")
const GREEN = new THREE.Color("#00FF66")
const SLATE = new THREE.Color("#9FB3C8")

const NODE_STYLE: Record<NodeKind, { scale: number; halo: number; glow: number; drift: number; color: THREE.Color }> = {
  server: { scale: 0.2, halo: 1.8, glow: 0.3, drift: 0.1, color: CYAN },
  endpoint: { scale: 0.095, halo: 1, glow: 0.2, drift: 0.2, color: GREEN },
  client: { scale: 0.055, halo: 0.55, glow: 0.14, drift: 0.26, color: SLATE },
}

const EDGE_STYLE: Record<EdgeKind, { color: THREE.Color; strength: number }> = {
  backbone: { color: CYAN, strength: 0.5 },
  service: { color: GREEN, strength: 0.24 },
  access: { color: SLATE, strength: 0.2 },
}

const GLOW_VERTEX = /* glsl */ `
  attribute vec3 aColor;
  attribute float aSize;
  attribute float aIntensity;
  uniform float uScale;
  uniform float uMaxSize;
  uniform float uFogNear;
  uniform float uFogFar;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float depth = -mvPosition.z;
    vColor = aColor;
    vAlpha = aIntensity * (1.0 - smoothstep(uFogNear, uFogFar, depth));
    gl_PointSize = min(aSize * uScale / max(depth, 0.1), uMaxSize);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const GLOW_FRAGMENT = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float falloff = pow(max(1.0 - d, 0.0), 2.4);
    gl_FragColor = vec4(vColor, falloff * vAlpha);
    #include <colorspace_fragment>
  }
`

function createGlowMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uScale: { value: 400 },
      uMaxSize: { value: MAX_POINT_SIZE },
      uFogNear: { value: FOG_NEAR },
      uFogFar: { value: FOG_FAR },
    },
    vertexShader: GLOW_VERTEX,
    fragmentShader: GLOW_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
}

function createGlowGeometry(count: number) {
  const geometry = new THREE.BufferGeometry()
  const position = new THREE.BufferAttribute(new Float32Array(count * 3), 3)
  const size = new THREE.BufferAttribute(new Float32Array(count), 1)
  const intensity = new THREE.BufferAttribute(new Float32Array(count), 1)
  position.setUsage(THREE.DynamicDrawUsage)
  size.setUsage(THREE.DynamicDrawUsage)
  intensity.setUsage(THREE.DynamicDrawUsage)
  geometry.setAttribute("position", position)
  geometry.setAttribute("aColor", new THREE.BufferAttribute(new Float32Array(count * 3), 3))
  geometry.setAttribute("aSize", size)
  geometry.setAttribute("aIntensity", intensity)
  return geometry
}

function pointScale(state: RootState) {
  const camera = state.camera as THREE.PerspectiveCamera
  const halfFov = THREE.MathUtils.degToRad(camera.fov) / 2
  return (state.size.height * state.viewport.dpr) / (2 * Math.tan(halfFov))
}

function createSimulation(graph: NetworkGraph, preset: GraphPreset) {
  const nodeCount = graph.nodes.length
  const edgeCount = graph.edges.length
  const random = mulberry32(7)

  const haloGeometry = createGlowGeometry(nodeCount)
  const haloColor = haloGeometry.attributes.aColor.array as Float32Array
  graph.nodes.forEach((node, i) => {
    NODE_STYLE[node.kind].color.toArray(haloColor, i * 3)
  })

  const edgeGeometry = new THREE.BufferGeometry()
  const edgePosition = new THREE.BufferAttribute(new Float32Array(edgeCount * 6), 3)
  edgePosition.setUsage(THREE.DynamicDrawUsage)
  const edgeColor = new Float32Array(edgeCount * 6)
  graph.edgeKinds.forEach((kind, e) => {
    const { color, strength } = EDGE_STYLE[kind]
    for (let v = 0; v < 2; v++) {
      edgeColor[e * 6 + v * 3] = color.r * strength
      edgeColor[e * 6 + v * 3 + 1] = color.g * strength
      edgeColor[e * 6 + v * 3 + 2] = color.b * strength
    }
  })
  edgeGeometry.setAttribute("position", edgePosition)
  edgeGeometry.setAttribute("color", new THREE.BufferAttribute(edgeColor, 3))

  const packetCount = edgeCount > 0 ? preset.packets : 0
  const packetGeometry = createGlowGeometry(packetCount * preset.trail)
  const packetColor = packetGeometry.attributes.aColor.array as Float32Array
  const packetSize = packetGeometry.attributes.aSize.array as Float32Array
  const packetIntensity = packetGeometry.attributes.aIntensity.array as Float32Array
  const packetEdge = new Int32Array(packetCount)
  const packetFrom = new Int32Array(packetCount)
  const packetTo = new Int32Array(packetCount)
  const packetProgress = new Float32Array(packetCount)
  const packetSpeed = new Float32Array(packetCount)

  for (let p = 0; p < packetCount; p++) {
    const edge = Math.floor(random() * edgeCount)
    const [a, b] = graph.edges[edge]
    const forward = random() > 0.5
    packetEdge[p] = edge
    packetFrom[p] = forward ? a : b
    packetTo[p] = forward ? b : a
    packetProgress[p] = random()
    packetSpeed[p] = 1.5 + random() * 1.9
    const color = random() > 0.32 ? CYAN : GREEN
    for (let k = 0; k < preset.trail; k++) {
      const index = p * preset.trail + k
      const fade = 1 - k / preset.trail
      color.toArray(packetColor, index * 3)
      packetSize[index] = 0.36 * (0.55 + 0.45 * fade)
      packetIntensity[index] = fade * fade
    }
  }

  return {
    positions: new Float32Array(nodeCount * 3),
    activity: new Float32Array(nodeCount),
    haloGeometry,
    edgeGeometry,
    packetGeometry,
    packetCount,
    packetEdge,
    packetFrom,
    packetTo,
    packetProgress,
    packetSpeed,
  }
}

interface GraphFieldProps {
  graph: NetworkGraph
  preset: GraphPreset
  animate: boolean
  labels: MutableRefObject<(HTMLSpanElement | null)[]>
  pointer: MutableRefObject<PointerState>
}

function GraphField({ graph, preset, animate, labels, pointer }: GraphFieldProps) {
  const nodeMesh = useRef<THREE.InstancedMesh>(null)
  const shellMesh = useRef<THREE.InstancedMesh>(null)

  const sim = useMemo(() => createSimulation(graph, preset), [graph, preset])
  const glowMaterial = useMemo(createGlowMaterial, [])
  const scratch = useMemo(
    () => ({ matrix: new THREE.Matrix4(), vector: new THREE.Vector3(), dummy: new THREE.Object3D() }),
    [],
  )

  useEffect(() => {
    const mesh = nodeMesh.current
    if (!mesh) return
    graph.nodes.forEach((node, i) => mesh.setColorAt(i, NODE_STYLE[node.kind].color))
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [graph])

  useEffect(() => {
    return () => {
      sim.haloGeometry.dispose()
      sim.edgeGeometry.dispose()
      sim.packetGeometry.dispose()
    }
  }, [sim])

  useEffect(() => () => glowMaterial.dispose(), [glowMaterial])

  useFrame((state, delta) => {
    const mesh = nodeMesh.current
    if (!mesh) return

    const dt = animate ? Math.min(delta, 0.05) : 0
    const time = animate ? state.clock.elapsedTime : 0
    const { nodes, edges, adjacency, serverCount } = graph
    const { positions, activity } = sim

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      const drift = NODE_STYLE[node.kind].drift
      positions[i * 3] = node.base[0] + Math.sin(time * 0.35 + node.phase) * drift
      positions[i * 3 + 1] = node.base[1] + Math.cos(time * 0.28 + node.phase * 1.7) * drift
      positions[i * 3 + 2] = node.base[2] + Math.sin(time * 0.22 + node.phase * 2.3) * drift
    }

    if (pointer.current.active) {
      const aspect = state.size.width / state.size.height
      for (let i = 0; i < nodes.length; i++) {
        scratch.vector
          .set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2])
          .applyMatrix4(mesh.matrixWorld)
          .project(state.camera)
        const d = Math.hypot((scratch.vector.x - pointer.current.x) * aspect, scratch.vector.y - pointer.current.y)
        if (d < HOVER_RADIUS) activity[i] = Math.max(activity[i], (1 - d / HOVER_RADIUS) * 0.85)
      }
    }

    const packetPosition = sim.packetGeometry.attributes.position.array as Float32Array
    for (let p = 0; p < sim.packetCount; p++) {
      let from = sim.packetFrom[p]
      let to = sim.packetTo[p]
      let length =
        Math.hypot(
          positions[to * 3] - positions[from * 3],
          positions[to * 3 + 1] - positions[from * 3 + 1],
          positions[to * 3 + 2] - positions[from * 3 + 2],
        ) || 1
      let progress = sim.packetProgress[p] + (sim.packetSpeed[p] * dt) / length

      if (progress >= 1) {
        activity[to] = Math.max(activity[to], 0.9)
        const options = adjacency[to]
        let nextEdge = sim.packetEdge[p]
        if (options.length > 1) {
          do {
            nextEdge = options[Math.floor(Math.random() * options.length)]
          } while (nextEdge === sim.packetEdge[p])
        }
        const [a, b] = edges[nextEdge]
        from = to
        to = a === from ? b : a
        sim.packetEdge[p] = nextEdge
        sim.packetFrom[p] = from
        sim.packetTo[p] = to
        progress = 0
        length =
          Math.hypot(
            positions[to * 3] - positions[from * 3],
            positions[to * 3 + 1] - positions[from * 3 + 1],
            positions[to * 3 + 2] - positions[from * 3 + 2],
          ) || 1
      }
      sim.packetProgress[p] = progress

      for (let k = 0; k < preset.trail; k++) {
        const at = Math.max(0, progress - (k * TRAIL_GAP) / length)
        const index = (p * preset.trail + k) * 3
        for (let axis = 0; axis < 3; axis++) {
          const start = positions[from * 3 + axis]
          packetPosition[index + axis] = start + (positions[to * 3 + axis] - start) * at
        }
      }
    }
    sim.packetGeometry.attributes.position.needsUpdate = true

    const decay = Math.exp(-dt * 2.4)
    const haloPosition = sim.haloGeometry.attributes.position.array as Float32Array
    const haloSize = sim.haloGeometry.attributes.aSize.array as Float32Array
    const haloIntensity = sim.haloGeometry.attributes.aIntensity.array as Float32Array
    haloPosition.set(positions)

    for (let i = 0; i < nodes.length; i++) {
      const style = NODE_STYLE[nodes[i].kind]
      activity[i] *= decay
      const pulse = activity[i]
      haloSize[i] = style.halo * (1 + pulse * 0.45)
      haloIntensity[i] = style.glow + pulse * 0.7

      const scale = style.scale * (1 + pulse * 0.3)
      scratch.matrix
        .makeScale(scale, scale, scale)
        .setPosition(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2])
      mesh.setMatrixAt(i, scratch.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
    sim.haloGeometry.attributes.position.needsUpdate = true
    sim.haloGeometry.attributes.aSize.needsUpdate = true
    sim.haloGeometry.attributes.aIntensity.needsUpdate = true

    const shells = shellMesh.current
    for (let i = 0; i < serverCount; i++) {
      const x = positions[i * 3]
      const y = positions[i * 3 + 1]
      const z = positions[i * 3 + 2]
      if (shells) {
        const spin = time * 0.3 + nodes[i].phase
        scratch.dummy.position.set(x, y, z)
        scratch.dummy.rotation.set(spin, spin * 0.7, 0)
        scratch.dummy.scale.setScalar(0.44 * (1 + activity[i] * 0.18))
        scratch.dummy.updateMatrix()
        shells.setMatrixAt(i, scratch.dummy.matrix)
      }

      const label = labels.current[i]
      if (label) {
        scratch.vector
          .set(x, y - LABEL_DROP, z)
          .applyMatrix4(mesh.matrixWorld)
          .applyMatrix4(state.camera.matrixWorldInverse)
        const depth = -scratch.vector.z
        scratch.vector.applyMatrix4(state.camera.projectionMatrix)
        const left = (scratch.vector.x * 0.5 + 0.5) * state.size.width
        const top = (0.5 - scratch.vector.y * 0.5) * state.size.height
        const fade = depth > 0.5 ? 1 - THREE.MathUtils.smoothstep(depth, FOG_NEAR, FOG_FAR) : 0
        label.style.opacity = fade.toFixed(2)
        label.style.transform = `translate3d(${left.toFixed(1)}px, ${top.toFixed(1)}px, 0) translate(-50%, -50%)`
      }
    }
    if (shells) shells.instanceMatrix.needsUpdate = true

    const edgePosition = sim.edgeGeometry.attributes.position.array as Float32Array
    for (let e = 0; e < edges.length; e++) {
      const [a, b] = edges[e]
      for (let axis = 0; axis < 3; axis++) {
        edgePosition[e * 6 + axis] = positions[a * 3 + axis]
        edgePosition[e * 6 + 3 + axis] = positions[b * 3 + axis]
      }
    }
    sim.edgeGeometry.attributes.position.needsUpdate = true

    glowMaterial.uniforms.uScale.value = pointScale(state)
  })

  return (
    <>
      <lineSegments geometry={sim.edgeGeometry} frustumCulled={false}>
        <lineBasicMaterial vertexColors transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>

      <instancedMesh ref={nodeMesh} args={[undefined, undefined, graph.nodes.length]} frustumCulled={false}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </instancedMesh>

      <instancedMesh ref={shellMesh} args={[undefined, undefined, graph.serverCount]} frustumCulled={false}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color={CYAN}
          wireframe
          transparent
          opacity={0.42}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>

      <points geometry={sim.haloGeometry} material={glowMaterial} frustumCulled={false} />
      <points geometry={sim.packetGeometry} material={glowMaterial} frustumCulled={false} />

    </>
  )
}

function Dust({ count }: { count: number }) {
  const material = useMemo(createGlowMaterial, [])
  const geometry = useMemo(() => {
    const random = mulberry32(11)
    const dust = createGlowGeometry(count)
    const position = dust.attributes.position.array as Float32Array
    const color = dust.attributes.aColor.array as Float32Array
    const size = dust.attributes.aSize.array as Float32Array
    const intensity = dust.attributes.aIntensity.array as Float32Array
    for (let i = 0; i < count; i++) {
      position[i * 3] = (random() - 0.5) * 36
      position[i * 3 + 1] = (random() - 0.5) * 22
      position[i * 3 + 2] = -14 + random() * 18
      ;(random() > 0.5 ? CYAN : SLATE).toArray(color, i * 3)
      size[i] = 0.1 + random() * 0.12
      intensity[i] = 0.2 + random() * 0.35
    }
    return dust
  }, [count])

  useFrame((state) => {
    material.uniforms.uScale.value = pointScale(state)
  })

  return <points geometry={geometry} material={material} frustumCulled={false} />
}

interface RigProps {
  scroll: SceneScroll
  baseDistance: number
  graphScale: number
  animate: boolean
  pointer: MutableRefObject<PointerState>
  children: ReactNode
}

function Rig({ scroll, baseDistance, graphScale, animate, pointer, children }: RigProps) {
  const group = useRef<THREE.Group>(null)
  const settled = useRef(false)
  const lookTarget = useMemo(() => new THREE.Vector3(), [])
  const lookCurrent = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    const graph = group.current
    if (!graph) return

    const ease = settled.current && animate ? 1 - Math.exp(-delta * 3) : 1
    settled.current = true

    const hero = scroll.hero.get()
    const page = scroll.page.get()
    const experience = scroll.experience.get()
    const { x: px, y: py } = pointer.current
    const sway = animate ? Math.sin(state.clock.elapsedTime * 0.07) * 0.1 : 0

    // The camera dollies in while the experience section crosses the viewport and sweeps sideways through the graph.
    const dolly = Math.sin(Math.PI * experience)
    const sweep = Math.sin(Math.PI * 2 * experience)

    // On wide screens the graph is centred in the space left free beside the copy instead of behind it.
    const camera = state.camera as THREE.PerspectiveCamera
    const halfWidth =
      camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * (state.size.width / state.size.height)
    const sideShift =
      state.size.width >= WIDE_VIEWPORT
        ? halfWidth * (scroll.heroEdge.get() * (1 - hero) + scroll.experienceEdge.get() * dolly)
        : 0

    graph.rotation.y += (px * 0.16 + sway + page * 0.9 + sweep * 0.2 - graph.rotation.y) * ease
    graph.rotation.x += (-py * 0.09 + dolly * 0.08 - graph.rotation.x) * ease
    graph.position.x += (sideShift - graph.position.x) * ease

    camera.position.x += (px * 0.7 + sweep * 1.8 - camera.position.x) * ease
    camera.position.y += (py * 0.45 - page * 1.2 + dolly * 0.6 - camera.position.y) * ease
    camera.position.z += (baseDistance - dolly * 4.2 - camera.position.z) * ease

    lookTarget.set(sweep * 0.6, -page * 0.7, 0)
    lookCurrent.lerp(lookTarget, ease)
    camera.lookAt(lookCurrent)
  })

  return (
    <group ref={group} scale={graphScale}>
      {children}
    </group>
  )
}

export function NetworkScene({ quality, scroll, reducedMotion }: NetworkSceneProps) {
  const preset = GRAPH_PRESETS[quality]
  const graph = useMemo(() => buildNetworkGraph(preset), [preset])
  const pointer = useRef<PointerState>({ x: 0, y: 0, active: false })
  const labels = useRef<(HTMLSpanElement | null)[]>([])
  const [visible, setVisible] = useState(false)
  const [degraded, setDegraded] = useState(false)

  const isHigh = quality === "high"
  const baseDistance = isHigh ? 14 : 16
  const dprCap = Math.min(window.devicePixelRatio || 1, isHigh ? 1.5 : 1.25)
  const camera = useMemo(
    () => ({ fov: 50, near: 0.1, far: 60, position: [0, 0, baseDistance] as [number, number, number] }),
    [baseDistance],
  )
  const glConfig = useMemo(
    () => ({ antialias: isHigh, alpha: true, powerPreference: "high-performance" as const }),
    [isHigh],
  )

  useEffect(() => {
    const state = pointer.current
    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return
      state.x = (event.clientX / window.innerWidth) * 2 - 1
      state.y = -(event.clientY / window.innerHeight) * 2 + 1
      state.active = true
    }
    const handleLeave = () => {
      state.active = false
    }
    window.addEventListener("pointermove", handleMove, { passive: true })
    document.documentElement.addEventListener("mouseleave", handleLeave)
    return () => {
      window.removeEventListener("pointermove", handleMove)
      document.documentElement.removeEventListener("mouseleave", handleLeave)
    }
  }, [])

  return (
    <div className={`absolute inset-0 transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}>
      <Canvas
        flat
        dpr={degraded ? 1 : dprCap}
        frameloop={reducedMotion ? "demand" : "always"}
        camera={camera}
        gl={glConfig}
        fallback={null}
        onCreated={() => setVisible(true)}
        style={{ pointerEvents: "none" }}
      >
        <fog attach="fog" args={["#000000", FOG_NEAR, FOG_FAR]} />
        <PerformanceMonitor
          flipflops={3}
          onDecline={() => setDegraded(true)}
          onIncline={() => setDegraded(false)}
          onFallback={() => setDegraded(true)}
        />
        <Dust count={preset.dust} />
        <Rig
          scroll={scroll}
          baseDistance={baseDistance}
          graphScale={isHigh ? 1 : 0.8}
          animate={!reducedMotion}
          pointer={pointer}
        >
          <GraphField
            key={quality}
            graph={graph}
            preset={preset}
            animate={!reducedMotion}
            labels={labels}
            pointer={pointer}
          />
        </Rig>
      </Canvas>

      {isHigh && (
        <div className="absolute inset-0 overflow-hidden">
          {graph.nodes.slice(0, graph.serverCount).map((node, i) => (
            <span
              key={node.label}
              ref={(element) => {
                labels.current[i] = element
              }}
              className="absolute left-0 top-0 whitespace-nowrap font-mono text-xs tracking-widest text-accent/60 opacity-0 will-change-transform"
            >
              {node.label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
