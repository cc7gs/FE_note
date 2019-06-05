const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },

  plugins: [
    new cleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: 'index.html'
    }),

  ],
    // optimization:{
  //   splitChunks:{
  //     chunks:'all'
  //   }
  // },
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       use: {
  //         loader: 'babel-loader'
  //       }
  //     }
  //   ]
  // },

}