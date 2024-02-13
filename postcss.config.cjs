const postcssPresetEnv = require('postcss-preset-env')
const isProdMode = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: isProdMode
    ? [
        postcssPresetEnv({
          stage: 0,
        }),
      ]
    : [],
}
