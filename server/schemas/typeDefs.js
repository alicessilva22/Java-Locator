const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Address {
    display_address: [String]
  }

  type Data {
    businesses: [Business]
  }

  type Business {
    location: Address
    name: String
    rating: Float
    review_count: Int
    url: String
    image_url: String
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
    shops: [Business]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
