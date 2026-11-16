export type NodeKind = "server" | "endpoint" | "client"
export type EdgeKind = "backbone" | "service" | "access"
export type Vec3 = [number, number, number]
export type SceneQuality = "high" | "low"

export interface GraphNode {
  kind: NodeKind
  base: Vec3
  phase: number
  label?: string
}

export interface NetworkGraph {
  nodes: GraphNode[]
  edges: [number, number][]
  edgeKinds: EdgeKind[]
  adjacency: number[][]
  serverCount: number
}

export interface GraphPreset {
  servers: number
  endpointsPerServer: number
  clients: number
  crossLinks: number
  packets: number
  trail: number
  dust: number
}

export const GRAPH_PRESETS: Record<SceneQuality, GraphPreset> = {
  high: { servers: 7, endpointsPerServer: 4, clients: 12, crossLinks: 6, packets: 70, trail: 3, dust: 260 },
  low: { servers: 5, endpointsPerServer: 2, clients: 4, crossLinks: 2, packets: 26, trail: 2, dust: 90 },
}

const SERVERS: { label: string; position: Vec3 }[] = [
  { label: "API GATEWAY", position: [0, 0.4, 0] },
  { label: "AUTH · TLS", position: [-4.2, 2.3, -1.5] },
  { label: "POSTGRESQL", position: [4.4, 1.9, -2] },
  { label: "REDIS CACHE", position: [3.2, -2.5, 1.2] },
  { label: "ML · TF-IDF", position: [-3.6, -2.6, 0.8] },
  { label: "C2 LISTENER", position: [-6.2, 0.3, -3.2] },
  { label: "CLOUD EDGE", position: [6.3, 0.2, -3.4] },
]

const BACKBONE: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [3, 2],
  [4, 1],
  [1, 5],
  [2, 6],
]

const CROSS_LINK_MAX_DISTANCE = 3.4

export function mulberry32(seed: number) {
  let state = seed
  return () => {
    state += 0x6d2b79f5
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function distance(a: Vec3, b: Vec3) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])
}

export function buildNetworkGraph(preset: GraphPreset, seed = 2026): NetworkGraph {
  const random = mulberry32(seed)
  const nodes: GraphNode[] = []
  const edges: [number, number][] = []
  const edgeKinds: EdgeKind[] = []

  const link = (a: number, b: number, kind: EdgeKind) => {
    edges.push([a, b])
    edgeKinds.push(kind)
  }

  const servers = SERVERS.slice(0, preset.servers)
  servers.forEach((server) => {
    nodes.push({
      kind: "server",
      base: server.position,
      phase: random() * Math.PI * 2,
      label: server.label,
    })
  })

  BACKBONE.forEach(([a, b]) => {
    if (a < servers.length && b < servers.length) link(a, b, "backbone")
  })

  const endpointOwner = new Map<number, number>()
  servers.forEach((server, serverIndex) => {
    for (let i = 0; i < preset.endpointsPerServer; i++) {
      const theta = random() * Math.PI * 2
      const elevation = (random() - 0.5) * Math.PI * 0.9
      const radius = 1.3 + random() * 0.9
      const position: Vec3 = [
        server.position[0] + Math.cos(theta) * Math.cos(elevation) * radius,
        server.position[1] + Math.sin(elevation) * radius,
        server.position[2] + Math.sin(theta) * Math.cos(elevation) * radius * 0.7,
      ]
      const index = nodes.push({ kind: "endpoint", base: position, phase: random() * Math.PI * 2 }) - 1
      endpointOwner.set(index, serverIndex)
      link(serverIndex, index, "service")
    }
  })

  const endpoints = [...endpointOwner.keys()]
  const candidates: { a: number; b: number; d: number }[] = []
  for (let i = 0; i < endpoints.length; i++) {
    for (let j = i + 1; j < endpoints.length; j++) {
      const a = endpoints[i]
      const b = endpoints[j]
      if (endpointOwner.get(a) === endpointOwner.get(b)) continue
      const d = distance(nodes[a].base, nodes[b].base)
      if (d < CROSS_LINK_MAX_DISTANCE) candidates.push({ a, b, d })
    }
  }
  candidates
    .sort((x, y) => x.d - y.d)
    .slice(0, preset.crossLinks)
    .forEach(({ a, b }) => link(a, b, "service"))

  for (let i = 0; i < preset.clients && endpoints.length > 0; i++) {
    const endpoint = endpoints[Math.floor(random() * endpoints.length)]
    const owner = servers[endpointOwner.get(endpoint) ?? 0].position
    const from = nodes[endpoint].base
    const outward: Vec3 = [from[0] - owner[0], from[1] - owner[1], from[2] - owner[2]]
    const length = Math.hypot(outward[0], outward[1], outward[2]) || 1
    const reach = 0.8 + random() * 0.6
    const position: Vec3 = [
      from[0] + (outward[0] / length) * reach + (random() - 0.5) * 0.7,
      from[1] + (outward[1] / length) * reach + (random() - 0.5) * 0.7,
      from[2] + (outward[2] / length) * reach + (random() - 0.5) * 0.5,
    ]
    const index = nodes.push({ kind: "client", base: position, phase: random() * Math.PI * 2 }) - 1
    link(endpoint, index, "access")
  }

  const adjacency: number[][] = nodes.map(() => [])
  edges.forEach(([a, b], edgeIndex) => {
    adjacency[a].push(edgeIndex)
    adjacency[b].push(edgeIndex)
  })

  return { nodes, edges, edgeKinds, adjacency, serverCount: servers.length }
}
