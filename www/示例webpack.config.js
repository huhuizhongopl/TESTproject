'use strict'
const webpack = require('webpack')
const path = require('path')
//const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin')
//const { bundler, styles } = require('@ckeditor/ckeditor5-dev-utils')

const resolve = dir => path.join(__dirname, dir)

module.exports = {
  devServer: {
    port: 8082, // 端口号
    before: require('./mock/mock-server.js'),
    proxy: {
      '/mytio': {
        // target: "http://local.t-io.org:6060",   // 本地模拟数据服务器
        // target: "http://129.211.52.247:6060",   // 本地模拟数据服务器
        // target: "http://www.tiocloud.com:8080",  // 谭聊生产环境模拟数据服务器
        // target: "http://im.isms.net.cn:6060",  // 谭聊生产环境模拟数据服务器
        // target: "http://192.168.1.8:6060",
        target: 'http://183.201.231.11:280',
        changeOrigin: true,
        pathRewrite: {
          '^/mytio': '' // 去掉接口地址中的api字符串
        },
        cookieDomainRewrite: '' //重写cookie 的domain,在localhost上工作时，cookie域必须设置为“”或NULL或FALSE
      }
    }
  },
  publicPath: '/admin/', //非根目录配置，根目录不需要加
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  // The source of CKEditor is encapsulated in ES6 modules. By default, the code
  // from the node_modules directory is not transpiled, so you must explicitly tell
  // the CLI tools to transpile JavaScript files in all ckeditor5-* modules.
  transpileDependencies: [/ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/],

  configureWebpack: {
    // devtool: "source-map",
    plugins: [
      // CKEditor needs its own plugin to be built using webpack.
      /* new CKEditorWebpackPlugin({
        // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
        buildAllTranslationsToSeparateFiles:true,
        language: 'zh-cn',
        additionalLanguages: ['zh-cn'],
        addMainLanguageTranslationsToAllAssets: true,
        addMainLanguageTranslationsToAllAssets: true,
        additionalLanguages: ["zh-cn"],
         addMainLanguageTranslationsToAllAssets:true,
        // Append translations to the file matching the `app` name.
        buildAllTranslationsToSeparateFiles:true,
        translationsOutputFile: /app/,
        language: 'en',
        additionalLanguages: ['zh-cn'],
        buildAllTranslationsToSeparateFiles: true,
      }), */
      // new webpack.BannerPlugin({
      //   banner: bundler.getLicenseBanner(),
      //   raw: true
      // }),
      new webpack.ProvidePlugin({
        //引入jquery
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      })
    ]
  },
  css: {
    //查看CSS属于哪个css文件
    sourceMap: false,
    loaderOptions: {
      //解决乱码问题
      sass: {
        sassOptions: {
          outputStyle: 'expanded'
        }
      },
      less: {
        javascriptEnabled: true
      }
    }
  },
  pluginOptions: {
    // 第三方插件配置
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/im/style/less/common.less')
      ] // 引入全局样式变量
    }
  },
  // Vue CLI would normally use its own loader to load .svg and .css files, however:
  //	1. The icons used by CKEditor must be loaded using raw-loader,
  //	2. The CSS used by CKEditor must be transpiled using PostCSS to load properly.
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    config.cache(true)
    config.module
      .rule('less')
      .oneOf('vue')
      .use('style-resource')
      .loader('style-resources-loader')
      .options({
        patterns: [
          path.resolve(__dirname, './src/assets/im/style/less/common.less')
        ]
      })
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    //svgRule.exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'))
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // (1.) To handle editor icons, get the default rule for *.svg files first:

    // Then you can either:
    //
    // * clear all loaders for existing 'svg' rule:
    //
    //		svgRule.uses.clear();
    //
    // * or exclude ckeditor directory from node_modules:

    // Add an entry for *.svg files belonging to CKEditor. You can either:
    //
    // * modify the existing 'svg' rule:
    //
    //		svgRule.use( 'raw-loader' ).loader( 'raw-loader' );
    //
    // * or add a new one:
    config.module
      .rule('cke-svg')
      .test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
      .use('raw-loader')
      .loader('raw-loader')

    // (2.) Transpile the .css files imported by the editor using PostCSS.
    // Make sure only the CSS belonging to ckeditor5-* packages is processed this way.
    // config.module
    //   .rule('cke-css')
    //   .test(/ckeditor5-[^/\\]+[/\\].+\.css$/)
    //   .use('postcss-loader')
    //   .loader('postcss-loader')
    //   .tap(() => {
    //     return styles.getPostCssConfig({
    //       themeImporter: {
    //         themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
    //       },
    //       minify: true
    //     })
    //   })

    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()

      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk('single')
    })
  }
}
