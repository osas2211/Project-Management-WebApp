import { sequelize } from "../index.js"
import { DataTypes } from "sequelize"

const Project = sequelize.define(
  "Project",
  {
    title: { type: DataTypes.STRING },
    photo_url: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
    project_manager: { type: DataTypes.STRING },
    files_link: { type: DataTypes.ARRAY },
    tech_stack: { type: DataTypes.ARRAY },
    status: {
      type: DataTypes.ENUM,
      defaultValue: ["completed", "uncompleted"],
    },
    priority: { type: DataTypes.ENUM, defaultValue: ["low", "medium", "high"] },
    start_date: { type: DataTypes.NOW },
    end_date: { type: DataTypes.DATE },

    // Associations::: Suitable code will be written here later.
    contributors: { type: DataTypes.ARRAY },
    tasks: { type: DataTypes.ARRAY },
  },
  { tableName: "ProjectTable" }
)

export default Project
