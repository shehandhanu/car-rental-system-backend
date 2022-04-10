const mongoose = require("mongoose");

const slideShowSchema = mongoose.Schema({
  slideShowMovie: {
    movieID: {
      type: String,
    },
    image: {
      type: String,
    },
  },
});

module.exports = mongoose.model("slideShow", slideShowSchema);
