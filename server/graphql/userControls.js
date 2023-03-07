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

dotenv.config()

const UserType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    profile_url: { type: GraphQLString },
    email: { type: GraphQLString },
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
    args: { id: { type: GraphQLString } },
    async resolve(parent, args) {
      const user = await User.findOne({
        where: { id: args.id },
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
    },
    async resolve(parent, args) {
      const user = await User.create(args)
      return user
    },
  },
}
