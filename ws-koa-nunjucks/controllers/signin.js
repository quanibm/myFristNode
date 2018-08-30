
module.exports = {
    "GET /signin": async (ctx, next) => {
        ctx.render("signin.html", {
            mark: "我要注册了!"
        });
    }
};
