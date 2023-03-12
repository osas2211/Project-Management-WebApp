import { sequelize } from "../index.js"
import { DataTypes, UUIDV4 } from "sequelize"
import Project from "./projectModel.js"

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      unique: true,
    },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    profile_url: { type: DataTypes.STRING, defaultValue: "" },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    userName: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING },
    sex: { type: DataTypes.STRING },
    about: { type: DataTypes.STRING },
    job_title: { type: DataTypes.STRING },
    DOB: { type: DataTypes.DATE },
  },
  { tableName: "UsersTable" }
)

Project.belongsToMany(User, { through: "UserProjects" })
User.belongsToMany(Project, {
  through: "UserProjects",
  foreignKey: "collaborators",
})

export default User
