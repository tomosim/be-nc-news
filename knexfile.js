const ENV = process.env.NODE_ENV || "development";
const { DB_URL } = process.env;

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};

const customConfig = {
  development: {
    connection: "nc_news",
  },
  test: {
    connection: {
      database: "nc_news_test",
    },
  },
  production: {
    connection: `${DB_URL}?ssl=true`,
  },
  docker: {
    connection: process.env.DATABASE_URL,
  },
};

module.exports = { ...customConfig[ENV], ...baseConfig };
