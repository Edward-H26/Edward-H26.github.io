import type { Config } from "tailwindcss"

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#13294B",
        accent: {
          DEFAULT: "#FF5F05",
          light: "#FFF4E6",
          dark: "#C84113",
        },
        orange: {
          DEFAULT: "#FF5F05",
          accessible: "#C84113",
          100: "#FFEDD5",
          200: "#FED7AA",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s infinite",
      },
    },
  },
  plugins: [],
} satisfies Config
