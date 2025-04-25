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
    sans: [ 'Poppins', 'Inter', 'system-ui', 'sans' ],
    monospace: [ 'DM Mono', 'monospace' ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: [ 'Poppins', 'Inter', 'system-ui', 'sans' ],
        monospace: [ 'DM Mono', 'monospace' ],
        sora: [ 'Sora', 'sans-serif' ],
        teko: [ 'Teko', 'sans-serif' ],
      },
      colors: {

        primary: '#395B55',
        secondary: '#C2765C',
        accent: '#3B5D50',
        neutral: '#F8BC42',
        info: '#3A919B',
        success: '#4C7C59',
        warning: '#F8BC42',
        error: '#C84730',
        blue: "#449BAF",

        black: '#000000',
        white: '#FFFFFF',
        ivory: '#fffaf0',
        green: '#03D47C',
        greenHover: '#00C271',
        greenPressed: '#35DD96',
        red: '#F25730',
        redHover: '#DE4822',
        redPressed: '#F57959',
        transparent: 'transparent',
        background: "#F3F1EB",
        
      },


    },
  },
  plugins: [ require('daisyui') ],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#3B5D50',
          secondary: '#C27C5E',
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
          'base-100': '#F7F1EA',// for background
          'base-200': '#EDE7E1', // for hover
          'base-300': '#E5DFD8', // for border


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
        // 'base-100': '#061B09',
        // 'base-200': '#072419',
        // 'base-300': '#0A2E25',

        // },
      },
    ],
    // darkTheme: 'dark',
  },
};
export default config;
