import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-space-grotesk)", "serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      colors: {
        // Brand colors
        primary: "#ffffff",
        "primary-dark": "#000000",
        accent: "#4ddcd3",
        "accent-hover": "#2ec4bb",
        surface: "#f5f5f5",
        "border-light": "#e5e5e5",
        "off-white": "#f0f2f5", // Modern light background
        "cyber-dark": "#0f172a", // For tech accents
      },
      backgroundColor: {
        white: "#ffffff",
        light: "#f5f5f5",
        "off-white": "#f0f2f5",
      },
      textColor: {
        dark: "#000000",
        light: "#ffffff",
      },
      borderColor: {
        light: "#e5e5e5",
      },
      boxShadow: {
        "soft": "0 8px 30px rgba(0, 0, 0, 0.04)",
        "soft-lg": "0 20px 40px rgba(0, 0, 0, 0.08)",
        "soft-xl": "0 30px 60px rgba(0, 0, 0, 0.12)",
        "cyber": "0 0 15px rgba(77, 220, 211, 0.5)",
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(77, 220, 211, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(77, 220, 211, 0.6)",
          },
        },
        "pulse-dot": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.5",
          },
        },
        "blink": {
          "0%, 49%, 100%": {
            opacity: "1",
          },
          "50%, 99%": {
            opacity: "0",
          },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        }
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out",
        "glow": "glow 3s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "blink": "blink 1s step-start infinite",
        "scan": "scan 3s linear infinite",
        "float": "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

export default config
