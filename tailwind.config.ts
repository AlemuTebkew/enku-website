import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
         // primary: '#FF6B6B', // Primary color (pink)
         primaryT: '#FC2779',
         // primaryTemp: '#FC2779', // Primary color (pink)
         // secondaryTemp: '#FF92BB', // Primary color (pink)
         // secondary: '#6B46C1', // Secondary color (purple)
         secondaryT: '#FF92BB',
         text: '#333333', // Text color
         backgroundT: '#FFFFFF', // Background color
         tertiary: '#E2A1B0',
         tertiary1: '#FFE3E3',
         black: '#000000',
         // Add more colors as needed


        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",

        'lgT': '1rem',
        'full': '9999px',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
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
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config