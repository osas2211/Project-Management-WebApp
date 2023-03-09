import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql"
import { Task } from "../database/models/TaskModel.js"
import Project from "../database/models/projectModel.js"

export const TaskType = new GraphQLObjectType({
  name: "task",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    status: { type: GraphQLString },
    assigned_to: { type: GraphQLString },
    assigned_by: { type: GraphQLString },
    due_date: { type: GraphQLString },
  }),
})
