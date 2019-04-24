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
    "import/prefer-default-export": ["off"],
    "max-len": ["warn", { "code": 120 }],
    "no-unused-vars": ["error", { "args": "none" }],
    "object-curly-newline": ["error", { "consistent": true }],
    "one-var": ["off"],
    "one-var-declaration-per-line": ["off"],
    "operator-linebreak": ["error", "after"],
    "prefer-arrow-callback": ["off"],
    "react/destructuring-assignment": ["off"],
    "space-before-function-paren": ["error", {"anonymous": "always", "named": "never", "asyncArrow": "always"}],
    "spaced-comment": ["off"],
    "strict": ["off"],
  },
};
