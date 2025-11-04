import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        valorant: {
          red: "#ff4655",
          dark: "#0f1923",
          gray: "#1f2a37"
        }
      },
      fontFamily: {
        display: ["'Rajdhani'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
