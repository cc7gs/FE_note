const path=require('path');
const  cleanWebpackPlugin=require('clean-webpack-plugin');
const htmlWebpackPlugin=require('html-webpack-plugin')
module.exports = {
  mode:'development',
  devtool:'source-map',
  entry: './src/index.js',
  module: {
    rules: [
      { 
        test: /\.(png|jpg|gif)$/, 
        use: {
          loader:'file-loader',
          options:{
            name:'[name].[ext]'
          }
        }
       },
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 138228
      //       }
      //     }
      //   ]
      // },
      // {
      //   test:/\.(eot|svg|ttf|woff)$/,  //打包字体
      //   use:["file-loader"]
      // },
      {
        test:/\.css$/,
        use:[
          "style-loader",
          "css-loader"
        ]
      }
    ]
  },
  plugins:[
    new cleanWebpackPlugin(), //预先清理
    new htmlWebpackPlugin({
      title:'html plugin demo',
      template:'index.html'
    })
  ],
  output:{
    publicPath:'/',
    filename:'bundle.js',
    path:path.resolve(__dirname,'dist')
  }
}