const os = require('os')
const ESLintWebpackPlugin = require("eslint-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path")
const threads = os.cpus().length// 获取cpu核数

module.exports = {
    //入口
    entry: "./www/main.js",
    //出口
    output: {
        publicPath: path.resolve(__dirname, 'dist'),
        filename: "static/js/main.js",
        clean: true,//自动清空上次打包结果
    },
    module: {
        rules: [
            //loader的配置
            {
                test: /\.css$/,//只检测css文件
                use: ["style-loader", "css-loader"]//执行顺序从右到左
            },
            {
                //小于10kb的图片转base64,减少请求数量
                test: /\.(png | jpe?g | gif | webp |svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                },
                generator: {
                    //输出图片名称，hash:10取前十位
                    filename: "static/images/[hash:10][ext][query]"
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,//排除node_modules中的文件
                use: [
                    {
                        loader: "thread-loader",//开启多进程
                        options: {
                            works: threads//进程数量
                        }
                    },
                    {
                        loader: "babel-loader",
                        options: {
                            // presets: ["@babel/preset-env"],
                            cacheDirectory: true,//开启babel缓存
                            cacheCompression: false,//关闭缓存文件压缩
                            plugins: ["@babel/plugin-transform-runtime"]// 减少代码体积
                        },
                    }
                ]

            }
        ]
    },
    //插件
    plugins: [
        // new ESLintWebpackPlugin({
        //     // 哪些目录需要检查
        //     context: path.resolve(__dirname, 'www'),
        //     cache: true,  //开启缓存
        //     cacheLocation: path.resolve(__dirname, "../node_modules/.cache/eslintcache")
        //     threads,  //开启多进程
        // })
        // 处理html的插件
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './www/static/index.html')
        })
    ],
    mode: 'development',
    //热更新配置
    devServer: {
        port: 8080,
        contentBase: "./www/static",
        open: true,//自动打开浏览器
        hot: true, //热模块替换
    },
    devtool: "cheap-module-source-map"
}