/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "#FCD12A",
        secondryColor: "#649C74",
        thirdColor:"#3D437C",
        mainTextColor: "#000000",
        secondryTextColor: "#FFFFFF",
        thirdTextColor: "#dddddd",
        opecityGreenColor:"#B3D4BB",
        opecityYellowColor:"#DEB593,"
      },
      fontFamily: {
        'bricolage-grotesque': ["Bricolage Grotesque", 'sans-serif'], 
      },
      fontWeight: {
        
        regular: 400, 
        bold: 700,    
      },
      screens: {
    sm: "480px",   
    md: "768px",   
    lg: "1024px",  
    xl: "1280px",  
    '2xl': "1536px", 
},
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

