const styles = require("./config/styles.json");

let fontBase = Number(styles.fonts.fontSize.base.replace("px", ""));
let fontScale = Number(styles.fonts.fontSize.scale);

let h6 = fontBase / fontBase;
let h5 = h6 * fontScale;
let h4 = h5 * fontScale;
let h3 = h4 * fontScale;
let h2 = h3 * fontScale;
let h1 = h2 * fontScale;

let font, fontType;

if (styles.fonts.fontFamily.font) {
  font = styles.fonts.fontFamily.font
    .replace(/\+/g, " ")
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");
  fontType = styles.fonts.fontFamily.fontType;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./src/content/**/*.{md,mdx}",
  ],
  theme: {
    screens: {
      sm: "540px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        text: styles.colors.default.textColor.default,
        dark: styles.colors.default.textColor.headlines,
        primary: styles.colors.default.themeColor.primary,
        body: styles.colors.default.themeColor.body,
        border: styles.colors.default.themeColor.border,
      },
      fontSize: {
        base: fontBase + "px",
        h1: h1 + "rem",
        "h1-sm": h1 * 0.9 + "rem",
        h2: h2 + "rem",
        "h2-sm": h2 * 0.8 + "rem",
        h3: h3 + "rem",
        "h3-sm": h3 * 0.8 + "rem",
        h4: h4 + "rem",
        h5: h5 + "rem",
        h6: h6 + "rem",
      },
      fontFamily: {
        primary: [font, fontType]
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-bootstrap-grid")({ generateContainer: false }),
  ],
}
