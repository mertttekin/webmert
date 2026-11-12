/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./composables/**/*.{js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    // TIMESLICE: every corner is square, no exceptions
    borderRadius: {
      none: "0",
      DEFAULT: "0",
    },
    boxShadow: {
      none: "none",
    },
    extend: {
      fontFamily: {
        display: ["Anybody", '"Anybody fallback"', "Arial", "sans-serif"],
        sans: ["Geist", '"Geist fallback"', "Arial", "system-ui", "sans-serif"],
        mono: ['"Geist Mono"', '"Geist Mono fallback"', '"Courier New"', "ui-monospace", "monospace"],
      },
      colors: {
        bg: token("bg"),
        surface: token("surface"),
        "surface-2": token("surface-2"),
        line: token("line"),
        "line-strong": token("line-strong"),
        ink: token("ink"),
        "ink-2": token("ink-2"),
        "ink-3": token("ink-3"),
        accent: token("accent"),
        "accent-ink": token("accent-ink"),
        "accent-strong": token("accent-strong"),
        "accent-line": token("accent-line"),
      },
      maxWidth: {
        "8xl": "1440px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        inout: "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      zIndex: {
        cursor: "40",
        nav: "50",
        menu: "60",
        shutter: "70",
      },
    },
  },
  plugins: [],
};
