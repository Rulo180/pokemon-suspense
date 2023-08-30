/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        tertiary: "rgb(var(--color-tertiary) / <alpha-value>)",
        copy: "rgb(var(--color-copy) / <alpha-value>)",
        error: "rgb(var(--color-error) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
