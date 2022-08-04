require('dotenv').config('../')
const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");
const axios = require("axios");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (_, args) => {
      return User.findOne({ _id: args.id });
    },
    me: async (_, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    shops: async (_, args, context) => {
      return axios({
        method: 'GET',
        url: 'https://api.yelp.com/v3/businesses/search?term=coffee&location=cary',
        headers: {
          'Bearer': process.env.YELP_API_KEY
        }
      })
    },
  },

  Mutation: {
    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
