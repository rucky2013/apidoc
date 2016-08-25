###安装
通过`npm`安装本地服务

```
npm install
```
启动服务(http://localhost:8809)

```
node server.js
```
发布代码
```
npm run build
```

###开发

###目录结构
<pre>
.
├── README.md           
├── public/
|     ├──dist
|     └──index.html    // 前端资源
├── app/                // 前端dev
├── server/             // 服务端dev
├── database/           // 数据库
|
├── package.json       // 项目配置文件
├── server.js          // webpack-dev-server服务配置
└── webpack.config.js  // Webpack 配置文件
</pre>
