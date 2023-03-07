import { DataTypes } from "sequelize"
import { sequelize } from "../index.js"

export const Task = sequelize.define(
  "task",
  {
    title: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM(["uncompleted", "completed"]) },
    due_date: { type: DataTypes.DATE },
  },
  { tableName: "TasksTable" }
)
