import { setupInspiraUI } from '@inspira-ui/plugins'
import tailwindAspectRatio from '@tailwindcss/aspect-ratio'
import animate from 'tailwindcss-animate'
import tailwindcssBackgroundPatterns from 'tailwindcss-background-patterns'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  safelist: ['dark'],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1380px',
    },
    container: {
      center: true,
      padding: '1rem',
    },

    extend: {
      fontSize: {
        'clamp': 'clamp(0.75rem, 5vw, 1.25rem)',
        'clamp-lg': 'clamp(1rem, 5vw, 2rem)',
      },

      spacing: {
        25: '6.25rem',
        50: '12.5rem',
      },
      fontFamily: {
        iranyekan: 'IRANYekan',
      },

      colors: {
        'border': 'hsl(var(--border))',
        'input': 'hsl(var(--input))',
        'ring': 'hsl(var(--ring))',
        'background': 'hsl(var(--background))',
        'foreground': 'hsl(var(--foreground))',
        'sc-background': 'hsl(var(--sc-background))',
        'sc-foreground': 'hsl(var(--sc-foreground))',
        'warning': 'hsl(var(--warning))',
        'success': 'hsl(var(--success))',
        'alert': 'hsl(var(--alert))',
        'primary': {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        'secondary': {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        'destructive': {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        'muted': {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        'accent': {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        'popover': {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        'card': {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },

      borderRadius: {
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'collapsible-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: 0 },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'collapsible-down': 'collapsible-down 0.2s ease-in-out',
        'collapsible-up': 'collapsible-up 0.2s ease-in-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
    },
  },
  plugins: [
    animate,
    setupInspiraUI,
    tailwindAspectRatio,
    tailwindcssBackgroundPatterns,
  ],
}
