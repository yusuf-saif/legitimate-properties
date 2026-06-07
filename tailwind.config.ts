import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — from Design System Brief
        espresso:    '#2C2416',
        taupe:       '#7C6A50',
        gold:        '#B59A6A',
        cream:       '#F5F0E8',
        terracotta:  '#C47C50',
        'text-body': '#3D3326',
        'text-muted':'#8C7B69',
        'border-soft':'#D6C8B4',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body:    ['var(--font-inter)', 'Helvetica Neue', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem',  { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem',  { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'h1':         ['2.5rem',  { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'h2':         ['2rem',    { lineHeight: '1.2',  letterSpacing: '-0.01em' }],
        'h3':         ['1.375rem',{ lineHeight: '1.3'  }],
        'h4':         ['1.125rem',{ lineHeight: '1.4'  }],
        'body-lg':    ['1.125rem',{ lineHeight: '1.7'  }],
        'body-md':    ['1rem',    { lineHeight: '1.65' }],
        'body-sm':    ['0.875rem',{ lineHeight: '1.6'  }],
        'label':      ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        'content': '1280px',
        'text':    '760px',
      },
      boxShadow: {
        'card':       '0 4px 24px rgba(44, 36, 22, 0.08)',
        'card-hover': '0 12px 40px rgba(44, 36, 22, 0.14)',
        'nav':        '0 2px 20px rgba(44, 36, 22, 0.12)',
      },
      borderRadius: {
        'card': '12px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease-out forwards',
        'fade-in':    'fadeIn 0.4s ease-out forwards',
        'count-up':   'countUp 1s ease-out forwards',
      },
      keyframes: {
        fadeUp:  { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
      },
    },
  },
  plugins: [],
}

export default config
