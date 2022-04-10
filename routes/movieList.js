const express = require("express");
const router = express.Router();

const {
  addMovies,
  getAllMovies,
  getMoviesByID,
  addFavorite,
  getHomeData,
  getFavoriteMovies,
} = require("../controllers/movieListController");

router.route("/addMovie").post(addMovies);
router.route("/getAllMovies").get(getAllMovies);
router.route("/getMoviesByID/:id").get(getMoviesByID);
router.route("/addFavorite/:id").put(addFavorite);
router.route("/getHome").get(getHomeData);
router.route("/getFavoriteMovie").get(getFavoriteMovies);
//router.route('/deleteReview/:id').delete(deleteReview);

module.exports = router;
