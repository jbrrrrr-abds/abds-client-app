/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        "xxs": "0.4rem",
        "xs": "0.6rem",
        "md": "0.8rem",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        brandBlack: {
          DEFAULT: "#282829",
          900: "#3c3c3d",
          800: "#444446",
          700: "#4e4f50",
          600: "#5c5d5e",
          500: "#6b6b6f",
          400: "#86868a",
          300: "#afb0b1",
          200: "#d0d0d1",
          100: "#e6e6e7",
          50: "#f5f5f6",
        },
        brandWhite: {
          DEFAULT: "#f0eee3",
          300: "#c0b689",
          200: "#d6d0b1",
          100: "#f0eee3",
          50: "#f8f7f2",
        },
        gold: "#b48645",
        lightGray: "#646464",
        goldUI: "hsl(var(--goldUI))",
        "goldUI-foreground": "hsl(var(--warning-foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["GothamSS", "sans-serif"],
        Anton: "Anton",
        GothamSS: "GothamSS",
        GothamSSMed: "GothamSS-Med",
        GothamSSBold: "GothamSS-Bold",
        GothamSSBlack: "GothamSS-Black",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require("tailwindcss-animate"),
  ],
};