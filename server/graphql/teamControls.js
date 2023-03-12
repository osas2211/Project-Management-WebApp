import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from "graphql"
import { TaskType } from "./taskControls"
import { UserType } from "./userControls"

export const TeamType = new GraphQLObjectType({
  name: "team",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    agenda: { type: GraphQLString },
    users: { type: new GraphQLList(UserType) },
    tasks: { type: new GraphQLList(TaskType) },
  }),
})
