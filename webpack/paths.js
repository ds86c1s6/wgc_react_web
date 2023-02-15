// path.resolve：路径片段从右到左依次拼接，直至返回完整的绝对路径。如果传入的路径片段中没有带盘符的，就拿运行时的路径来用
// path.join：路径片段从右到左依次拼接，返回拼接好的路径片段（resolve 返回绝对路径，join 只把路径片段拼接）
const path = require("path");
const fs = require("fs");
const config = require("./config");

// process.cwd()返回的是运行当前脚本的工作目录的路径
// __dirname返回的是当前变量所在文件的文件夹路径
// fs.realpathSync()同步获取绝对路径

// 用命令行时返回的项目根目录的路径
const rootPath = fs.realpathSync(process.cwd());
// 获取根目录下其他目录
const resolvePath = (resolvePath) => path.resolve(rootPath, resolvePath);
const joinPath = (prefixPath, joinPath) => path.join(prefixPath, joinPath);
// src文件夹路径（打包入口）
const srcPath = resolvePath("src");
// 输出目录
const outputPath = resolvePath("dist");
// node_modules
const nodeModulesPath = resolvePath("node_modules");
// html模板文件
const htmlTemplatePath = joinPath(srcPath, "./pages/index.html");

module.exports = {
  rootPath,
  srcPath,
  outputPath,
  nodeModulesPath,
  htmlTemplatePath,
  // 资源访问的公共绝对路径, 并且访问路由会加上对应的路径字符串， 默认为/不能为空(格式如: /publicPath/)
  publicPath: config.isDev ? "/" : "./",
  babelrcPath: joinPath(rootPath, "./.babelrc"),
};
