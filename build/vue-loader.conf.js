var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'prod'

var buildOptions;

if(process.env.NODE_ENV  === 'test' ){
  buildOptions = config.buildTest;
}
if(process.env.NODE_ENV  === 'pre' ){
  buildOptions = config.buildPre;
}
if(process.env.NODE_ENV  === 'prod' ){
  buildOptions = config.buildProd;
}

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: buildOptions
      ? buildOptions.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
