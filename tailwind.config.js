const { hairlineWidth } = require("nativewind/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  corePlugins: {
    backgroundOpacity: true,
    divideOpacity: true,
  },
  theme: {
    colors: {
      background: "var(--background)",
      text: "var(--text)",
      primary: "var(--primary)",
      secondary: "var(--secondary)",
      accent: "var(--accent)",
      error: "var(--error)",
      textBlack: "var(--text-black)",
      textWhite: "var(--text-white)",

      // Primary with Opacity
      "primary-10": "rgba(var(--primary-rgb), 0.1)",
      "primary-20": "rgba(var(--primary-rgb), 0.2)",
      "primary-30": "rgba(var(--primary-rgb), 0.3)",
      "primary-40": "rgba(var(--primary-rgb), 0.4)",
      "primary-50": "rgba(var(--primary-rgb), 0.5)",
      "primary-60": "rgba(var(--primary-rgb), 0.6)",
      "primary-70": "rgba(var(--primary-rgb), 0.7)",
      "primary-80": "rgba(var(--primary-rgb), 0.8)",
      "primary-90": "rgba(var(--primary-rgb), 0.9)",
      "primary-95": "rgba(var(--primary-rgb), 0.95)",

      // Secondary with Opacity
      "secondary-10": "rgba(var(--secondary-rgb), 0.1)",
      "secondary-20": "rgba(var(--secondary-rgb), 0.2)",
      "secondary-30": "rgba(var(--secondary-rgb), 0.3)",
      "secondary-40": "rgba(var(--secondary-rgb), 0.4)",
      "secondary-50": "rgba(var(--secondary-rgb), 0.5)",
      "secondary-60": "rgba(var(--secondary-rgb), 0.6)",
      "secondary-70": "rgba(var(--secondary-rgb), 0.7)",
      "secondary-80": "rgba(var(--secondary-rgb), 0.8)",
      "secondary-90": "rgba(var(--secondary-rgb), 0.9)",
      "secondary-95": "rgba(var(--secondary-rgb), 0.95)",

      // Accent with Opacity
      "accent-10": "rgba(var(--accent-rgb), 0.1)",
      "accent-20": "rgba(var(--accent-rgb), 0.2)",
      "accent-30": "rgba(var(--accent-rgb), 0.3)",
      "accent-40": "rgba(var(--accent-rgb), 0.4)",
      "accent-50": "rgba(var(--accent-rgb), 0.5)",
      "accent-60": "rgba(var(--accent-rgb), 0.6)",
      "accent-70": "rgba(var(--accent-rgb), 0.7)",
      "accent-80": "rgba(var(--accent-rgb), 0.8)",
      "accent-90": "rgba(var(--accent-rgb), 0.9)",
      "accent-95": "rgba(var(--accent-rgb), 0.95)",

      // Error with Opacity
      "error-10": "rgba(var(--error-rgb), 0.1)",
      "error-20": "rgba(var(--error-rgb), 0.2)",
      "error-30": "rgba(var(--error-rgb), 0.3)",
      "error-40": "rgba(var(--error-rgb), 0.4)",
      "error-50": "rgba(var(--error-rgb), 0.5)",
      "error-60": "rgba(var(--error-rgb), 0.6)",
      "error-70": "rgba(var(--error-rgb), 0.7)",
      "error-80": "rgba(var(--error-rgb), 0.8)",
      "error-90": "rgba(var(--error-rgb), 0.9)",
      "error-95": "rgba(var(--error-rgb), 0.95)",

      // Background with Opacity
      "background-10": "rgba(var(--background-rgb), 0.1)",
      "background-20": "rgba(var(--background-rgb), 0.2)",
      "background-30": "rgba(var(--background-rgb), 0.3)",
      "background-40": "rgba(var(--background-rgb), 0.4)",
      "background-50": "rgba(var(--background-rgb), 0.5)",
      "background-60": "rgba(var(--background-rgb), 0.6)",
      "background-70": "rgba(var(--background-rgb), 0.7)",
      "background-80": "rgba(var(--background-rgb), 0.8)",
      "background-90": "rgba(var(--background-rgb), 0.9)",
      "background-95": "rgba(var(--background-rgb), 0.95)",

      // Text with Opacity
      "text-10": "rgba(var(--text-rgb), 0.1)",
      "text-20": "rgba(var(--text-rgb), 0.2)",
      "text-30": "rgba(var(--text-rgb), 0.3)",
      "text-40": "rgba(var(--text-rgb), 0.4)",
      "text-50": "rgba(var(--text-rgb), 0.5)",
      "text-60": "rgba(var(--text-rgb), 0.6)",
      "text-70": "rgba(var(--text-rgb), 0.7)",
      "text-80": "rgba(var(--text-rgb), 0.8)",
      "text-90": "rgba(var(--text-rgb), 0.9)",
      "text-95": "rgba(var(--text-rgb), 0.95)",

      // Text-White with Opacity
      "text-white-10": "rgba(var(--text-white-rgb), 0.1)",
      "text-white-20": "rgba(var(--text-white-rgb), 0.2)",
      "text-white-30": "rgba(var(--text-white-rgb), 0.3)",
      "text-white-40": "rgba(var(--text-white-rgb), 0.4)",
      "text-white-50": "rgba(var(--text-white-rgb), 0.5)",
      "text-white-60": "rgba(var(--text-white-rgb), 0.6)",
      "text-white-70": "rgba(var(--text-white-rgb), 0.7)",
      "text-white-80": "rgba(var(--text-white-rgb), 0.8)",
      "text-white-90": "rgba(var(--text-white-rgb), 0.9)",
      "text-white-95": "rgba(var(--text-white-rgb), 0.95)",

      // Text-Black with Opacity
      "text-black-10": "rgba(var(--text-black-rgb), 0.1)",
      "text-black-20": "rgba(var(--text-black-rgb), 0.2)",
      "text-black-30": "rgba(var(--text-black-rgb), 0.3)",
      "text-black-40": "rgba(var(--text-black-rgb), 0.4)",
      "text-black-50": "rgba(var(--text-black-rgb), 0.5)",
      "text-black-60": "rgba(var(--text-black-rgb), 0.6)",
      "text-black-70": "rgba(var(--text-black-rgb), 0.7)",
      "text-black-80": "rgba(var(--text-black-rgb), 0.8)",
      "text-black-90": "rgba(var(--text-black-rgb), 0.9)",
      "text-black-95": "rgba(var(--text-black-rgb), 0.95)",
    },
    extend: {
      colors: {
        text: "var(--text)",
        background: "var(--background)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
      },

      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
