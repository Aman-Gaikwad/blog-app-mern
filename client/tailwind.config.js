/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";
import scrollbar from "tailwind-scrollbar";

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
<<<<<<< HEAD
    flowbite.content(),
=======
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}', // Spread the content array instead of calling the function
>>>>>>> 2d8cafffed25444cbd254b2c8c2af47a6b2475ed
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
<<<<<<< HEAD
    scrollbar,
=======
    scrollbar, // Use the imported plugin directly
>>>>>>> 2d8cafffed25444cbd254b2c8c2af47a6b2475ed
  ],
};
