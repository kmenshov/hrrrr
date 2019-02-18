module.exports = {
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js'
      }
    },
  },
  extends: 'airbnb',
  rules: {
    "strict": ["off"],
    "no-unused-vars": ["error", { "args": "none" }],
  },
};
