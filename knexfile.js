// const ENV = process.env.NODE_ENV || "development";
// const { DB_URL } = process.env;

// const baseConfig = {
//   client: "pg",
//   migrations: {
//     directory: "./db/migrations",
//   },
//   seeds: {
//     directory: "./db/seeds",
//   },
// };

// const customConfig = {
//   development: {
//     connection: process.env.DATABASE_URL,
//   },
//   test: {
//     connection: {
//       database: "nc_news_test",
//     },
//   },
//   production: {
//     connection: `${DB_URL}?ssl=true`,
//   },
// };

// console.log(customConfig[ENV]);
// module.exports = { ...customConfig[ENV], ...baseConfig };
console.log(process.env.DATABASE_URL);
module.exports = {
  client: "pg",
  migrations: { directory: "./db/migrations" },
  seeds: { directory: "./db/seeds" },
  connection: process.env.DATABASE_URL,
};
