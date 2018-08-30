const nunjucks = require("nunjucks");

function createEnv(path, opts) {
  let autoescape = opts.autoescape || false,
    throwOnUndefined = opts.throwOnUndefined || false,
    noCache = opts.noCache || false,
    watch = opts.watch || false,
    env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader(
        path || "views",
        {
          noCache,
          watch
        },
        {
          throwOnUndefined,
          autoescape
        }
      )
    );
  if (opts.filters) {
    for (let f in opts.filters) {
      env.addFilter(f, opts.filters[f]);
    }
  }
  return env;
}

function templating(path, opts) {
  let env = createEnv(path, opts);
  return async (ctx, next) => {
    ctx.render = function(view, model) {
      ctx.response.type = "text/html";
      ctx.response.body = env.render(
        view,
        Object.assign({}, ctx.state || {}, model || {})
      );
    };
    await next();
  };
}

module.exports = templating;
