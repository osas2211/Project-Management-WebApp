import { sequelize } from "."
import { DataTypes } from "sequelize"

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, primarykey: true, autoincrement: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    profile_url: { type: DataTypes.STRING, defaultValue: "" },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING },
    sex: { type: DataTypes.STRING },
    about: { type: DataTypes.STRING },
    job_title: { type: DataTypes.STRING },
  },
  { tableName: "Users" }
)

export default User
