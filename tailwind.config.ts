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
          paperDark: "#141416",
          card: "#FFFFFF",
          cardDark: "#1E1E22",
          ink: "#1C1917",
          inkLight: "#F5F5F4",
          matcha: "#059669",
          matchaGlow: "#10B981",
          sand: "#E7E5E4",
          charcoal: "#27272A",
          muted: "#78716C",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        japanese: ["Noto Serif JP", "serif"],
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
