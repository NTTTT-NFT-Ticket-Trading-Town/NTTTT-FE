/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
      },
      colors: {
        // you can use it like this: bg-primary, bg-gray-1
        primary: "#9E00FF",
        black: "#000000",
        white: "#ffffff",
        gray: {
          1: "#D9D9D9",
          2: "#9E9E9E",
          3: "#707070",
          4: "#3E3E3E",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
