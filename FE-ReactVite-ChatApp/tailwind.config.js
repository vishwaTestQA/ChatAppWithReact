/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // colors: {
      //   primary: "#3b82f6",   // Blue
      //   secondary: "#9333ea", // Purple
      //   accent: "#ec4899",    // Pink
      //   neutral: "#64748b",   // Gray
      // },
    },
    // extend: {},
  },
  plugins: [
    daisyui
  ],
  daisyui:{             //by default when install daisyui , the app theme changes to dark
    themes:[ "light",   // to make it false set ===> daisyui:{themes: false}
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",]
  }
}

