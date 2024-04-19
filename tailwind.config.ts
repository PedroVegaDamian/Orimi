import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        grey: {
          DEFAULT: '#d9d9d9',
          500: '#8c8c8c',
          800: '#312b3d',
          900: '#2f2d33',
        },
        black: '#000000',
        blue: {
          DEFAULT: '#1892d6',
          500: '#1856d6',
          800: '#181ad6',
        },
        primary: {
          DEFAULT: '#decfff',
          500: '#5633a3',
          800: '#5418d6',
          tono1: '#4614b3',
          tono2: '#5418d6',
          tono3: '#360f8a',
          tono4: '#260b61',
          tono5: '#160638',
        },
        secondary: '#9218d6',
        green: {
          DEFAULT: '#a0edaf',
          500: '#18d632',
          800: '#35573a',
        },
        orange: {
          DEFAULT: '#d67918',
          500: '#d64118',
        },
        yellow: {
          DEFAULT: '#d6ca18',
          500: '#d6b318',
          800: '#817d39',
        },
        cian: '#18d69e',
        red: {
          DEFAULT: '#ff3d3d',
          500: '#ff0202',
        },
        background: '#f6f3f3'
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        sen: ['Sen', 'sans-serif'],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      }
    },
  },
  plugins: [],
} satisfies Config;
