import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        zen: {
          paper: "#FAF8F5",
          paperDark: "#0A0A0B",
          card: "#FFFFFF",
          cardDark: "#121214",
          ink: "#1C1917",
          inkLight: "#F5F5F4",
          matcha: "#059669",
          matchaGlow: "#10B981",
          gold: "#D97706",
          sand: "#E7E5E4",
          charcoal: "#1C1C20",
          muted: "#78716C",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
        serif: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        japanese: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        "zen-glow": "0 0 30px -5px rgba(16, 185, 129, 0.15)",
        "zen-card": "0 10px 30px -10px rgba(28, 25, 23, 0.05)",
        "zen-card-dark": "0 10px 35px -10px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "breath-glow": "breath 3s ease-in-out infinite",
        "float-gentle": "float 6s ease-in-out infinite",
      },
      keyframes: {
        breath: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.03)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
