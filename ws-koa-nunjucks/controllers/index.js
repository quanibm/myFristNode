"use strict";

module.exports = {
  "GET /": async (ctx, next) => {
    ctx.render("index.html", {
      mark: "还有谁"
    });
  }
};
