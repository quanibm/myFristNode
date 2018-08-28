"use strict";

const fs = require("fs");

const db = require("./db");

module.exports = {};

let js_files = fs
  .readdirSync(__dirname + "/models")
  .filter(f => f.endsWith(".js"))
  .forEach(k => {
    console.log(`import model from flies ${k} ...`);
    let name = k.substring(0, k.length - 3);
    module.exports[name] = require(__dirname + "/models/" + k);
  });

module.exports.sync = () => {
  db.sync();
};

