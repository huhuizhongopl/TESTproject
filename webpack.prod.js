const os = require('os')
const ESLintWebpackPlugin = require("eslint-webpack-plugin")//检查代码错误
const HtmlWebpackPlugin = require("html-webpack-plugin");//编译html
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//单独抽取css代码
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")//压缩css代码
const TerserWebpackPlugin = require("terser-webpack-plugin")//压缩处理js代码
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin")
const path = require("path");
const threads = os.cpus().length// 获取cpu核数
module.exports = {
    //入口
    entry: "./www/main.js",
    //出口
    output: {
        path: path.join(__dirname, "./dist"),//webpack打包后文件的输出目录
        publicPath: "./",
        filename: "static/js/main.js",
        clean: true,//自动清空上次打包结果
    },
    module: {
        rules: [
            //loader的配置
            {
                test: /\.css$/,//只检测css文件
                use: [{ loader: MiniCssExtractPlugin.loader, options: { publicPath: '../../' } }
                    , "css-loader",
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: ["postcss-preset-env"]//解决大部分css兼容性样式问题
                        }
                    }
                }
                ]//执行顺序从右到左
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
                    filename: "static/images/[hash:10].[ext].[query]"
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
        //     context: path.resolve(__dirname, 'www')
        //     cache: true,  //开启缓存
        //     cacheLocation: path.resolve(__dirname, "../node_modules/.cache/eslintcache")
        //     threads,  //开启多进程
        // })
        // 处理html的插件
        new HtmlWebpackPlugin({//处理html
            template: path.resolve(__dirname, './www/static/index.html')
        }),
        new MiniCssExtractPlugin({//单独抽离css文件
            filename: "static/css/main.css"
        }),
        new CssMinimizerWebpackPlugin(),//压缩css代码调用
        new TerserWebpackPlugin({
            parallel: threads// 开启多线程与设置线程数量
        }),
        // new ImageMinimizerPlugin({//压缩图片
        //     minimizer: {
        //         implementation: ImageMinimizerPlugin.imageminGenerate,
        //         options: {
        //             plugins: [
        //                 //['gifsicle', { interlaced: true }],
        //                 //['jpegtran', { progressive: true }],
        //                 //['optipng', { optimizationLevel: 5 }],
        //                 // [
        //                 //     'svgo',
        //                 //     {
        //                 //         plugins: [
        //                 //             "preset-default",
        //                 //             'prefixIds',
        //                 //             {
        //                 //                 name: 'sortAttrs',
        //                 //                 params: {
        //                 //                     xmlnsOrder: "alphabetical",
        //                 //                 }
        //                 //             }
        //                 //         ]
        //                 //     }
        //                 // ]
        //             ]
        //         }
        //     }
        // })
    ],
    // optimizatiom: {
    //     //压缩的操作，放这儿也行，放上面plugins里也行
    //     minimizer: [
    //         new CssMinimizerWebpackPlugin(),//压缩css代码调用
    //         new TerserWebpackPlugin({
    //             parallel: threads// 开启多线程与设置线程数量
    //         }),
    //         //压缩图片
    //         // new ImageMinimizerPlugin({
    //         //     minimizer: {
    //         //         implementation: ImageMinimizerPlugin.imageminGenerate,
    //         //         options: {
    //         //             plugins: [
    //         //                 ['gifsicle', { interlaced: true }],
    //         //                 ['jpegtran', { progressive: true }],
    //         //                 //['optipng', { optimizationLevel: 5 }],
    //         //                 [
    //         //                     'svgo',
    //         //                     {
    //         //                         plugins: [
    //         //                             "preset-default",
    //         //                             'prefixIds',
    //         //                             {
    //         //                                 name: 'sortAttrs',
    //         //                                 params: {
    //         //                                     xmlnsOrder: "alphabetical",
    //         //                                 }
    //         //                             }
    //         //                         ]
    //         //                     }
    //         //                 ]
    //         //             ]
    //         //         }
    //         //     }
    //         // })
    //     ],

    // },
    mode: 'production',
    devtool: "source-map"
}