/** @type {import('prettier').Config} */
const config = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  trailingComma: 'none',
  singleQuote: true,
  plugins: ['prettier-plugin-tailwindcss']
};

module.exports = config;
