const pxtorem = require('postcss-pxtorem');
const postcssFocus = require('postcss-focus');
const postcssPresetEnv = require('postcss-preset-env');

// PostCSS plugin chain, applied to compiled CSS by Astro/Vite.
//
// Plugin order matters:
//   1. preset-env   — transform modern CSS + add vendor prefixes (bundles
//                     Autoprefixer, so a standalone autoprefixer is omitted).
//   2. pxtorem      — convert px → rem (rootValue matches the 16px SCSS base).
//   3. focus        — append :focus-visible to :hover for keyboard a11y.
module.exports = {
  plugins: [
    // Convert modern CSS into browser-understood CSS. Browsers are taken from
    // .browserslistrc. autoprefixer:true delegates prefixing to the bundled
    // Autoprefixer, so a separate autoprefixer plugin is not needed.
    postcssPresetEnv({ 
      stage: 1, 
      features: {
        'logical-properties-and-values': false 
      }, 
      autoprefixer: true }),

    // px -> rem conversion. rootValue 16 keeps parity with the SCSS base font.
    pxtorem({
      rootValue: 16,
      minPixelValue: 0.5,
    }),

    // Append :focus-visible to every :hover for keyboard accessibility.
    postcssFocus({ selectors: ['hover'] }),
  ],
};
