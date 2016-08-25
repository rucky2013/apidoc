###安装
通过`npm`安装本地服务

```
npm install
```
启动服务(http://localhost:8090)

```
node server.js
```
发布代码
```
npm run dist
```

###开发

###目录结构
<pre>
.
├── README.md           
├── dist               // 项目build目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
├── server.js          // webpack-dev-server服务配置
└── webpack.config.js  // Webpack 配置文件
</pre>
