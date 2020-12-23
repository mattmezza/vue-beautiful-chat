module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  extends: ['plugin:vue/recommended', 'plugin:prettier/recommended', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'vue/no-v-html': 'off',

    /*
     * Following rules are not part of any preset and must be enabled manually
     * See https://vuejs.github.io/eslint-plugin-vue/rules/#uncategorized
     **/
    'vue/component-name-in-template-casing': 'error', // enforce PascalCase

    'vue/padding-line-between-blocks': 'error',

    'vue/script-indent': [
      'error',
      2,
      {
        switchCase: 1 // indent case statements 1 level
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
