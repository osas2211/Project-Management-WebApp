import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import { Sequelize } from "sequelize"

colors.enable()
dotenv.config()
const app = express()

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`.bgRed)
})
