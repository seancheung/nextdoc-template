import typography from "@tailwindcss/typography";
import daisyui from "daisyui";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/mdx-components.tsx",
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
  plugins: [typography, daisyui],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
      },
      maxWidth: {
        "8xl": "88rem",
      },
    },
  },
  darkMode: ["selector", '[data-theme="dark"]'],
};
export default config;
