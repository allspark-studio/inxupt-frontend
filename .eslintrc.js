module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:vue/vue3-essential', 'plugin:prettier/recommended'],
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
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    // 解决 enum 定义时报错：XXX is already declared in the upper scope......
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    // 解决 enum 定义时报错：XXX is defined but never used
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'global-require': 0,
  },
};
