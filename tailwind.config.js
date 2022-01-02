module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#3D50FA',
        dark: {
          primary: '#191A1F',
          secondary: '#25262C',
          tertiary: '#32333A',
          quaternary: '#464646'
        }
      },
      backgroundImage: {
        split: 'linear-gradient(to right, #191A1F 0%, #191A1F 50%, #25262C 50%, #25262C 100%)'
      },
      textColor: {
        primary: '#f5f5f5',
        secondary: '#c6c6c6',
        tertiary: '#999999'
      },
      borderColor: {
        primary: '#373737'
      },
      fontFamily: {
        sans: ['Quicksand', 'sans-serif']
      },
      fontSize: {
        xm: '0.82rem'
      },
      height: {
        input: '35.69px'
      },
      transitionProperty: {
        width: 'width'
      }
    }
  },
  plugins: []
}
