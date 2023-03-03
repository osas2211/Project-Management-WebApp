import { sequelize } from "../index.js"
import { DataTypes } from "sequelize"

const User = sequelize.define(
  "User",
  {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    profile_url: { type: DataTypes.STRING, defaultValue: "" },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING },
    sex: { type: DataTypes.STRING },
    about: { type: DataTypes.STRING },
    job_title: { type: DataTypes.STRING },
    DOB: { type: DataTypes.DATE },
  },
  { tableName: "UsersTable" }
)

export default User
