import { sequelize } from "../index.js"
import { DataTypes, UUIDV4 } from "sequelize"
import Project from "./projectModel.js"
import User from "./userModel.js"
import { Task } from "./TaskModel.js"

export const Team = sequelize.define(
  "team",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    agenda: { type: DataTypes.TEXT },
    team_lead: { type: DataTypes.STRING, allowNull: false },
    members: { type: DataTypes.ARRAY(DataTypes.STRING) },
  },
  { tableName: "TeamsTable" }
)

// Team - Project Relationship
Project.hasMany(Team)
Team.belongsTo(Project)
