// tailwind.config.js

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Adjust as per your project structure
  ],
  // darkMode: "class", // Enable dark mode if needed
  theme: {
    extend: {
      colors: {
        // primary: '#FF6B6B', // Primary color (pink)
        primary: '#FC2779',
        // primaryTemp: '#FC2779', // Primary color (pink)
        // secondaryTemp: '#FF92BB', // Primary color (pink)
        // secondary: '#6B46C1', // Secondary color (purple)
        secondary: '#FF92BB',
        text: '#333333', // Text color
        background: '#FFFFFF', // Background color
        // Additional colors based on Enku Beauty's preferences
        softPink: '#FFD9E6',
        softPurple: '#B79BF2',
        warmGray: '#E5E5E5',
        // Add more colors as needed
      },
      maxWidth: {
        "c-1390": "86.875rem",
        "c-1315": "82.188rem",
        "c-1280": "80rem",
        "c-1235": "77.188rem",
        "c-1154": "72.125rem",
        "c-1016": "63.5rem",
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'], // Body font
        heading: ['Inter', 'sans-serif'], // Heading font
      },
      fontSize: {
        // Custom font sizes based on Enku Beauty's design requirements
        small: ['14px', '20px'],
        regular: ['16px', '26px'],
        large: ['20px', '32px'],
      },
      spacing: {
        // Custom spacing based on design specifications
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        // Custom border radius values
        'lg': '1rem',
        'full': '9999px',
      },
      boxShadow: {
        // Custom box shadows
        'soft': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        // Custom background images
        'pattern': 'url("/images/pattern.png")',
        // Add more background images as per design needs
      },
    },
  },
  plugins: [],
};