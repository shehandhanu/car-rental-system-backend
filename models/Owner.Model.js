const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  ownerFirstName: {
    type: String,
  },
  ownerLastName: {
    type: String,
  },
  ownerNIC: {
    type: String,
  },
  ownerEmail: {
    type: String,
  },
  ownerContact: {
    type: String,
  },
  ownerAddress: {
    type: String,
  },
  vehicleNumbers: {
    type: String,
  },
});

module.exports = mongoose.model("Owner", ownerSchema);
