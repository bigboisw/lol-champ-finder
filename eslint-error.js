module.exports = { //just made this file to get rid of the multi-word error :p
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
  ],
  rules: {
    'vue/multi-word-component-names': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
  