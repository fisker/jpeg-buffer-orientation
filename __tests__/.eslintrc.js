/*!
 * config file for `eslint`
 *
 * update: wget -O .eslintrc.js https://git.io/fjJKA
 * document: https://eslint.org/docs/user-guide/configuring
 */

/* @fisker/eslint-config https://git.io/fjOeH */

module.exports = {
  root: true,
  parserOptions: {},
  extends: ['@fisker', '@fisker/jest'],
  settings: {},
  rules: {},
  plugins: [],
  overrides: [],
  globals: {
    Uint8Array: false,
    DataView: false,
  },
}
