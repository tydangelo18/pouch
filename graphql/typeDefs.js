const { gql } = require("apollo-server");

module.exports = gql`
  type Pouch {
    id: ID!
    name: String!
    createdAt: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    createdAt: String!
  }

  input RegisterInput {
    email: String!
    password: String!
    confirmPassword: String!
  }

  type Query {
    getPouches: [Pouch]
    getPouch(pouchId: ID!): Pouch
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    # Create Pouch
    # Delete Pouch by id
  }
`;
