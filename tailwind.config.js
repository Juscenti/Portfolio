/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Bebas Neue'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        ink: "#0D0D0D",
        "ink-soft": "#181818",
        paper: "#F5F0E8",
        "paper-muted": "#D4CDC0",
        amber: "#E8A020",
        rust: "#C4552A",
        sage: "#4A6741",
        mist: "#8B9EA8",
        panel: "#141315",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        "slide-in": "slideIn 0.6s ease forwards",
        float: "float 6s ease-in-out infinite",
        grain: "grain 8s steps(10) infinite",
        "cursor-orbit": "cursorOrbit 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "20%": { transform: "translate(3%, 1%)" },
          "30%": { transform: "translate(-1%, 4%)" },
          "40%": { transform: "translate(2%, -2%)" },
          "50%": { transform: "translate(-3%, 3%)" },
          "60%": { transform: "translate(1%, -1%)" },
          "70%": { transform: "translate(-2%, 2%)" },
          "80%": { transform: "translate(3%, -3%)" },
          "90%": { transform: "translate(-1%, 1%)" },
        },
        cursorOrbit: {
          "0%": { transform: "translate(-50%, -50%) scale(1)" },
          "50%": { transform: "translate(-50%, -50%) scale(1.08)" },
          "100%": { transform: "translate(-50%, -50%) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
