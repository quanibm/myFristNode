"use strict";

const fn_index = async (ctx, next) => {
  ctx.render("extends.html", {
    header: "我是ｈｅａｄｅｒ",
    body: "我是ｂｏｄｙ｀"
  });
};

const fn_login = async (ctx, next) => {
  let name = ctx.request.body.name || "",
    password = ctx.request.body.password || "";
  if (name === "koa1" && password === "123") {
    ctx.response.body = `<h1>hello, ${name}!</h1>`;
  } else {
    ctx.response.body = `<h1>Login failed</h1>
      <p>
         <a href="/">Try again</a>
      </p>
      `;
  }
};

module.exports = {
  "GET /index2": fn_index,
  "POST /signin1": fn_login
};
