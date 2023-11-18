/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ee5d501a",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        secondary: {
          100: "#E6FFEC",
          200: "#C0FFD0",
          300: "#9AFFB4",
          400: "#73FF97",
          500: "#4DFF7B",
          600: "#3CDB60",
          700: "#2BB746",
          800: "#1A933B",
          900: "#0A6F20",
        },
      },
    },
  },
};
