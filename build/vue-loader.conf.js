var utils = require('./utils')
var config = require('../config')

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: config.build
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: process.env.NODE_ENV === 'prod'
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
