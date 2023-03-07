import { sequelize } from "../index.js"
import { DataTypes, NOW } from "sequelize"

const Project = sequelize.define(
  "project",
  {
    title: { type: DataTypes.STRING },
    photo_url: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
    project_manager: { type: DataTypes.STRING },
    files_link: { type: DataTypes.ARRAY(DataTypes.STRING) },
    tech_stack: { type: DataTypes.ARRAY(DataTypes.STRING) },
    status: {
      type: DataTypes.ENUM(["created", "in_progress", "completed"]),
      defaultValue: "created",
    },
    priority: {
      type: DataTypes.ENUM(["low", "medium", "high"]),
      defaultValue: "medium",
    },
    start_date: { type: DataTypes.DATE, defaultValue: NOW },
    end_date: { type: DataTypes.DATE },
  },
  { tableName: "ProjectTable" }
)

export default Project
