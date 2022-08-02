module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'no-console': 'off',
    'comma-dangle': ['error', 'never'],
    'no-trailing-spaces': ['error', { ignoreComments: true }],
    'arrow-parens': [0, 'always'],
    'implicit-arrow-linebreak': [0, 'always'],
    'no-useless-escape': [0, 'always'],
    'no-underscore-dangle': [0, 'always'],
    'operator-linebreak': [0, 'always'],
    'object-curly-newline': ['off'],
    'no-restricted-syntax': ['off'],
    'no-await-in-loop': ['off'],
    'guard-for-in': ['off'],
    camelcase: ['off'],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ]
  }
};
