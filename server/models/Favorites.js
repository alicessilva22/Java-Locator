const { Schema, model } = require("mongoose");

const favoriteSchema = new Schema({
//   _id: {
//     type: Number,
//     required: true,
//     unique: true,
//   },
  name: {
    type: String,
    // required: true,
  },
  rating: {
    type: Number,
    // required: true,
  },
  review_count: {
    type: Number,
    // required: true,
  },
  url: {
    type: String,
    // required: true,
  },
  image_url: {
    type: String,
    // required: true,
  },
});

const Favorites = model('Favorite', favoriteSchema);
module.exports = Favorites;

