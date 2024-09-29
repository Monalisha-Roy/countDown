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
        'text': '#e1edee',
        'background': '#0e1a1a',
        'primary': '#a3cbcc',
        'secondary': '#383a65',
        'accent': '#7e6dae',
       },
    },
  },
  plugins: [],
};
export default config;
