// const {join}=require('path');
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const webpackBuildNotifierPlugin=require('webpack-build-notifier');
// module.exports={
//     devServer:{
//         contentBase:join(__dirname,'../dist'),
//         hot:true,
//         quiet: true,
//     },
//     plugins:[
//         new FriendlyErrorsPlugin({
//             compilationSuccessInfo: {
//               messages: ['You application is running here http://localhost:3000'],
//               notes: ['Some additionnal notes to be displayed unpon successful compilation']
//             },
//             onErrors: function (severity, errors) {
//               // You can listen to errors transformed and prioritized by the plugin
//               // severity can be 'error' or 'warning'
//             },
//             // should the console be cleared between each compilation?
//             // default is true
//             clearConsole: true,
           
//             // add formatters and transformers (see below)
//             additionalFormatters: [],
//             additionalTransformers: []
//           })
//     ]
// }