const express = require("express");
const router = express.Router();

const {
  addSlideShowMovie,
  getAllSlideShowMovie,
} = require("../controllers/slideShowMovieController");

router.route("/addSlideShowMovie").post(addSlideShowMovie);
router.route("/getSlideShowMovie").get(getAllSlideShowMovie);
//router.route('/getReview/:id').get(getReview);
//router.route('/updateReview/:id').post(updateReview);
//router.route('/deleteReview/:id').delete(deleteReview);

module.exports = router;
