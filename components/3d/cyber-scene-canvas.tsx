"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function CyberSceneCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0b0f19, 0.035)

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 18)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    // Master Group for Parallax & Scrollytelling
    const masterGroup = new THREE.Group()
    scene.add(masterGroup)

    // ==========================================
    // 1. NEURAL NETWORK NODES & SYNAPSES
    // ==========================================
    const nodeCount = 90
    const nodeGeometry = new THREE.BufferGeometry()
    const nodePositions = new Float32Array(nodeCount * 3)
    const nodeVelocities: { x: number; y: number; z: number }[] = []

    const radius = 5.5
    for (let i = 0; i < nodeCount; i++) {
      // Distribute points in a spherical volume
      const phi = Math.acos(-1 + (2 * i) / nodeCount)
      const theta = Math.sqrt(nodeCount * Math.PI) * phi
      const r = radius * (0.4 + 0.6 * Math.cbrt(Math.random()))

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      nodePositions[i * 3] = x
      nodePositions[i * 3 + 1] = y
      nodePositions[i * 3 + 2] = z

      nodeVelocities.push({
        x: (Math.random() - 0.5) * 0.008,
        y: (Math.random() - 0.5) * 0.008,
        z: (Math.random() - 0.5) * 0.008,
      })
    }
    nodeGeometry.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3))

    // Glowing Node Points Material
    const nodeMaterial = new THREE.PointsMaterial({
      color: 0x00ff66,
      size: 0.22,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    })
    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial)
    masterGroup.add(nodePoints)

    // Dynamic Synapse Connections (Lines)
    const maxConnections = 240
    const linePositions = new Float32Array(maxConnections * 6)
    const lineColors = new Float32Array(maxConnections * 6)
    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3))
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3))

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    })
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial)
    masterGroup.add(lineSegments)

    // ==========================================
    // 2. HOLOGRAPHIC MOTHERBOARD ORBITAL RINGS
    // ==========================================
    const ringGroup = new THREE.Group()
    masterGroup.add(ringGroup)

    const createTechRing = (r: number, segments: number, color: number, opacity: number, rotX: number, rotY: number) => {
      const ringGeom = new THREE.BufferGeometry()
      const pts: number[] = []
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2
        // Intermittent dash effect
        if (i % 6 !== 0) {
          pts.push(Math.cos(angle) * r, Math.sin(angle) * r, 0)
        }
      }
      ringGeom.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3))
      const ringMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
      })
      const ring = new THREE.Line(ringGeom, ringMat)
      ring.rotation.x = rotX
      ring.rotation.y = rotY
      return ring
    }

    const ring1 = createTechRing(6.8, 120, 0x00ff66, 0.45, Math.PI / 3, 0)
    const ring2 = createTechRing(8.2, 140, 0x00e5ff, 0.35, -Math.PI / 4, Math.PI / 6)
    const ring3 = createTechRing(9.8, 180, 0x00cc55, 0.25, Math.PI / 2.2, -Math.PI / 5)
    ringGroup.add(ring1, ring2, ring3)

    // ==========================================
    // 3. INNER QUANTUM CORE WIREFRAME
    // ==========================================
    const coreGeom = new THREE.IcosahedronGeometry(2.4, 2)
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00ff66,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    })
    const innerCore = new THREE.Mesh(coreGeom, coreMat)
    masterGroup.add(innerCore)

    // Floating Stardust Particles
    const dustCount = 800
    const dustGeom = new THREE.BufferGeometry()
    const dustPos = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPos[i] = (Math.random() - 0.5) * 35
      dustPos[i + 1] = (Math.random() - 0.5) * 35
      dustPos[i + 2] = (Math.random() - 0.5) * 35
    }
    dustGeom.setAttribute("position", new THREE.BufferAttribute(dustPos, 3))
    const dustMat = new THREE.PointsMaterial({
      color: 0x00e5ff,
      size: 0.08,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    })
    const dustPoints = new THREE.Points(dustGeom, dustMat)
    scene.add(dustPoints)

    // ==========================================
    // 4. MOUSE PARALLAX & SCROLL INTERPOLATION
    // ==========================================
    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates (-1 to 1)
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    let scrollProgress = 0
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll > 0) {
        scrollProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll))
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("scroll", handleScroll, { passive: true })

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener("resize", handleResize)

    // ==========================================
    // 5. ANIMATION LOOP
    // ==========================================
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

      // Node animation & dynamic connections
      const positions = nodeGeometry.attributes.position.array as Float32Array
      for (let i = 0; i < nodeCount; i++) {
        const vel = nodeVelocities[i]
        positions[i * 3] += vel.x
        positions[i * 3 + 1] += vel.y
        positions[i * 3 + 2] += vel.z

        // Boundary bounce
        const dist = Math.sqrt(
          positions[i * 3] ** 2 +
            positions[i * 3 + 1] ** 2 +
            positions[i * 3 + 2] ** 2
        )
        if (dist > radius) {
          vel.x *= -1
          vel.y *= -1
          vel.z *= -1
        }
      }
      nodeGeometry.attributes.position.needsUpdate = true

      // Update lines between nearby nodes
      let lineIndex = 0
      const maxDist = 2.4
      const posArray = lineGeometry.attributes.position.array as Float32Array
      const colorArray = lineGeometry.attributes.color.array as Float32Array

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          if (lineIndex >= maxConnections) break

          const dx = positions[i * 3] - positions[j * 3]
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (dist < maxDist) {
            const alpha = 1 - dist / maxDist

            const pIdx = lineIndex * 6
            posArray[pIdx] = positions[i * 3]
            posArray[pIdx + 1] = positions[i * 3 + 1]
            posArray[pIdx + 2] = positions[i * 3 + 2]
            posArray[pIdx + 3] = positions[j * 3]
            posArray[pIdx + 4] = positions[j * 3 + 1]
            posArray[pIdx + 5] = positions[j * 3 + 2]

            // Green to Cyan gradient
            colorArray[pIdx] = 0.0
            colorArray[pIdx + 1] = 1.0 * alpha
            colorArray[pIdx + 2] = 0.4 * alpha
            colorArray[pIdx + 3] = 0.0
            colorArray[pIdx + 4] = 0.9 * alpha
            colorArray[pIdx + 5] = 1.0 * alpha

            lineIndex++
          }
        }
      }
      lineGeometry.setDrawRange(0, lineIndex * 2)
      lineGeometry.attributes.position.needsUpdate = true
      lineGeometry.attributes.color.needsUpdate = true

      // Rotating rings
      ring1.rotation.z = elapsedTime * 0.15
      ring2.rotation.z = -elapsedTime * 0.2
      ring3.rotation.z = elapsedTime * 0.1

      innerCore.rotation.x = elapsedTime * 0.25
      innerCore.rotation.y = elapsedTime * 0.35

      // Base rotation + Mouse Parallax
      masterGroup.rotation.y = elapsedTime * 0.05 + mouseX * 0.35
      masterGroup.rotation.x = -mouseY * 0.25

      // Scrollytelling Camera Transitions
      // Section-by-section spatial journey:
      // Scroll 0 -> 1 moves camera closer, tilts perspective, shifts position
      const targetCamZ = 18 - scrollProgress * 7.5 // Zooms from 18 to 10.5
      const targetCamY = -scrollProgress * 4.0 // Moves downwards
      const targetCamX = Math.sin(scrollProgress * Math.PI * 2) * 2.5 // Subtle lateral drift

      camera.position.z += (targetCamZ - camera.position.z) * 0.06
      camera.position.y += (targetCamY - camera.position.y) * 0.06
      camera.position.x += (targetCamX - camera.position.x) * 0.06
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
      nodeGeometry.dispose()
      nodeMaterial.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
      coreGeom.dispose()
      coreMat.dispose()
      dustGeom.dispose()
      dustMat.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
      {/* Subtle radial vignette so text remains crisp and readable */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0B0F19]/40 to-[#0B0F19]/90 pointer-events-none" />
    </div>
  )
}
