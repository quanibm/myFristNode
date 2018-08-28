"use strict";

/**创建一个ｓｅｑｕｅｌｉｚｅ对象 */

const Sequelize = require("sequelize");
const { database, username, password, host, port } = require("./config");

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

sequelize /**测试连接 */
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

/**第二部，　定义模型　Ｐｅｔ, 告诉Ｓｅｑｕｅｌｉｚｅ　如何映射数据库表：　 */

const Pet = sequelize.define(
  "pet",
  {
    id: {
      type: Sequelize.STRING(50),
      primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
  },
  {
    timestamps: false
  }
);

module.exports = Pet;

// const now = new Date().getTime();

// (async () => {
//   /**增 */
//   const newdog = await Pet.create({
//     id: "d-" + now,
//     name: "cat",
//     gender: 20,
//     birth: "2018.8.28",
//     createdAt: now,
//     updatedAt: now,
//     version: 3
//   });
// })();

// (async () => {/**删 */
//   const fristtable = await Pet.findAll();
//   for (let f of fristtable) {
//     await f.destroy();
//   }
// })();

// (async () => { /**改 */
//   const pets = await Pet.findAll({
//     where: {
//       name: "cat"
//     }
//   });
//   for (let p of pets) {
//     p.name = "dog";
//     await p.save();
//   }
// })();

// (async () => {/**查 */
//   const pets = await Pet.findAll({
//     where: {
//       name: "cat"
//     }
//   });
//   console.log(`find ${pets.length} pet`);
//   for (let f of pets) {
//     console.log("我是最帅的！");
//     console.log(JSON.stringify(f));
//   }
// })();

// module.exports = {};

// const fn_mysql = {
//   addTable: async obj => {
//     /**增 */
//     await Pet.create(obj);
//   },
//   dropTable: async paramsObj => {
//     /**删 */
//     const fristtable = await Pet.findAll({
//       where: paramsObj
//     });
//     for (let f of fristtable) {
//       await f.destroy();
//     }
//   },
//   query: async paramsObj => {
//     /**删 */
//     const fristtable = await Pet.findAll({
//       where: paramsObj
//     });
//   },
//   change: async paramsObj => {
//     /**删 */
//     const fristtable = await Pet.findAll({
//       where: paramsObj
//     });
//   }
// };
