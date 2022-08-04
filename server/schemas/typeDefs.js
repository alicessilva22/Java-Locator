const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Address {
    address1: String
  }

  type Business {
    location: [Address]
    name: String
    rating: Float
    review_count: Int
  }

  type Search {
    business: [Business]
  }
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(id: ID!): User
    me: User
    shop: Business
  }

  type Mutation {
    addUser(email: String!, username: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
