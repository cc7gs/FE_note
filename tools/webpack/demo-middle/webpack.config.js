const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  mode:'development',
  entry:{
    index:'./src/index.js',
    another:'./src/modleA.js'
  },
  optimization:{
    splitChunks:{
      chunks:'all'
    }
  },
  plugins: [
    new cleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: 'index.html'
    })
  ]

}