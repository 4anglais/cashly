import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem"
      },
      boxShadow: {
        soft: "0 12px 28px rgba(0,0,0,0.08)",
        "soft-sm": "0 8px 20px rgba(0,0,0,0.07)",
        "soft-inset": "inset 0 1px 0 rgba(255,255,255,0.55)"
      },
      colors: {
        mono: {
          0: "#ffffff",
          25: "#fafafa",
          50: "#f5f5f5",
          100: "#ededed",
          200: "#d6d6d6",
          700: "#3a3a3a",
          800: "#1f1f1f",
          900: "#121212"
        },
        accent: {
          500: "#ff3b30"
        }
      }
    }
  },
  plugins: []
} satisfies Config;

