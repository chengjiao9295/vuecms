const path = require('path');
//这个配置文件，其实就是一个js文件，通过node中的模块操作，向外暴露了一个配置对象
// 启动热更新第二步
const webpack = require('webpack');

// 导入在内存中生成html页面的插件
// 只要是插件，就需要放到plugins节点中去
//这个插件的两个作用：
//1. 自动在内存中根据指定页面生成一个内存的页面
//2. 自动，把打包好的bundle.js追加到页面中去
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    entry: path.join(__dirname, './src/main.js'), //入口，表示，要使用的webpack打包哪个文件
    output: { //输出文件相关的配置
        path: path.join(__dirname, './dist'), //指定打包好的文件，输出到哪个目录中去
        filename: 'bundle.js' //这是指定输出的文件的名称
    },
    mode: 'development',
    devServer: { //这是配置dev-server命令参数的第二种方式，相对来说，这种方式麻烦一些
        // --open --port 3000 --contentBase src --hot
        open: true, //自动打开浏览器
        port: 3000, //设置启动时运行端口
        //   contentBase: 'src', //指定托管的根目录
        hot: true //启动热更新，第一步
    },
    plugins: [ //配置插件的节点
        new webpack.HotModuleReplacementPlugin(), // new 一个热更新的模块对象，这是启动热更新的第三步
        new htmlWebpackPlugin({ //创建一个在内存中生成html页面的插件
            template: path.join(__dirname, '/src/index.html'), //指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
            filename: 'index.html' //指定生成的页面的名称
        }),
        new VueLoaderPlugin()
    ],
    module: { //这个节点用于配置所有第三方模块加载器
        rules: [ // 所有第三方模块的匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 配置处理.css文件的第三方loader规则
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, //配置处理.less的第三方loader规则
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: ['url-loader?limit=7631'] }, //处理图片的loader

            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ } // 配置babel来转换高级的es6语法
        ]

    },
    resolve: {
        alias: { // 修改vue被导入时候包的路径
            // "vue$": 'vue/dist/vue.js'
        }
    }
}