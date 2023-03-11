import { DataTypes } from "sequelize"
import { sequelize } from "../index.js"

export const Task = sequelize.define(
  "task",
  {
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    status: {
      type: DataTypes.ENUM(["uncompleted", "in_progress", "completed"]),
      defaultValue: "uncompleted",
    },
    assigned_to: { type: DataTypes.STRING },
    assigned_by: { type: DataTypes.STRING },
    tag: { type: DataTypes.STRING },
    due_date: { type: DataTypes.DATE },
  },
  { tableName: "TasksTable" }
)
