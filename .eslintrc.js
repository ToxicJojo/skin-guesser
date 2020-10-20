module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/essential',
    '@vue/standard',
  ],

  parserOptions: {
    parser: 'babel-eslint',
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/arrow-spacing': 'error',
    'vue/eqeqeq': 'error',
    'comma-dangle': ['error', 'always-multiline'],
  },

  'extends': [
    'plugin:vue/recommended',
    '@vue/standard',
  ],
}
