const withAnimations = require('animated-tailwindcss');

module.exports = withAnimations({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "rgb(255, 105, 0)"
      },
      width: {
        th: "32%"
      },
      fontFamily: {
        montserrat: "'Montserrat', sans-serif",
      },
      backgroundColor: {
        bgRadio: 'rgb(243, 243, 247)',
      },
      height: {
        "vw-9": "90vw",
        "550": "550px"
      }
      
    },
  },
  plugins: [
  ]
})