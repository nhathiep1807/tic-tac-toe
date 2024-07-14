import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        tada: {
          "0%": {
            transform: "scale(1)",
          },
          "10%, 20%": {
            transform: "scale(0.9) rotate(-3deg)",
          },
          "30%, 50%, 70%, 90%": {
            transform: "scale(1.2) rotate(3deg)",
          },
          "40%, 60%, 80%": {
            transform: "scale(1.2) rotate(-3deg)",
          },
          "100%": {
            transform: "scale(1) rotate(0)",
          },
        },
      },
      animation: {
        // tada animation only last 3s
        tada: "tada 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
