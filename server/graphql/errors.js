import { GraphQLError } from "graphql"

export class NotFoundError extends GraphQLError {
  constructor(message, field, code) {
    super(message)
    this.extensions = {
      statusCode: 404,
      code,
      field,
    }
  }
}

export class InternalServerError extends GraphQLError {
  constructor(message) {
    super(message)
    this.extensions = {
      statusCode: 500,
    }
  }
}
