import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  fontFamily: {
    sans: ['Poppins', 'Inter', 'system-ui', 'sans'],
    monospace: ['DM Mono', 'monospace'],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans'],
        monospace: ['DM Mono', 'monospace'],
        sora: ['Sora', 'sans-serif'],
        teko: ['Teko', 'sans-serif'],
      },
      colors: {
        // Primary Colors
        'himalayan-green': '#3B5D50',
        'warm-terracotta': '#C27C5E',
        'offwhite-cream': '#FBF3ED',

        // Accent Colors
        'saffron-yellow': '#F6B042',
        'deep-red': '#C8473D',
        'sky-blue': '#469BAF',
        'forest-green': '#4C7C59',
        'forest-green-500':'#3b5f45',
        // from expensify 
        black: '#000000',
        white: '#FFFFFF',
        ivory: '#fffaf0',
        green: '#03D47C',
        greenHover: '#00C271',
        greenPressed: '#35DD96',
        red: '#F25730',
        redHover: '#DE4822',
        redPressed: '#F57959',
        transparent: 'transparent'
      },
   
      
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#3B5D50',
          secondary: '#EBB52C',
          accent: '#3B5D50',
          neutral: '#4A4A4A',
        
          info: '#3A919B',
          success: '#3E684C',
          warning: '#EBB52C',
          error: '#D95C45',
          'btn-primary': '#3B5D50',
          'btn-secondary': '#EBB52C',
          'btn-accent': '#F6B042',
          'btn-neutral': '#4A4A4A',
           // Base scale for light mode
           'base-body': '#FBF3ED',
        'base-100': '#FCFBF9',
        'base-200': '#F8F4F0',
        'base-300': '#F2EDE7',
        'base-400': '#E6E1DA',
        'base-500': '#D8D1C7',
        'base-600': '#C7BFB3',
        'base-700': '#A2A9A3',
        'base-800': '#76847E',
        'base-900': '#002E22',
        },
        // dark: {
        //   primary: '#3B5D50',
        //   secondary: '#EBB52C',
        //   accent: '#3B5D50',
        //   neutral: '#2A2A2A',
        //   info: '#3A919B',
        //   success: '#3E684C',
        //   warning: '#EBB52C',
        //   error: '#D95C45',
        //   'btn-primary': '#3B5D50',
        //   'btn-secondary': '#EBB52C',
        //   'btn-accent': '#F6B042',
        //   'btn-neutral': '#4A4A4A',
        //       // Base scale for dark mode
        // base-body: '#061B09',
        // 'base-100': '#061B09',
        // 'base-200': '#072419',
        // 'base-300': '#0A2E25',
        // 'base-400': '#1A3D32',
        // 'base-500': '#224F41',
        // 'base-600': '#2A604F',
        // 'base-700': '#8B9C8F',
        // 'base-800': '#AFBBB0',
        // 'base-900': '#E7ECE9',
        // },
      },
    ],
    // darkTheme: 'dark',
  },
};
export default config;
