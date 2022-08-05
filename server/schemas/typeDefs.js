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

  input savedShop {
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
    saveShop(input: savedShop!): User
    removeShop(ShopId: String!): User
  }
`;

module.exports = typeDefs;
