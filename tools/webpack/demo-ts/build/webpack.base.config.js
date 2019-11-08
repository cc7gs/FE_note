const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    entry:{
      app:'./src/index.ts'
    },
  
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    module: {
        rules: [  
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
          }
        ]
      },
    plugins:[
        new HtmlWebpackPlugin({
            title:'webpack-ts-deno',
            template:'./src/template/index.html'
        })
    ],
    output:{
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist')
    }
}