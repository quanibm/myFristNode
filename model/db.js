"use strict";

const Sequelize = require("sequelize");
const uuid = require("node-uuid");
console.log("init sequeliZe....");
const {
  dialect,
  database,
  username,
  password,
  port,
  host
} = require("./config");

const sequelize = new Sequelize(database, username, password, {
  dialect: dialect,
  port: port,
  host: host,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

const ID_TYPE = Sequelize.STRING(50);

function generateId() {
  return uuid.v4();
}

function joinAttr(obj) {
  /**拼接ｍｏｄｅｌ的参数 */
  const attrs = {};
  for (let key in obj) {
    let value = obj[key];
    if (typeof value === "object" && value["type"]) {
      value.allowNull = value.allowNull || false;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        allowNull: false
      };
    }
  }
  attrs.id = {
    type: ID_TYPE,
    primaryKey: true
  };
  attrs.createdAt = {
    type: Sequelize.BIGINT,
    allowNull: false
  };
  attrs.updatedAt = {
    type: Sequelize.BIGINT,
    allowNull: false
  };
  attrs.version = {
    type: Sequelize.BIGINT,
    allowNull: false
  };
  return attrs;
}

function defineModel(name, attributes) {
  const attrs = joinAttr(attributes);
  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: false,
    hooks: {
      beforeValidate: function(obj) {
        let now = Date.now();
        if (obj.isNewRecord) {
          if (!obj.id) {
            obj.id = generateId();
          }
          obj.createdAt = now;
          obj.updatedAt = now;
          obj.version = 0;
        } else {
          obj.updatedAt = Date.now();
          obj.version++;
        }
      }
    }
  });
}

const TYPES = [
  "STRING",
  "INTEGER",
  "BIGINT",
  "TEXT",
  "DOUBLE",
  "DATEONLY",
  "BOOLEAN"
];

const exp = {
  defineModel: defineModel,
  sync() {
    if (process.env.NODE_ENV !== "production") {
      sequelize.sync({ force: true });
    } else {
      throw new Error("不能");
    }
  }
};

for (let type of TYPES) {
  exp[type] = Sequelize[type];
}

exp.ID = ID_TYPE;

module.exports = exp;
