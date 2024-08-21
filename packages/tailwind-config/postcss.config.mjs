/** @type {import('postcss-load-config').Config} */
const config = {
  theme: {
    extend: {
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(-10%)" },
          "50%": { transform: "translateY(10%)" },
        },
      },
      animation: {
        bounce: "bounce 1s ease-in-out infinite",
      },
    },
  },
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
