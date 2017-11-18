var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

function publicPath() {
  var publicPath = 'prod';
  if(process.env.NODE_ENV  === 'dev' ){
    publicPath = config.dev.assetsPublicPath;
  }
  if(process.env.NODE_ENV  === 'test' ){
    publicPath = config.buildTest.assetsPublicPath;
  }
  if(process.env.NODE_ENV  === 'pre' ){
    publicPath = config.buildPre.assetsPublicPath;
  }
  if(process.env.NODE_ENV  === 'prod' ){
    publicPath = config.buildProd.assetsPublicPath;
  }
  return publicPath;
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.buildProd.assetsRoot,
    filename: '[name].js',
    publicPath: publicPath()
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '&': resolve('static')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'),resolve('node_modules/adm-portal/src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 300000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
