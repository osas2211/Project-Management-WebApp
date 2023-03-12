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
    assigned_to: { type: DataTypes.ARRAY(DataTypes.STRING) },
    assigned_by: { type: DataTypes.STRING },
    tags: { type: DataTypes.ARRAY(DataTypes.STRING) },
    for_team: { type: DataTypes.STRING, defaultValue: "no_team" },
    due_date: { type: DataTypes.DATE },
  },
  { tableName: "TasksTable" }
)
