module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:vue/vue3-essential'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // 防止报错：Component name "index" should always be multi-word.
    'vue/multi-word-component-names': 'off',
    'max-len': ['warn', 100],
    'no-undef': 'off',
  },
};
