import { GraphQLObjectType, GraphQLSchema } from "graphql"
import { ProjectQueries } from "./projectControls.js"
import { userQueries, userMutations } from "./userControls.js"

const RootQuery = new GraphQLObjectType({
  name: "query",
  fields: {
    ...userQueries,
    ...ProjectQueries,
  },
})

const Mutations = new GraphQLObjectType({
  name: "mutation",
  fields: {
    ...userMutations,
  },
})

export const graphqlSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
})
