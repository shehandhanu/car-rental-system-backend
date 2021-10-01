const mongoose = require("mongoose");

const repairServiceSchema = mongoose.Schema({
  type: {
    type: String,
    required: [true, "Please Click the Type"],
  },
  vehino: {
    type: String,
    required: [true, "Please Enter the Vehicle Number"],
  },
  serviceDate: {
    type: Date,
    required: [true, "Please Select The Date"],
  },
  serviceParts: {
    type: String,
    required: [true, "Please Enter the Repair/Service Parts "],
  },
  items: [
    {
      item: {
        type: String,
      },
      price: {
        type: Number,
      },
    },
  ],
  totPrice: {
    type: Number,
  },
  specialNote: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
  isQutationCreated: {
    type: Boolean,
    default: false,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Service", repairServiceSchema);
