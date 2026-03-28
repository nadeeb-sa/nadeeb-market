import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#156661",
          light: "#1f8a84",
          dark: "#0d4441",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#c0973b",
          light: "#d4aa4f",
          dark: "#a6822f",
          foreground: "#ffffff",
        },
      },
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
