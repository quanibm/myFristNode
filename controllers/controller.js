"use strict";
const fs = require("fs");
function fn_router(router, Obj) {
  /**判断请求方法，处理请求 */
  for (let url in Obj) {
    if (url.startsWith("GET ")) {
      router.get(url.substring(4), Obj[url]);
    } else if (url.startsWith("POST ")) {
      router.post(url.substring(5), Obj[url]);
    }
  }
}

function scan_router(router, dir) {
  /**扫描路由目录，筛选其中js文件，遍历目录文件导入，调用方法处理请求
   * 
   */
  const files = fs.readdirSync(dir);
  const js_files = files.filter(f => f.endsWith(".js"));
  for (let k of js_files) {
    let mapping = require(dir + "/" + k);
    fn_router(router, mapping);
  }
}

module.exports = function(dir) {
  /**
   * 如果有传路径的话，就使用扫描传入的目录下的js。router文件。如果没有的穿路径的的话，就直接使用默认的路径。
   * 导入router时 需要加 （）
   * 
   */
  let router_dir = dir || __dirname + "/../router",
    router = require("koa-router")();
  scan_router(router, router_dir);
  return router.routes();
};
