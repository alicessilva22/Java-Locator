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

    shops: async (_, { term, location }, context) => {
      const baseURL = new URL('https://api.yelp.com/v3/businesses/search');
      const {data} = await axios({
        method: 'GET',
        url: `${baseURL}?term=${term}&location=${location}`,
        headers: {
          "Authorization": "Bearer " + process.env.YELP_API_KEY
        }
      })
      return data.businesses;
    },
  },

  Mutation: {
    addUser: async (_, args) => {
      console.log(args);
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      console.log(email, password);
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

  saveShop: async (parent, args, context) => {
    if (context.user) {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedShops: args.input } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    }
    throw new AuthenticationError("You need to be logged in!");
  },
  removeShop: async (parent, args, context) => {
    if (context.user) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedShops: { shopId: args.shopId } } },
        { new: true }
      );
      return updatedUser;
    }
    throw new AuthenticationError('You need to be logged in!');
  }
 
};

module.exports = resolvers;
