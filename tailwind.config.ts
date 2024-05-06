import type { Config } from "tailwindcss";

const config: Config = {
  mode: "jit", // Aktifkan mode just-in-time (JIT) untuk Tailwind CSS
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ], // Purge CSS yang tidak digunakan dalam mode produksi
  darkMode: "class", // Mengaktifkan dark mode berdasarkan class
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
