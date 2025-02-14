import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        primary: "var(--font-primary)",
        secondary: "var(--font-secondary)",
        tertiary: "var(--font-tertiary)",
        quaternary: "var(--font-quaternary)",
      },
    },
  },
  plugins: [],
} satisfies Config;
