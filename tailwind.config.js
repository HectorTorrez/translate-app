/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#040711",
        "primary-ligth": " #121826cc",
        secondary: "#394150",
        "secondary-ligth": "#4d5562",
        "secondary-lightest": " #cdd5e0",
        "font-white": "#f9fafb",
        "primary-buttons": "#3662e3",
        "secondary-buttons": " #212936cc",
      },
    },
  },
  plugins: [],
};
