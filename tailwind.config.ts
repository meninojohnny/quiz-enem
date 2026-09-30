import containerQueries from '@tailwindcss/container-queries'
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 1px)',
        sm: 'calc(var(--radius) - 2px)',
      },
      fontSize: {
        // Escala fluida para projeção: cresce com a largura da tela.
        'stage-sm': ['clamp(1rem, 0.6rem + 0.9vw, 1.6rem)', { lineHeight: '1.3' }],
        'stage-md': ['clamp(1.15rem, 0.7rem + 1.15vw, 2rem)', { lineHeight: '1.3' }],
        'stage-lg': ['clamp(1.6rem, 0.8rem + 2vw, 3.4rem)', { lineHeight: '1.15' }],
        'stage-xl': ['clamp(2.2rem, 1rem + 3.2vw, 5rem)', { lineHeight: '1' }],
      },
      keyframes: {
        wipe: {
          from: { clipPath: 'inset(0 100% 0 0)' },
          to: { clipPath: 'inset(0 0 0 0)' },
        },
        rise: {
          from: { transform: 'translateY(0.75rem)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-6px)' },
          '40%, 80%': { transform: 'translateX(6px)' },
        },
        live: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        wipe: 'wipe 520ms cubic-bezier(0.16, 1, 0.3, 1) both',
        rise: 'rise 420ms cubic-bezier(0.16, 1, 0.3, 1) both',
        shake: 'shake 360ms ease-in-out',
        live: 'live 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [containerQueries],
} satisfies Config
