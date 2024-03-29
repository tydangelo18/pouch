const { gql } = require("apollo-server");

module.exports = gql`
  type Pouch {
    id: ID!
    name: String!
    createdAt: String!
    resources: [Resource]!
  }

  type Resource {
    id: ID!
    createdAt: String!
    email: String!
    link: String!
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
    createPouch(name: String!): Pouch!
    deletePouch(pouchId: ID!): String!
    createResource(pouchId: String!, link: String!): Pouch!
    deleteResource(pouchId: ID!, resourceId: ID!): Pouch!
    updatePouch(pouchId: ID!, name: String!): Pouch!
    updateResource(pouchId: ID!, resourceId: ID!, link: String!): Pouch!
  }
`;
