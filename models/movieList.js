const mongoose = require("mongoose");

const movieDetails = mongoose.Schema({
  movieID: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  movieName: {
    type: String,
  },
  isFavorite: {
    type: Number,
    default: 0,
  },
  rate: {
    type: Number,
  },
  movieYear: {
    type: Number,
  },
  movieTrailerLink: {
    type: String,
  },
  movieDescription: {
    type: String,
  },
  movieDirector: {
    type: String,
  },
  movieCast: {
    type: String,
  },
  movieCategories: [
    {
      categoryID: { type: String },
      categoryType: { type: String },
      catogoryName: { type: String },
    },
  ],
});

module.exports = mongoose.model("movieDetails", movieDetails);
