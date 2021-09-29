const Owner = require("../models/Owner.Model");

//Add Vehical   => /api/v1/vehical/addvehical
exports.addOwner = async (req, res, next) => {
  const owner = await Owner.create(req.body);

  if (!owner) {
    res.status(201).json({
      success: false,
    });
  }

  res.status(200).json({
    success: true,
    vehical,
  });
};

//update user profile   => api/v1/user/update
exports.updateOwner = async (req, res, next) => {
  const owner = await Owner.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    vehical,
  });
};

//update user profile   => api/v1/user/update
exports.deleteOwner = async (req, res, next) => {
  const owner = await Owner.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    vehical,
  });
};

//get current user  => /api/v1/user
exports.getOwners = async (req, res, next) => {
  const owner = await Owner.find();

  if (!owner) {
    return res.status(401).json({
      success: false,
      message: "No Owner Found",
    });
  }

  res.status(200).json({
    success: true,
    vehical,
  });
};
