const paths = require("./paths");
const config = require("./config");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { isDev } = config;
const cssLoader = isDev
  ? "style-loader"
  : {
      loader: MiniCssExtractPlugin.loader,
      options: {
        // 修改打包后目录中css文件静态资源的引用的基础路径
        publicPath: "../",
      },
    };

const nodeModulesRegex = /node_modules/;

module.exports = {
  entry: `${paths.srcPath}/pages/index.tsx`,
  // 解析的起点，entry的上下文，默认为项目的根目录
  context: paths.rootPath,
  // 因为服务器和浏览器代码都可以用js编写，所以webpack提供了多个构建环境，target属性为webpack指定一个构建的环境，默认为web（如果 browserslist 可用，其browserslist则为默认）
  target: ["web", "es5"],
  output: {
    // 打包生成文件时清空output目录
    clean: isDev ? false : true,
    path: paths.outputPath,
    // hash 跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值
    // chunkhash chunkhash和hash不一样，它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值
    // contenthash 通过MiniCssExtractPlugin提供，保证即使css文件所处的模块里就算其他文件内容改变，只要css文件内容不变，那么不会重复构建
    filename: isDev ? "[name].js" : "js/[name]_[chunkhash:8].js",
    // chunkFilename用来打包require.ensure方法中引入的模块,如果该方法中没有引入任何模块则不会生成任何chunk块文件
    // chunkFilename: 'js/[name]_[chunkhash:8].js'
    // 所有静态资源引用的公共绝对路径
    publicPath: paths.publicPath,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".less"],
    alias: {
      "@": `${paths.srcPath}`,
      less: `${paths.rootPath}/less`,
    },
  },
  // 用来指定loader的使用和匹配规则
  module: {
    rules: [
      // js文件处理
      {
        test: /\.(ts|tsx|js|jsx)$/,
        include: [paths.srcPath],
        use: [
          {
            loader: "thread-loader",
            options: {
              workers: 3,
            },
          },
          {
            loader: "babel-loader",
            options: {
              // 不使用默认路径
              babelrc: false,
              // 配置新的babelrc路径
              extends: paths.babelrcPath,
              // 开启缓存
              cacheDirectory: true,
            },
          },
        ],
      },
      // css文件处理
      {
        test: /\.css/,
        exclude: /\.module\.css$/,
        use: [
          // 不能和style-loader一起使用，会互斥。
          // 将js中import引入的样式文件代码，打包成一个实际的css文件，结合html-webpack-plugin，在dist/index.html中以link插入css文件，默认将多个css文件打包合成一个
          cssLoader,
          // style-loader把引入的样式文件代码打包到js文件中，并将样式自动插入<style>标签中
          "style-loader",
          // css-loader处理 css 文件
          "css-loader",
        ],
      },
      // less文件处理
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: [
          cssLoader,
          "css-loader",
          "postcss-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                // 如果使用less-loader@5，一处lessOption这一级直接配置选项
                modifyVars: {
                  // 引入antd主题颜色覆盖文件
                  // hack: ``,
                },
                javasciprtEnabled: true,
              },
            },
          },
        ],
      },
      // less模块处理
      {
        test: /\.module\.less$/,
        exclude: nodeModulesRegex,
        use: [
          cssLoader,
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[name]/[local]_[hash:5]",
                localIdentContext: paths.srcPath,
              },
              importLoaders: 3,
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
      // 图片处理
      {
        test: /\.(png|jpg|svg|gif|jpeg)$/i,
        exclude: nodeModulesRegex,
        type: "assets",
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024,
          },
        },
        generator: {
          filename: "img/[name]_[hash:8].[ext]",
        },
      },
    ],
  },
  plugins: [
    // 全局变量暴露
    // new webpack.ProvidePlugin({
    //   React: 'react'
    // })
    new MiniCssExtractPlugin({
      filename: "css/[name]_[contenthash:8].css",
    }),
    // 设置项目进程的全局变量，String，如果值是个字符串会被当成一个代码片段来使用，如果不是则会被转化为字符串（包括函数）
    new webpack.DefinePlugin({
      "process.env.PUBLIC_PATH": JSON.stringify(paths.publicPath),
    }),
    new HtmlWebpackPlugin({
      // title: "html文档的标题",
      // 指定输出的文档名
      filename: "index.html",
      // html模板所在的位置，默认支持html和ejs模板语法，处理文件后缀为html的模板会与html-loader冲突
      template: paths.htmlTemplatePath,
      // 注入静态资源的位置：
      //   1.true或者body：所有js资源插入到body元素底部
      //   2.head：所有js资源插入到head元素中
      //   3.false：所有js和css静态资源都不会注入到模板文件中
      inject: true,
      // 图标所在路径，最终会被打包到输出目录
      // favicon: '',
      minify: {
        // 根据html5规范输入，默认为true
        html5: true,
        // 是否对大小写敏感，默认false
        caseSensitive: false,
        // 压缩link进来的本地css文件 默认false,需要和clean-css一起使用
        minifyCSS: false,
        // 压缩script内联的本地js文件 默认false,为true需要和teserwebpackplugin一起使用
        minifyJS: true,
        // 移除html中的注释 默认false
        removeComments: true,
      },
    }),
  ],
};
