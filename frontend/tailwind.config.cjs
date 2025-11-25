module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        exdellsCharcoal: '#1B1B1F',
        exdellsYellow: '#FFCC00',
        exdellsMidnight: '#031222',
        exdellsSlate: '#0A223D',
        exdellsSky: '#42A4FF',
        exdellsNavy: '#042B49',
        exdellsBlue: '#055FA8',
        exdellsOrange: '#F7941D',
        exdellsGold: '#FFC857'
      },
      boxShadow: {
        'brand-glow': '0 25px 60px rgba(5, 95, 168, 0.2)'
      }
    }
  },
  plugins: []
}
