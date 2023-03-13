import {
  GraphQLString,
  GraphQLID,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
} from "graphql"
import dotenv from "dotenv"
import Project from "../database/models/projectModel.js"
import User from "../database/models/userModel.js"
import { UserType } from "./userControls.js"
import { TaskType } from "./taskControls.js"
import { TeamType } from "./teamControls.js"
import { Task } from "../database/models/TaskModel.js"
import { Team } from "../database/models/teamModel.js"
import {
  BadUserInputError,
  InternalServerError,
  NotFoundError,
} from "./errors.js"

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
      try {
        const project = await Project.findByPk(args.id, {
          include: [User, Task, Team],
        })
        if (project === null) {
          return new NotFoundError(
            `Project with id: "${args.id}" not found`,
            "id",
            "PROJECT_NOT_FOUND"
          )
        }
        return project
      } catch (error) {
        throw new InternalServerError(error.message)
      }
    },
  },
  projects: {
    type: new GraphQLList(ProjectType),
    async resolve(parent, args) {
      try {
        const projects = await Project.findAll({ include: [User, Task, Team] })
        return projects
      } catch (error) {
        throw new InternalServerError(error.message)
      }
    },
  },
}

export const ProjectMutations = {
  createProject: {
    type: ProjectType,
    args: {
      userName: { type: new GraphQLNonNull(GraphQLString) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLString },
      category: { type: GraphQLString },
      tech_stack: { type: new GraphQLList(GraphQLString) },
      files_link: { type: new GraphQLList(GraphQLString) },
      start_date: { type: GraphQLString },
      end_date: { type: GraphQLString },
    },
    async resolve(parent, args) {
      try {
        if (args.userName == "") {
          return new BadUserInputError("User Name is required", "userName")
        }
        if (args.title == "") {
          return new BadUserInputError("Title field can't be empty", "title")
        }
        const user = await User.findOne({ where: { userName: args.userName } })
        if (user === null) {
          return new NotFoundError(
            `User with userName: "${args.userName}" not found`,
            "userName",
            "USER_NOT_FOUND"
          )
        }
        const data = args
        const project = await Project.create({
          ...data,
          project_manager: user.userName,
        })
        await project.addUser(user.id)
        return project
      } catch (error) {
        throw new InternalServerError(
          error.errors !== undefined ? error.errors[0].message : error.message
        )
      }
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
