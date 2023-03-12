import { GraphQLObjectType, GraphQLSchema } from "graphql"
import { ProjectMutations, ProjectQueries } from "./projectControls.js"
import { TaskMutations, TaskQueries } from "./taskControls.js"
import { TeamMutations, TeamQueries } from "./teamControls.js"
import { userQueries, userMutations } from "./userControls.js"

const RootQuery = new GraphQLObjectType({
  name: "query",
  fields: {
    ...userQueries,
    ...ProjectQueries,
    ...TaskQueries,
    ...TeamQueries,
  },
})

const Mutations = new GraphQLObjectType({
  name: "mutation",
  fields: {
    ...userMutations,
    ...ProjectMutations,
    ...TaskMutations,
    ...TeamMutations,
  },
})

export const graphqlSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
})
