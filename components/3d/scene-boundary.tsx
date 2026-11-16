"use client"

import { Component, type ReactNode } from "react"

interface SceneBoundaryProps {
  children: ReactNode
}

interface SceneBoundaryState {
  failed: boolean
}

// The 3D scene is decorative: if WebGL fails at any point the page must keep working without it.
export class SceneBoundary extends Component<SceneBoundaryProps, SceneBoundaryState> {
  state: SceneBoundaryState = { failed: false }

  static getDerivedStateFromError(): SceneBoundaryState {
    return { failed: true }
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}
