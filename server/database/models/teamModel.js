import { sequelize } from "../index.js"
import { DataTypes } from "sequelize"
import Project from "./projectModel.js"
import User from "./userModel.js"
import { Task } from "./TaskModel.js"

export const Team = sequelize.define(
  "Team",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    agenda: { type: DataTypes.TEXT },
    team_lead: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "TeamsTable" }
)

// Team - Project Relationship
Project.hasMany(Team)
Team.belongsTo(Project)

// Team - User Relationship
Team.hasMany(User)
User.belongsTo(Team)

// Team - Task Relationship
Team.hasMany(Task)
Task.belongsTo(Team)
