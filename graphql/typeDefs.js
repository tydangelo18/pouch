const { gql } = require("apollo-server");

module.exports = gql`
  type Pouch {
    id: ID!
    name: String!
    createdAt: String!
  }
  type Query {
    getPouches: [Pouch]
  }
`;
