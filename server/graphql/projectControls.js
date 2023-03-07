import {
  GraphQLString,
  GraphQLID,
  GraphQLObjectType,
  GraphQLList,
  GraphQLEnumType,
} from "graphql"
import dotenv from "dotenv"
import Project from "../database/models/projectModel.js"

dotenv.config()

export const ProjectType = new GraphQLObjectType({
  name: "project",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    category: { type: GraphQLString },
    project_manager: { type: GraphQLID },
    files_link: { type: new GraphQLList(GraphQLString) },
    tech_stack: { type: new GraphQLList(GraphQLString) },
    status: {
      type: new GraphQLEnumType({
        name: "projectStatus",
        values: {
          created: {
            value: 0,
          },
          in_progress: {
            value: 1,
          },
          completed: {
            value: 2,
          },
        },
      }),
    },
    priority: {
      type: new GraphQLEnumType({
        name: "projectPriority",
        values: {
          low: {
            value: 0,
          },
          medium: {
            value: 1,
          },
          high: {
            value: 2,
          },
        },
      }),
    },
    start_date: { type: GraphQLString },
    end_datae: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
})
