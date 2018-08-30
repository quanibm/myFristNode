"use strict";

const path = require("path");

const mime = require("mime");

const fs = require("mz/fs");

function staticFile(url, dir) {
  return async (ctx, next) => {
    let rpath = ctx.request.path;
    if (rpath.startsWith(url)) {
      let fp = path.join(dir, rpath.substring(url.length - 1));
      if (await fs.exists(fp)) {
        ctx.response.body = await fs.readFile(fp);
        ctx.response.type = mime.getType(rpath);
      } else {
        ctx.response.status = 404;
      }
    } else {
      await next();
    }
  };
}

module.exports = staticFile;
