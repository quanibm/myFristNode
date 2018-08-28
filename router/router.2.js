"use strict";
const Pet = require("../mysql/mysql");
const fn_index = async (ctx, next) => {
  ctx.render("extends.html", {
    header: "我是ｈｅａｄｅｒ",
    body: "我是ｂｏｄｙ｀"
  });
};

const fn_login = async (ctx, next) => {
  let name = ctx.request.body.name || "",
    password = ctx.request.body.password || "",
    id = ctx.request.body.id;
  if (name === "koa1" && password === "123") {
    ctx.response.body = `<h1>hello, ${name}!</h1>`;
  } else {
    (async () => {
      /**增 */
      console.log("新增");
      const newdog = await Pet.create({
        id: id,
        name: password,
        gender: 20,
        birth: "2018.8.28",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        version: 3
      });
    })();

    ctx.response.body = `<h1>注册成功</h1>
      <p>
         <a href="/zhuce">重新注册</a>
      </p>
      `;
  }
};

module.exports = {
  "GET /zhuce": fn_index,
  "POST /ok": fn_login
};
