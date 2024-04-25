import type { Config } from 'tailwindcss'

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./src/**/*.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        sen: ['Sen', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      fontSize: {
        '12' : '12px',
        '14': '14px',
        '16': '16px',
        '22': '22px',
      },
    },
    colors: {
      primary_tono5_color: 'rgba(22, 6, 56, 1)',
      primary_tono4_color: 'rgba(38, 11, 97, 1)',
      primary_tono3_color: 'rgba(54, 15, 138, 1)',
      primary_tono2_color: 'rgba(84, 24, 214, 1)',
      primary_tono1_color: 'rgba(70, 20, 179, 1)',
      secondary_color: 'rgba(146, 24, 214, 1)',
      primary_800_color: 'rgba(84, 24, 214, 1)',
      primary_500_color: 'rgba(86, 51, 163, 0.64)',
      primary_color: 'rgba(222, 207, 255, 1)',
      white_color: 'rgba(255, 255, 255, 1)',
      grey_color: 'rgba(217, 217, 217, 1)',
      grey_500_color: 'rgba(140, 140, 140, 1)',
      grey_800_color: 'rgba(49, 43, 61, 1)',
      grey_900_color: 'rgba(47, 45, 51, 1)',
      black_color: 'rgba(0, 0, 0, 1)',
      blue_color: 'rgba(24, 146, 214, 1)',
      blue_500_color: 'rgba(24, 86, 214, 1)',
      blue_800_color: 'rgba(24, 26, 214, 1)',
      cian_color: 'rgba(24, 214, 158, 1)',
      green_color: 'rgba(160, 237, 175, 1)',
      green_500_color: 'rgba(24, 214, 50, 1)',
      green_800_color: 'rgba(53, 87, 58, 1)',
      yellow_color: 'rgba(214, 202, 24, 1)',
      yellow_500_color: 'rgba(214, 179, 24, 1)',
      yellow_800_color: 'rgba(129, 125, 57, 1)',
      orange_color: 'rgba(214, 121, 24, 1)',
      orange_500_color: 'rgba(214, 65, 24, 1)',
      red_color: 'rgba(255, 61, 61, 1)',
      red_500_color: 'rgba(255, 2, 2, 1)',
      bg_color: 'rgba(246, 243, 243, 1)'
    },
    spacing: {
      '7.25': '1.8125rem', // Aproximadamente 29px
      '9': '2.25rem',        // Exactamente 36px
      '10': '10px',
      '17': '17px', 
      '20': '20px',
      '30.5': '7.625rem', // 122px si 1rem = 16px
      '40': '40px',
      '47.44': '47.44px',
      '80': '80px',
      '97': '97px',
      '144': '144px',
      '230': '230px',
      '450': '450px',
      '475': '475px', 
    },
    maxHeight: {
      '303': '303px',  
    },
    borderWidth: {
      '1': '1px',  
    },
    borderRadius: {
      '10': '10px',  
    }
  },
  plugins: []
} satisfies Config

