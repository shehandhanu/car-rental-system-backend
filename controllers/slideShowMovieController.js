const SlideShow = require("../models/slideShowMovie");

//add slide show Details
exports.addSlideShowMovie = async (req, res) => {
  //const slideShowDetails = await SlideShow.create(req.body);

  const { movieID, image } = req.body;

  const slideShowDetails = await SlideShow.create({
    slideShowMovie: {
      movieID,
      image,
    },
  });

  if (!slideShowDetails) {
    res.status(401).json({
      success: false,
      message: "Add slideShow movie was failed",
    });
  }

  res.status(200).json({
    success: true,
    slideShowDetails,
  });
};

//get SlideShowMovie
exports.getAllSlideShowMovie = async (req, res, next) => {
  const slideShowDetails = await SlideShow.find();

  if (!slideShowDetails) {
    return res.status(404).json({
      success: false,
      message: "Slide Show Movie Not Found",
    });
  }

  res.status(200).json({
    success: true,
    slideShowDetails,
    message: "Slide Show Movie Papers",
  });
};
