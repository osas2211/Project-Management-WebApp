import {
  GraphQLString,
  GraphQLID,
  GraphQLObjectType,
  GraphQLList,
} from "graphql"
import dotenv from "dotenv"
import Project from "../database/models/projectModel.js"
import User from "../database/models/userModel.js"
import { UserType } from "./userControls.js"
import { TaskType } from "./taskControls.js"
import { TeamType } from "./teamControls.js"
import { Task } from "../database/models/TaskModel.js"
import { Team } from "../database/models/teamModel.js"

dotenv.config()

export const ProjectType = new GraphQLObjectType({
  name: "project",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    photo_url: { type: GraphQLString },
    category: { type: GraphQLString },
    project_manager: { type: GraphQLID },
    files_link: { type: new GraphQLList(GraphQLString) },
    tech_stack: { type: new GraphQLList(GraphQLString) },
    status: { type: GraphQLString },
    priority: { type: GraphQLString },
    start_date: { type: GraphQLString },
    end_date: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    users: { type: new GraphQLList(UserType) },
    tasks: { type: new GraphQLList(TaskType) },
    teams: { type: new GraphQLList(TeamType) },
  }),
})

export const ProjectQueries = {
  project: {
    type: ProjectType,
    args: { id: { type: GraphQLString } },
    async resolve(parent, args) {
      const project = await Project.findByPk(args.id, {
        include: [User, Task, Team],
      })
      return project
    },
  },
  projects: {
    type: new GraphQLList(ProjectType),
    async resolve(parent, args) {
      const projects = await Project.findAll({ include: [User, Task, Team] })
      return projects
    },
  },
}

export const ProjectMutations = {
  createProject: {
    type: ProjectType,
    args: {
      userName: { type: GraphQLString },
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      category: { type: GraphQLString },
      tech_stack: { type: new GraphQLList(GraphQLString) },
      files_link: { type: new GraphQLList(GraphQLString) },
      start_date: { type: GraphQLString },
      end_date: { type: GraphQLString },
    },
    async resolve(parent, args) {
      const user = await User.findOne({ where: { userName: args.userName } })
      const data = args
      const project = await Project.create({
        ...data,
        project_manager: user.userName,
      })
      await project.addUser(user.id)
      return project
    },
  },
  addCollaborator: {
    type: ProjectType,
    args: {
      userName: { type: GraphQLString },
      id: { type: GraphQLString },
    },
    async resolve(parent, args) {
      const project = await Project.findByPk(args.id)
      const user = await User.findOne({
        where: { userName: args.userName },
        include: User,
      })
      await project.addUser(user.id)
      return project
    },
  },
  deleteProject: {
    type: ProjectType,
    args: { id: { type: GraphQLString } },
    async resolve(parent, args) {
      const project = await Project.findByPk(args.id)
      await project.destroy()
      return project
    },
  },
}
