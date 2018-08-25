"use strict";
/**
 * 一定要记得koa-router 后面是要加（）的
 * const router = require('koa-router')()
 */
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const nunjucks = require("nunjucks");

const app = new Koa();

const controller = require("./controllers/controller");

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
  const startTime = new Date().getTime();
  await next();
  const ms = new Date().getTime() - startTime;
  console.log(`X-Response-Time: ${ms}ms`);
});


const templating = require("./templating");

const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  const staticFiles = require("./static-files");
  app.use(staticFiles("/static/", __dirname + "/static"));
}
app.use(bodyParser());

app.use(
  templating("views", {
    watch: !isProduction,
    filters: {
      hex: function(n) {
        return "0x" + n.toString(16);
      }
    }
  })
);

app.use(controller(__dirname + "/router"));
app.listen(3999);
console.log(`app started 3999`);
