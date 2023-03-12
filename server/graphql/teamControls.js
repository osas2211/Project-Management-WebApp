import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} from "graphql"
import Project from "../database/models/projectModel.js"
import { Task } from "../database/models/TaskModel.js"
import { Team } from "../database/models/teamModel.js"
import User from "../database/models/userModel.js"
import { TaskType } from "./taskControls.js"
import { UserType } from "./userControls.js"

export const TeamType = new GraphQLObjectType({
  name: "team",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    agenda: { type: GraphQLString },
    team_lead: { type: GraphQLString },
    members: { type: new GraphQLList(GraphQLString) },
  }),
})

export const TeamQueries = {
  team: {
    type: TeamType,
    args: { id: { type: GraphQLString } },
    async resolve(parent, args) {
      const team = await Team.findByPk(args.id, { include: [Task] })
      return team
    },
  },
}

export const TeamMutations = {
  createTeam: {
    type: TeamType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      agenda: { type: GraphQLString },
      project_id: { type: new GraphQLNonNull(GraphQLID) },
      team_lead: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent, args) {
      const project = await Project.findByPk(args.project_id)
      const project_manager = await User.findOne({
        where: { userName: project.project_manager },
      })
      const team_lead = await User.findOne({
        where: { userName: args.team_lead },
      })

      project_manager.id === team_lead.id
        ? (args.members = [project_manager.id])
        : (args.members = [team_lead.id, project_manager.id])

      const team = await Team.create(args)

      await project.addTeam(team)
      return team
    },
  },
}
