import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "text-secondary":"#6c6c6c",
        "secondary":"#f7f7f7",
        "linkedin":"#0e76a8",
        "github-green":"#39d353",
      },
    },
  },
  plugins: [],
};
export default config;
