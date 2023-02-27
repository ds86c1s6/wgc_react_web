# react_web 项目

## 项目安装与依赖说明

```
说明：基于webpack5.x + react18.x + react-router-dom6.x + redux&dva-core + antd等web开发脚手架
依赖下载（推荐淘宝源）：
npm install
```

## 项目运行

```
npm run start 运行项目
npm run build:sit 测试打包
npm run build:prod 生产打包
```

### 目录说明和相应规范

```
    |-- .babelrc //babel配置文件
    |-- .gitignore  // git提交忽略
    |-- package.json
    |-- tsconfig.json // ts配置
    |-- less         // 全局的基础css配置文件夹, 全局样式
    |-- src
    |   |-- components // 全局要使用的组件必须要放在这里
    |   |-- constants // 全局要使用的常量放在这里，其余模块内部的放在各自模块内部
    |   |-- core // 项目的业务代码都放在这里(公共的业务文件,兼容处理等等放在这里)
    |   |-- pages // 单页面代码所在文件夹
    |   |   |-- index.js // 入口js文件
    |   |   |-- index.html // html模板
    |   |-- routes // 路由所在文件夹
    |   |-- model    // redux仓库
    |   |-- redux    // dva初始化
    |   |-- utils   // js工具方法
    |-- static     // 打包时要拷贝的静态资源
    |-- webpack   // webpack配置文件夹
        |-- configs.js  // 自定义配置
        |-- paths.js  // 目录配置
        |-- webpack.base.js // 基础配置环境
        |-- webpack.dev.js // 开发环境
        |-- webpack.prod.js // 生产环境
```
