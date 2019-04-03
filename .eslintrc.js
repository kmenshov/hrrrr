module.exports = {
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js'
      }
    },
  },
  globals: {
    window: 'readonly',
  },
  extends: 'airbnb',
  rules: {
    "func-names": ["off"],
    "no-unused-vars": ["error", { "args": "none" }],
    "object-curly-newline": ["error", { "consistent": true }],
    "operator-linebreak": ["error", "after"],
    "space-before-function-paren": ["error", {"anonymous": "always", "named": "never", "asyncArrow": "always"}],
    "strict": ["off"],
  },
};
