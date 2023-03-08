import { sequelize } from "../index.js"
import { DataTypes, NOW, UUID, UUIDV1, UUIDV4 } from "sequelize"
import { Task } from "./TaskModel.js"

const Project = sequelize.define(
  "project",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV1,
      primaryKey: true,
      unique: true,
    },
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
  { tableName: "ProjectsTable" }
)

Project.hasMany(Task)
Task.belongsTo(Project)

export default Project
