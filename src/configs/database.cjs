const dotenv = require("dotenv");
const env_file = ".env.development";

dotenv.config({ path: `${env_file}` });

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
};
