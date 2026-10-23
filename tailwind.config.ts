import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0F19",
        foreground: "#E6F4EA",
        obsidian: {
          DEFAULT: "#0B0F19",
          dark: "#060910",
          card: "rgba(13, 19, 34, 0.72)",
          elevated: "#111827",
          border: "rgba(0, 255, 102, 0.18)",
        },
        cyber: {
          green: "#00FF66",
          emerald: "#00CC55",
          dim: "#00993D",
          cyan: "#00E5FF",
          glow: "rgba(0, 255, 102, 0.4)",
          grid: "rgba(0, 255, 102, 0.06)",
        },
        primary: {
          DEFAULT: "#00FF66",
          dim: "#00CC55",
          dark: "#006622",
        },
        secondary: "#101827",
        muted: {
          DEFAULT: "#1E293B",
          foreground: "#94A3B8",
        },
        accent: "#00E5FF",
        border: "rgba(0, 255, 102, 0.22)",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "Fira Code", "JetBrains Mono", "Consolas", "Monaco", "monospace"],
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
      },
      boxShadow: {
        "cyber-sm": "0 0 10px rgba(0, 255, 102, 0.15)",
        cyber: "0 0 20px rgba(0, 255, 102, 0.25)",
        "cyber-lg": "0 0 35px rgba(0, 255, 102, 0.35)",
        "cyan-glow": "0 0 20px rgba(0, 229, 255, 0.3)",
      },
      animation: {
        blink: "blink 1s step-end infinite",
        scanline: "scanline 8s linear infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite alternate",
        radarSweep: "radarSweep 4s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        pulseGlow: {
          "0%": {
            boxShadow: "0 0 10px rgba(0, 255, 102, 0.15), inset 0 0 8px rgba(0, 255, 102, 0.05)",
            borderColor: "rgba(0, 255, 102, 0.2)",
          },
          "100%": {
            boxShadow: "0 0 25px rgba(0, 255, 102, 0.35), inset 0 0 15px rgba(0, 255, 102, 0.12)",
            borderColor: "rgba(0, 255, 102, 0.5)",
          },
        },
        radarSweep: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
}

export default config
