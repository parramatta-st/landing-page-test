/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#e15b26",
          blue: "#2ebadf",
        },
        // Soft section backgrounds (Epping-style pastels)
        cream: "#fff3ed",
        mint: "#e6f7fb",
        mint2: "#dff4f8",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.08)",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(48px, -26px) scale(1.06)" },
        },
        blob2: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(-44px, 30px) scale(1.08)" },
        },
      },
      animation: {
        // Slightly faster than before so the movement is noticeable,
        // but still subtle/premium (not distracting).
        // Slightly faster so the movement is noticeable (but still premium/subtle).
        blob: "blob 10s ease-in-out infinite",
        blob2: "blob2 16s ease-in-out infinite",
      },
    }
  },
  plugins: []
};