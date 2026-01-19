import type { Config } from "tailwindcss"

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#13294B",
          light: "#1e3a5f",
          dark: "#60a5fa",
        },
        accent: {
          DEFAULT: "#0455A4",
          light: "#E8F4FD",
          dark: "#3b82f6",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "fluid-xs": "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
        "fluid-sm": "clamp(0.875rem, 0.8rem + 0.375vw, 1rem)",
        "fluid-base": "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
        "fluid-lg": "clamp(1.125rem, 1rem + 0.625vw, 1.25rem)",
        "fluid-xl": "clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)",
        "fluid-2xl": "clamp(1.5rem, 1.3rem + 1vw, 2rem)",
        "fluid-3xl": "clamp(2rem, 1.7rem + 1.5vw, 2.5rem)",
        "fluid-4xl": "clamp(2.5rem, 2rem + 2.5vw, 3.5rem)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-slow": "pulse 3s infinite",
        "spin-slow": "spin 8s linear infinite",
        "bounce-slow": "bounce 3s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      boxShadow: {
        "glass": "0 8px 32px rgba(0, 0, 0, 0.08)",
        "glass-lg": "0 16px 48px rgba(0, 0, 0, 0.12)",
        "glow": "0 0 20px rgba(4, 85, 164, 0.15)",
        "glow-lg": "0 0 40px rgba(4, 85, 164, 0.2)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
} satisfies Config
