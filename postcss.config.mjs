// //  /** @type {import('postcss-load-config').Config} */
// // const config = {
// //   plugins: {
// //     // tailwindcss: {},
// //     '@tailwindcss/postcss': {},
// //     autoprefixer: {}
// //   },
// // };

// // export default config;
// // postcss.config.js
// // src/postcss.config.js
// /** @type {import('postcss-load-config').Config} */
// module.exports = {
//   plugins: {
//     '@tailwindcss/postcss': {},  // ← wrap this key in quotes
//     autoprefixer: {}
//   }
// }








const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;