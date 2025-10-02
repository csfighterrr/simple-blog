import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1440px", // Max container width
      },
    },
    extend: {
      fontFamily: {
        heading: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        accent: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'monospace'],
      },
      fontSize: {
        'xs': 'var(--text-xs)',      // 12px
        'sm': 'var(--text-sm)',      // 14px
        'base': 'var(--text-base)',  // 16px
        'lg': 'var(--text-lg)',      // 18px
        'xl': 'var(--text-xl)',      // 20px
        '2xl': 'var(--text-2xl)',    // 24px
        '3xl': 'var(--text-3xl)',    // 30px
        '4xl': 'var(--text-4xl)',    // 36px
        '5xl': 'var(--text-5xl)',    // 48px
        '6xl': 'var(--text-6xl)',    // 60px
      },
      lineHeight: {
        'tight': 'var(--leading-tight)',
        'normal': 'var(--leading-normal)',
        'relaxed': 'var(--leading-relaxed)',
        'loose': 'var(--leading-loose)',
      },
      fontWeight: {
        'light': 'var(--font-light)',
        'normal': 'var(--font-normal)',
        'medium': 'var(--font-medium)',
        'semibold': 'var(--font-semibold)',
        'bold': 'var(--font-bold)',
        'black': 'var(--font-black)',
      },
      spacing: {
        '1': 'var(--space-1)',    // 8px
        '2': 'var(--space-2)',    // 16px
        '3': 'var(--space-3)',    // 24px
        '4': 'var(--space-4)',    // 32px
        '5': 'var(--space-5)',    // 40px
        '6': 'var(--space-6)',    // 48px
        '8': 'var(--space-8)',    // 64px
        '10': 'var(--space-10)',  // 80px
        '12': 'var(--space-12)',  // 96px
        '16': 'var(--space-16)',  // 128px
      },
      maxWidth: {
        'content': 'var(--content-width)', // 720px optimal reading width
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          black: "hsl(var(--primary-black))",
          white: "hsl(var(--primary-white))",
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
          gold: "hsl(var(--accent-gold))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Design system colors
        charcoal: "hsl(var(--charcoal))",
        stone: "hsl(var(--stone-gray))",
        whisper: "hsl(var(--whisper-gray))",
        link: {
          DEFAULT: "hsl(var(--link-blue))",
          hover: "hsl(var(--link-hover))",
        },
        success: "hsl(var(--success-green))",
        warning: "hsl(var(--warning-amber))",
        error: "hsl(var(--error-red))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.12)',
        'card-hover': '0 8px 16px rgba(0,0,0,0.15)',
        'button': '0 2px 4px rgba(0,0,0,0.1)',
        'focus': '0 0 0 2px hsl(var(--accent) / 0.2)',
      },
      aspectRatio: {
        '16/9': '16 / 9',
        '21/9': '21 / 9',
        '4/3': '4 / 3',
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "blur-up": "blurUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        blurUp: {
          "0%": { filter: "blur(10px)", opacity: "0" },
          "100%": { filter: "blur(0)", opacity: "1" },
        },
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
      screens: {
        'mobile': '320px',
        'tablet': '640px',
        'desktop': '1024px',
        'wide': '1440px',
      },
    },
  },
  plugins: [],
} satisfies Config;