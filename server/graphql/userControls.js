import {
  GraphQLString,
  GraphQLID,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
} from "graphql"
import User from "../database/models/userModel.js"
import dotenv from "dotenv"
import Project from "../database/models/projectModel.js"
import { ProjectType } from "./projectControls.js"

import { InternalServerError, NotFoundError } from "./errors.js"

dotenv.config()

export const UserType = new GraphQLObjectType({
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
      try {
        const user = await User.findOne({
          where: { userName: args.userName },
          include: Project,
        })
        if (user === null) {
          return new NotFoundError(
            `User '${args.userName}' not found`,
            "userName",
            "USER_NOT_FOUND"
          )
        }
        return user
      } catch (error) {
        throw new InternalServerError(error.message)
      }
    },
  },
  users: {
    type: new GraphQLList(UserType),
    async resolve(parents, args) {
      try {
        return await User.findAll({ include: Project })
      } catch (error) {
        throw new InternalServerError(error.message)
      }
    },
  },
}

export const userMutations = {
  addUser: {
    type: UserType,
    args: {
      firstName: { type: new GraphQLNonNull(GraphQLString) },
      lastName: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      userName: { type: new GraphQLNonNull(GraphQLString) },
      sex: { type: GraphQLString },
    },
    async resolve(parent, args) {
      try {
        const user = await User.create(args)
        return user
      } catch (error) {
        throw new InternalServerError(error.message)
      }
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
