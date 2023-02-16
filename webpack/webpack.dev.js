const { merge } = require("webpack-merge");
const paths = require("./paths");
const config = require("./config");
const base = require("./webpack.base");

module.exports = merge(base, {
  // mode设置的作用主要是根据当前环境做一些优化工作
  mode: "development",
  // eval(构建快，重建快，但是开发报错寻址不详) eval-cheap-module-source-map(构建慢，重建快)
  devtool: "eval-cheap-module-source-map",
  // 在初始构建之后，webpack将继续监听任何已解析文件的更改
  // watch: true,
  // watchOptions: {
  //   // 重建之前的延迟在此时间段内的改动将被一起聚合在一块重建
  //   aggregateTimeout: 500,
  //   // 打开轮询并设置周期
  //   poll: 1000,
  //   ignored: /node_modules/,
  // },
  devServer: {
    // 开启时自动打开浏览器
    open: true,
    port: 8233,
    // 启动webpack-dev-server时的host
    host: config.getNetworkIp(),
    // 热更新
    hot: true,
    // 一切服务都启用gzip压缩（也可以通过webpack-dev-server --compress启动）
    compress: true,
    // 当使用 HTML5 History API 时，任意的 404 响应都需要重定向对应的html页面
    historyApiFallback: {
      rewrites: [
        {
          from: new RegExp(".*"),
          // 重定向的目标页面(必须/开头)
          to: (paths.publicPath + "/").replace(/\/+/g, "/") + "index.html",
        },
      ],
    },
    // 默认https
    // server: 'https'
    // 中间件
    // devMiddleware: {
    //   stats: "errors-only",
    // },
    proxy: [
      {
        // 当以context里的任意一个字符串开头的接口都会通过本地代理访问目标接口域名下
        context: ["/api"],
        // 要代理访问的目标接口域名
        target: "http://localhost:3000",
        // 允许代理 websockets 协议
        ws: true,
        // true不接受运行在 HTTPS 上，且使用了无效证书的后端服务, false关闭安全检测
        secure: false,
        // 需要虚拟托管的站点要设为true，开发时大部分情况都是虚拟托管的站点
        changeOrigin: true,
        // 实际请求中不存在代理字段则重写接口路径把api字符串去掉
        pathRewrite: {
          "^/api": "",
        },
      },
    ],
    // 将错误或警告覆盖显示在浏览器屏幕上
    client: {
      // 全屏覆盖
      overlay: {
        errors: true,
        warnings: false,
      },
      logging: "error", // 控制台只显示warn以上信息
    },
  },
});
