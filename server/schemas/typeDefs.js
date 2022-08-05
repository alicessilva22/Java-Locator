const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Address {
    display_address: [String]
  }

  type Data {
    businesses: [Business]
  }

  type Business {
    id: ID
    location: Address
    name: String
    rating: Float
    review_count: Int
    url: String
    image_url: String
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    favorites: [Business]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(id: ID!): User
    me: User
    shops(location:String!, term:String!): [Business]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    favorite(
      id: ID,
      name: String,
      rating: Float,
      review_count: Int,
      url: String,
      image_url: String
    ): User
    unfavorite(id: ID): User
  }
`;

module.exports = typeDefs;
