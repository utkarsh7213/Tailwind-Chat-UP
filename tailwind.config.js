
module.exports = {
  content: ['*/*.{html,js}'],
  theme: {
    extend: {
      screens: {
        'vvs': '200px',
        'vs': '300px',
        // => @media (min-width: 640px) { ... }
        'ss': '400px',
        'med': '760px',
        'lgg': '1023px',
        'md': '768px',
        'mdd': '800px',
        'ipad': '720px',
        'Extra': '2000px',


        

        
        


        
       
      },
  

      fontFamily: {
        
        fira: "'Fira Sans', sans-serif;" ,
        slab: "'Josefin Slab', serif;" ,
        lora: "'Lora',serif';",
        comfortaa:"'Comfortaa',cursive;",
        arvo: "'Arvo',serif;",
        arima: "'Arima Madurai',cursive;",
        varela:"'Varela Round',sans-serif;",
        'grape':[ '"Grape Nuts"','cursive'],
        'press-start': ['"Press Start 2P"', 'cursive'],
        'Courgette': ['"Courgette"', 'cursive'],
        Balsamiq :  "'Balsamiq Sans',cursive;",
        Epilogue: "'Epilogue',sans-serif;",
        Nunito: "'Nunito',sans-serif;",
        Capriola: "'Capriola',sans-serif;",
        Prompt: "'Prompt',sans-serif;",
        Lusitana: "'Lusitana',sans-serif;",
        Quicksand: "'Quicksand',sans-serif;",
        LexendDeca: "'Lexend Deca',sans-serif;",
      },
    
    },
  },
  plugins: [
   
    require("tailwindcss-animate"),
      require('tailwind-animatecss'),
  ],
}
