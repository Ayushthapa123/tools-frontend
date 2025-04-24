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
        'forest-green-500':'#3b5f45'
      },
      fontSize: {
        h1: ['30px', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        h3: ['20px', { lineHeight: '1.3', fontWeight: '500' }],
        body: ['16px', { lineHeight: '1.5' }],
        small: ['15px', { lineHeight: '1.5' }],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        'nepal-theme': {
          primary: '#3B5D50',
          secondary: '#EBB52C',
          accent: '#3B5D50',
          neutral: '#4A4A4A',
          'base-100': '#F7F3EB',
          info: '#3A919B',
          success: '#3E684C',
          warning: '#EBB52C',
          error: '#D95C45',
          'btn-primary': '#3B5D50',
          'btn-secondary': '#EBB52C',
          'btn-accent': '#F6B042',
          'btn-neutral': '#4A4A4A',
        },
      },
    ],
  },
};
export default config;
