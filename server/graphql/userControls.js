import {
  GraphQLString,
  GraphQLID,
  GraphQLObjectType,
  GraphQLList,
} from "graphql"
import User from "../database/models/userModel.js"
import dotenv from "dotenv"

dotenv.config()

const UserType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: { type: GraphQLID },
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
  }),
})

export const userQueries = {
  user: {
    type: UserType,
    args: { id: { type: GraphQLID } },
    async resolve(parent, args) {
      return await User.findOne({ where: { id: args.id } })
    },
  },
  users: {
    type: new GraphQLList(UserType),
    async resolve(parents, args) {
      return await User.findAll()
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
      return await User.create(args)
    },
  },
}
