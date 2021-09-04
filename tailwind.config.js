module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      screens:{
        'xs':'320px',
        '3xl':'2100px'
      },
      spacing:{
        'menu':"21%",
        'main':"79%",
        'video': "56,25%",
        'poster': "95%",
        'mobile': "100vh",
        '88':'23rem',
        '102': '26rem',
        '104':'28rem'
      },
      colors: {
        'gray-background':"#0f0f0f"
      },
      fontFamily:{
        'app':['"Fira Sans"', 'sans-serif']
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
