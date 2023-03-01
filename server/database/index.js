import { Sequelize } from "sequelize"
import { config } from "./config/config.js"
import dotenv from "dotenv"
dotenv.config()

const envConfig = config[process.env.NODE_ENV]

const sequelizeInstance = new Sequelize(envConfig.url, envConfig)

export const sequelize = sequelizeInstance
