import {
  GraphQLString,
  GraphQLID,
  GraphQLObjectType,
  GraphQLList,
} from "graphql"
import User from "../database/models/userModel.js"
import dotenv from "dotenv"
import Project from "../database/models/projectModel.js"
import { ProjectType } from "./projectControls.js"
import { where } from "sequelize"

dotenv.config()

const UserType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    profile_url: { type: GraphQLString },
    email: { type: GraphQLString },
    userName: { type: GraphQLString },
    phone: { type: GraphQLString },
    sex: { type: GraphQLString },
    about: { type: GraphQLString },
    job_title: { type: GraphQLString },
    DOB: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    projects: { type: new GraphQLList(ProjectType) },
  }),
})

export const userQueries = {
  user: {
    type: UserType,
    args: { userName: { type: GraphQLString } },
    async resolve(parent, args) {
      const user = await User.findOne({
        where: { userName: args.userName },
        include: Project,
      })
      return user
    },
  },
  users: {
    type: new GraphQLList(UserType),
    async resolve(parents, args) {
      return await User.findAll({ include: Project })
    },
  },
}

export const userMutations = {
  addUser: {
    type: UserType,
    args: {
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      email: { type: GraphQLString },
      userName: { type: GraphQLString },
      sex: { type: GraphQLString },
    },
    async resolve(parent, args) {
      const user = await User.create(args)
      return user
    },
  },
  updateProfile: {
    type: UserType,
    args: {
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      profile_url: { type: GraphQLString },
      about: { type: GraphQLString },
      DOB: { type: GraphQLString },
      job_title: { type: GraphQLString },
      phone: { type: GraphQLString },
      userName: { type: GraphQLString },
    },
    async resolve(parent, args) {
      const userName = args.userName
      delete args.userName
      const user = await User.findOne({ where: { userName } })
      const updateUser = await user.update(args)
      await user.save()
      return updateUser
    },
  },
  deleteUser: {
    type: UserType,
    args: {
      userName: { type: GraphQLString },
    },
    async resolve(parent, args) {
      const user = await User.findOne({
        where: { userName: args.userName },
      })
      await user.destroy()
      return user
    },
  },
}
