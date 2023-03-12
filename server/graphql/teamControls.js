import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} from "graphql"
import Project from "../database/models/projectModel.js"
import { Team } from "../database/models/teamModel.js"
import User from "../database/models/userModel.js"
import { TaskType } from "./taskControls.js"
import { UserType } from "./userControls.js"

export const TeamType = new GraphQLObjectType({
  name: "team",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    agenda: { type: GraphQLString },
    team_lead: { type: GraphQLString },
    users: { type: new GraphQLList(UserType) },
    tasks: { type: new GraphQLList(TaskType) },
  }),
})

export const TeamQueries = {}

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
      const team = await Team.create(args)
      const project = await Project.findByPk(args.project_id)
      const project_manager = await User.findOne({
        where: { userName: project.project_manager },
      })
      const team_lead = await User.findOne({
        where: { userName: args.team_lead },
      })

      await project.addTeam(team)
      await team.addUser(team_lead)
      await team.addUser(project_manager)
      return team
    },
  },
}
