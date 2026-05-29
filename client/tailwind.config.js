/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#0A0A0B",
          800: "#101012",
          700: "#16161A",
          600: "#1E1E22",
          500: "#2A2A30",
        },
        bone: {
          100: "#F6F2EA",
          200: "#E9E3D5",
          300: "#BFB7A6",
          400: "#8A8378",
        },
        gold: {
          50: "#F6ECD3",
          100: "#E8D29A",
          300: "#D4B071",
          500: "#C8A765",
          600: "#A8884B",
          700: "#7C6334",
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "ui-serif", "Georgia", "serif"],
        sans: ['Inter', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        luxe: "0.22em",
      },
      boxShadow: {
        gold: "0 10px 40px -10px rgba(200, 167, 101, 0.35)",
        ink: "0 30px 80px -20px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "grain":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.78  0 0 0 0 0.66  0 0 0 0 0.40  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
    },
  },
  plugins: [],
};
