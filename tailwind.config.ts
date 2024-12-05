import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        spotify: "#1ed760",
        youtube: "#FF9DB2",
        stroke: "#3A3A3A",
        subtle: "#A1A1A1",
        mainbackground: "#1A1A1A",
        subbackground: "#202020",
        subhover: "#282828",
        subspotify: "#6FFFC3",
        // card: {
        //   DEFAULT: "hsl(var(--card))",
        //   foreground: "hsl(var(--card-foreground))",
        // },
        // popover: {
        //   DEFAULT: "hsl(var(--popover))",
        //   foreground: "hsl(var(--popover-foreground))",
        // },
        // primary: {
        //   DEFAULT: "hsl(var(--primary))",
        //   foreground: "hsl(var(--primary-foreground))",
        // },
        // secondary: {
        //   DEFAULT: "hsl(var(--secondary))",
        //   foreground: "hsl(var(--secondary-foreground))",
        // },
        // muted: {
        //   DEFAULT: "hsl(var(--muted))",
        //   foreground: "hsl(var(--muted-foreground))",
        // },
        // accent: {
        //   DEFAULT: "hsl(var(--accent))",
        //   foreground: "hsl(var(--accent-foreground))",
        // },
        // destructive: {
        //   DEFAULT: "hsl(var(--destructive))",
        //   foreground: "hsl(var(--destructive-foreground))",
        // },
        // border: "hsl(var(--border))",
        // input: "hsl(var(--input))",
        // ring: "hsl(var(--ring))",
        // chart: {
        //   "1": "hsl(var(--chart-1))",
        //   "2": "hsl(var(--chart-2))",
        //   "3": "hsl(var(--chart-3))",
        //   "4": "hsl(var(--chart-4))",
        //   "5": "hsl(var(--chart-5))",
        // },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      keyframes: {
        "spin-logo": {
          "0%": {
            transform: "rotate(0deg) scale(0.8)",
          },
          "50%": {
            transform: "rotate(180deg) scale(0.6)",
          },
          "100%": {
            transform: "rotate(360deg) scale(0.8)",
          },
        },
      },
      animation: {
        "spin-logo": "spin-logo 10s linear infinite",
      },
      boxShadow: {
        spotify: "0px 0px 8px 0px rgba(79, 232, 59, 0.3)",
        "spotify-hover": "0px 0px 16px 0px rgba(79, 232, 59)",
        youtube: "0px 0px 8px 0px rgba(255, 0, 0, 0.3)",
        "youtube-hover": "0px 0px 16px 0px rgba(255, 0, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
