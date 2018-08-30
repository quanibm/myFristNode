"use strict";

const url = require("url");

const Koa = require("koa");

const cors = require('koa-cors')

const bodyParser = require("koa-bodyparser");

const templating = require("./templating");

const controller = require("./controller");

const app = new Koa();

app.use(async (ctx, next) => {
  console.log(`process ${ctx.request.method} ${ctx.request.url} ...　`);
  await next();
});

const staticFiles = require("./static-files");
app.use(
  /**
  新增处理静态文件功能
  */ staticFiles("/static/", __dirname + "/static")
);

app.use(bodyParser());

app.use(
  /**增加模块功能 */
  templating("views", {
    noCache: true,
    watch: true,
    autoescape: false,
    throwOnUndefined: false
  })
);

app.use(cors())

app.use(controller());

app.listen(3999);

console.log(`app started at port 3999`)
// function createWebSocketServer(server, onConnect, onMessage, onClose, onError) {
//   let wss = new WebSocket({
//     server: server
//   });
// }

// app.wss = createWebSocketServer(server, onConnect, onMessage, onClose);
