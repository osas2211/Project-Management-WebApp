import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import { sequelize } from "./database/index.js"
import { graphqlHTTP } from "express-graphql"
import cors from "cors"
import { userGraphqlSchema } from "./graphql/userControls.js"

colors.enable()
dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: process.env.NODE_ENV === "development",
    schema: userGraphqlSchema,
  })
)

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
