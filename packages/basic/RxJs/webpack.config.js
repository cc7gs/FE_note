const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
module.exports={
    entry:'./src/index.ts',
    devtool:'inline-source-map',
    resolve:{
        extensions:['.ts','.js','.tsx']
    },
    module:{
        rules:[
            {
                test:/\.tsx?$/,
                use:'ts-loader',
                exclude:/node_modules/
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'learning rxJs demo',
            template:'./src/template/index.html'
        })
    ],
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    }
}