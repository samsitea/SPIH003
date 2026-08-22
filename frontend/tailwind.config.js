/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['Unbounded', 'sans-serif'],
                sans: ['"IBM Plex Sans"', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            colors: {
                neon: '#00E5A0',
                watch: '#FFD600',
                critical: '#FF3366',
                void: '#030712',
                panel: '#0f172a',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
                popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
                primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
                secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
                muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
                accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
                destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
                'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
                marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
                float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
                'pulse-ring': { '0%': { transform: 'scale(0.9)', opacity: '0.7' }, '100%': { transform: 'scale(1.9)', opacity: '0' } },
                'dash-flow': { to: { strokeDashoffset: '-24' } },
                scanline: { '0%': { top: '-10%' }, '100%': { top: '110%' } },
                'spin-slow': { to: { transform: 'rotate(360deg)' } },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                marquee: 'marquee 46s linear infinite',
                'marquee-slow': 'marquee 90s linear infinite',
                float: 'float 6s ease-in-out infinite',
                'float-slow': 'float 9s ease-in-out infinite',
                'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.22,1,0.36,1) infinite',
                'dash-flow': 'dash-flow 1.2s linear infinite',
                scanline: 'scanline 1.1s linear infinite',
                'spin-slow': 'spin-slow 22s linear infinite',
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
