import { GraphQLObjectType, GraphQLSchema } from "graphql"
import { ProjectMutations, ProjectQueries } from "./projectControls.js"
import { TaskMutations, TaskQueries } from "./taskControls.js"
import { userQueries, userMutations } from "./userControls.js"

const RootQuery = new GraphQLObjectType({
  name: "query",
  fields: {
    ...userQueries,
    ...ProjectQueries,
    ...TaskQueries,
  },
})

const Mutations = new GraphQLObjectType({
  name: "mutation",
  fields: {
    ...userMutations,
    ...ProjectMutations,
    ...TaskMutations,
  },
})

export const graphqlSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
})
