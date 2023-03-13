import { GraphQLError } from "graphql"

//  GRAPHQL_PARSE_FAILED(SyntaxError)
//  GRAPHQL_VALIDATION_FAILED(ValidationError)
//  BAD_USER_INPUT(UserInputError)
//  UNAUTHENTICATED(AuthenticationError)
//  FORBIDDEN(ForbiddenError)
//  PERSISTED_QUERY_NOT_FOUND(PersistedQueryNotFoundError)
//  PERSISTED_QUERY_NOT_SUPPORTED(PersistedQueryNotSupportedError)
//  INTERNAL_SERVER_ERROR(None)

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
      code: "INTERNAL_SERVER_ERROR",
    }
  }
}

export class BadUserInput extends GraphQLError {
  constructor(message, field) {
    super(message)
    this.extensions = {
      statusCode: 422,
      field,
      code: "BAD_USER_INPUT",
    }
  }
}
