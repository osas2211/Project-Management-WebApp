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
    tag: { type: GraphQLString },
    due_date: { type: GraphQLString },
  }),
})

export const TaskQueries = {
  task: {
    type: TaskType,
    args: { id: { type: GraphQLID } },
    async resolve(parent, args) {
      const task = await Task.findByPk(args.id)
      return task
    },
  },
  tasks: {
    type: new GraphQLList(TaskType),
    args: {
      project_id: { type: GraphQLID },
    },
    async resolve(parent, args) {
      const project = await Project.findByPk(args.project_id, { include: Task })
      return project.tasks
    },
  },
}

export const TaskMutations = {
  createTask: {
    type: TaskType,
    args: {
      title: { type: GraphQLString },
      status: { type: GraphQLString },
      assigned_to: { type: GraphQLString },
      assigned_by: { type: GraphQLString },
      tag: { type: GraphQLString },
      due_date: { type: GraphQLString },
      project_id: { type: GraphQLString },
    },
    async resolve(parent, args) {
      const project = await Project.findByPk(args.project_id)
      const task = await Task.create({
        ...args,
        assigned_by: project.project_manager,
      })
      await project.addTask(task.id)
      return task
    },
  },
  updateTask: {
    type: TaskType,
    args: {
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      status: { type: GraphQLString },
      tag: { type: GraphQLString },
      assigned_to: { type: GraphQLString },
    },
    async resolve(parent, args) {
      const task = await Task.findByPk(args.id)
      await task.update(args)
      await task.save()
      return task
    },
  },
  deleteTask: {
    type: TaskType,
    args: {
      id: { type: GraphQLID },
    },
    async resolve(parent, args) {
      const task = await Task.findByPk(args.id)
      await task.destroy()
      return task
    },
  },
}
