import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F3F4F6",
        foreground: "#0F172A",
        secondary: "#28395C",
        navy: {
          DEFAULT: "#28395C",
          hover: "#1E2B47",
          light: "#344A76",
        },
        clinical: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          400: "#38bdf8",
          500: "#0284c7",
          600: "#0369a1",
          900: "#0c4a6e",
        },
        luxury: {
          slate: "#0F131A",
          card: "#151922",
          border: "rgba(0, 0, 0, 0.08)",
          pearl: "#F8FAFC",
          accent: "#10B981",
          muted: "#94A3B8"
        }
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "Manrope", "sans-serif"],
        serif: ["var(--font-instrument-serif)", "Instrument Serif", "Georgia", "serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"]
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        }
      }
    },
  },
  plugins: [],
};

export default config;
