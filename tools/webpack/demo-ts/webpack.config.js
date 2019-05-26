const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const makePlugins = (config) => {
  const configs = [
    new cleanWebpackPlugin(),

  ];
  Object.keys(config.entry).forEach(key => {
    configs.push(
      new htmlWebpackPlugin({
        title: `${key}`,
        template: 'index.html',
        filename: `${key}.html`,
        chunks: ['runtime', key],
      })
    );
    console.log(configs.length);
  });
  return configs;
}
const config = {
  entry: {
    index: './src/index.tsx',
    list: './src/list.tsx'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devServer: {
    port: 8080, //启动端口号
    contentBase: './dist', //从什么位置查找文件
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
config.plugins = makePlugins(config)
module.exports = config;