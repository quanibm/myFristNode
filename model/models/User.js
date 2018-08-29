"use strict";

const db = require("../db");
// console.log("db", db);
module.exports = db.defineModel("users", {
  email: {
    type: db.STRING(100),
    unique: true
  },
  passwd: db.STRING(100),
  name: db.STRING(100),
  gender: db.BOOLEAN
});


