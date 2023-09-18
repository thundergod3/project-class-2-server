import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const sequelize = process.env.DB_EXTERNAL_URL
  ? new Sequelize(process.env.DB_EXTERNAL_URL, {
      host: process.env.DB_HOST,
      dialect: "postgres",
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
      logging: false,
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: "postgres",
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
        logging: false,
      }
    );

export default sequelize;
