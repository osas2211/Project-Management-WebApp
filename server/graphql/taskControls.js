import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from "graphql"
import { Task } from "../database/models/TaskModel.js"
import Project from "../database/models/projectModel.js"
import User from "../database/models/userModel.js"

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

export const TaskQueries = {
  tasks: {
    type: new GraphQLList(TaskType),
    args: {
      project_id: { type: GraphQLID },
      userName: { type: GraphQLString },
    },
    async resolve(parent, args) {
      const user = await User.findOne({ where: { userName: args.userName } })
      const projects = await user.getProjects()
      const project = await projects.find(
        (project) => project.id === args.project_id
      )
      return project.tasks
    },
  },
}
