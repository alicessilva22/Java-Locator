const { Schema, model } = require("mongoose");

const favoriteSchema = new Schema({
  id: {
    type: String,
    required: false,
    unique: true,
  },
  name: {
    type: String,
  },
  rating: {
    type: Number,
  },
  review_count: {
    type: Number,
  },
  url: {
    type: String,
  },
  image_url: {
    type: String,
  },
});

const Favorite = model('Favorite', favoriteSchema, 'favorites');
module.exports = Favorite;

