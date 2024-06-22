module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    // Add more configurations or plugins as needed
  ],
  rules: {
    // Define your ESLint rules here
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    // Add more rules based on your coding standards
  },
  overrides: [
    {
      files: ['**/*.js'], // Adjust file patterns to match your JavaScript files
      excludedFiles: 'node_modules/*', // Exclude node_modules or other directories
    },
  ],
};