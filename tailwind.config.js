/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#101426",
        primary: "#0676ED",
        secondary: "#E4F0FC",
        "card-background": "#FDFEFE",
        gray: "#8F9BB3",
        "gray-light": "#DAE1ED",
        "gray-lighter": "#F6F8FA",
        santa: "#E67070",
      },
      backgroundImage: {
        'gradient': "url('./src/assets/images/bg.png')",
      },
      boxShadow: {
        "nav-card": "12px 8px 44px -12px rgba(27, 58, 146, .16)",
        card: "12px 8px 24px -12px rgba(27, 58, 146, .16)",
        button: "3px 3px 10px -1px rgba(11, 27, 102, .30)",
      },
      borderRadius: {
        inherit: "inherit",
      },
      fontFamily: {
        sans: [
          "Open Sans",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
};
