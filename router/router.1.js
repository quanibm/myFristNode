"use strict";

const fn_index = async (ctx, next) => {
  ctx.response.body = `<h1>Index</h1>
  <form action="/signin1" method="post">
    <p>
        name: <input type="text" value="koa" name="name" />
        
    </p>
    <p>
        password: <input type="password" name="password" />
    </p>
    <p>
        <input type="submit" value="SUBMIT">
    </p>
  </form>
  
  `;
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
  "GET /index1": fn_index,
  "POST /signin1": fn_login
};
