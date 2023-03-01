import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import { sequelize } from "./database/index.js"

colors.enable()
dotenv.config()
const app = express()

app.listen(process.env.PORT, async () => {
  console.log(`Server is running on port ${process.env.PORT}`.bgRed)
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log("Database Authenticated, Synced and Connected".bgGreen)
  } catch (error) {
    console.log(`${error}`.bgRed.white)
  }
})
