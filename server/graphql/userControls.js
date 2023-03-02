import {
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
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

const UserQueries = new GraphQLObjectType({
  name: "userQuery",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await User.findOne({ id: args.id })
      },
    },
    users: {
      type: new GraphQLList(UserType),
      async resolve(parents, args) {
        return await User.findAll()
      },
    },
  },
})

const userMutations = new GraphQLObjectType({
  name: "userMutation",
  fields: {
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
  },
})

export const userGraphqlSchema = new GraphQLSchema({
  query: UserQueries,
  mutation: userMutations,
})
