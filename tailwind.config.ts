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
        background: "#000000",
        foreground: "#00FF41",
        primary: "#00FF41",
        "primary-dim": "#00CC33",
        secondary: "#0D0D0D",
        muted: "#1A1A1A",
        "muted-foreground": "#00FF41",
        accent: "#00FF41",
        border: "#00FF41",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "Fira Code", "Consolas", "Monaco", "monospace"],
      },
      animation: {
        blink: "blink 1s step-end infinite",
        typing: "typing 3.5s steps(40, end)",
        scanline: "scanline 8s linear infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        glow: {
          from: { textShadow: "0 0 5px #00FF41, 0 0 10px #00FF41" },
          to: { textShadow: "0 0 10px #00FF41, 0 0 20px #00FF41, 0 0 30px #00FF41" },
        },
      },
    },
  },
  plugins: [],
}

export default config
