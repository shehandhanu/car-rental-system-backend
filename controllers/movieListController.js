const MovieDetails = require("../models/movieList");
const Favorites = require("../models/favoritesList");
const SlideShow = require("../models/slideShowMovie");

//add movie Details
exports.addMovies = async (req, res) => {
  //const slideShowDetails = await SlideShow.create(req.body);

  const {
    movieID,
    coverImage,
    movieName,
    isFavorite,
    movieYear,
    movieTrailerLink,
    movieDescription,
    movieDirector,
    movieCast,
    movieCategories,
  } = req.body;

  const rate = parseFloat(req.body.rate);

  const movieDetails = await MovieDetails.create({
    movieID,
    coverImage,
    movieName,
    isFavorite,
    rate,
    movieYear,
    movieTrailerLink,
    movieDescription,
    movieDirector,
    movieCast,
    movieCategories,
  });

  if (!movieDetails) {
    res.status(401).json({
      success: false,
      message: "Add slideShow movie was failed",
    });
  }

  res.status(200).json({
    success: true,
    movieDetails,
  });
};

//get movie
exports.getAllMovies = async (req, res, next) => {
  const movieDetails = await MovieDetails.find();

  if (!movieDetails) {
    return res.status(404).json({
      success: false,
      message: "All Movie Not Found",
    });
  }

  res.status(200).json({
    success: true,
    movieDetails,
    message: "All Movies",
  });
};

//get movie by iD
exports.getMoviesByID = async (req, res, next) => {
  const movieDetails = await MovieDetails.find({ movieID: req.params.id });

  const movieDetails1 = movieDetails[0];

  if (!movieDetails) {
    return res.status(404).json({
      success: false,
      message: "Movie Not Found",
    });
  }

  res.status(200).json({
    success: true,
    movieDetails1,
    message: "Get Movie",
  });
};

//add favorite and update movie
exports.addFavorite = async (req, res, next) => {
  var movieDetailsx = await MovieDetails.findOne({ movieID: req.params.id });

  if (movieDetailsx.isFavorite == 0) {
    const updateMovieDetails = await MovieDetails.findOneAndUpdate(
      { movieID: req.params.id },
      { isFavorite: true }
    );
  } else {
    console.log("first false");
    const updateMovieDetails = await MovieDetails.findOneAndUpdate(
      { movieID: req.params.id },
      { isFavorite: false }
    );
  }

  const movieDetails = await MovieDetails.find({ movieID: req.params.id });

  if (movieDetailsx.isFavorite == 0) {
    const movieID = movieDetails[0].movieID;
    const coverImage = movieDetails[0].coverImage;
    const movieName = movieDetails[0].movieName;

    console.log("second true" + movieID + coverImage + movieName);

    const favList = await Favorites.create({
      movieID,
      coverImage,
      movieName,
    });
  } else {
    console.log("second false");
    const favList = await Favorites.find({
      movieID: req.params.id,
    });
    console.log(favList);
    const favMoivex = await Favorites.findByIdAndDelete(favList[0]._id);
  }

  const favList = await Favorites.find();

  if (favList) {
    res.status(200).json({
      favList: favList,
    });
  }

  // if (!movieDetails) {
  //   return res.status(404).json({
  //     success: false,
  //     message: "Can't Added",
  //   });
  // }

  // movieDetails = await MovieDetails.findByIdAndUpdate({
  //   movieID: req.params.id,
  //   isFavorite: req.body.isFavorite,
  // });

  // res.status(200).json({
  //   success: true,
  //   movieDetails,
  //   message: "Added Favorite Successfull",
  // });
};

//get movie by iD
exports.getHomeData = async (req, res, next) => {
  var Action = [];
  var Comedy = [];
  var Drama = [];
  var Horror = [];
  var Romance = [];
  const slideShowDetails = await SlideShow.find();

  const movieDetails = await MovieDetails.find();

  console.log(movieDetails.length);

  for (var i = 0; i < movieDetails.length; i++) {
    var movieCategories = movieDetails[i].movieCategories;

    if (movieCategories.length != 0) {
      for (var j = 0; j < movieCategories.length; j++) {
        var type = movieCategories[j].categoryType;
        switch (type) {
          case "Action":
            Action.push(movieDetails[i]);
            break;
          case "Comedy":
            Comedy.push(movieDetails[i]);
            break;
          case "Drama":
            Drama.push(movieDetails[i]);
            break;
          case "Horror":
            Horror.push(movieDetails[i]);
            break;
          case "Romance":
            Romance.push(movieDetails[i]);
            break;
        }
      }
    }
  }

  var movieCategories = {
    Action: Action,
    Comedy: Comedy,
    Drama: Drama,
    Horror: Horror,
    Romance: Romance,
    slideShow: slideShowDetails,
  };

  var movieCategoriesLength = {
    Action: Action.length,
    Comedy: Comedy.length,
    Drama: Drama.length,
    Horror: Horror.length,
    Romance: Romance.length,
    slideShow: slideShowDetails.length,
  };

  if (!movieDetails) {
    return res.status(404).json({
      success: false,
      message: "Movie Not Found",
    });
  }

  res.status(200).json({
    success: true,
    movieCategories: movieCategories,
    movieCategoriesLength: movieCategoriesLength,
    message: "Get Movie",
  });
};

exports.getFavoriteMovies = async (req, res, next) => {
  const movieDetails = await Favorites.find();

  if (!movieDetails) {
    return res.status(404).json({
      success: false,
      message: "All Movie Not Found",
    });
  }

  res.status(200).json({
    success: true,
    movieDetails,
    message: "All Movies",
  });
};
