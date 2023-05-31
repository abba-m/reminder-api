import { Sequelize } from "sequelize";
import { config } from "dotenv";
import { join } from "path";

config({
  path: join(__dirname, "../../.env"),
});

// create a mysql connection with sequelize
const host = `${process.env.DB_SERVER}`;
const username = `${process.env.DB_USERNAME}`;
const password = `${process.env.DB_PASSWORD}`;
const dbName = `${process.env.DB_NAME}`;
const enableLogging = process.env.NODE_ENV === "development";

export const sequelizeConn = new Sequelize(dbName, username, password, {
  host,
  dialect: "mysql",
  logging: enableLogging,
});
