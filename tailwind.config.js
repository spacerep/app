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
      textColor: {
        primary: '#f5f5f5',
        secondary: '#c6c6c6',
        tertiary: '#999999'
      },
      borderColor: {
        primary: '#373737'
      }
    }
  },
  plugins: []
}
