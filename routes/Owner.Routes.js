const express = require("express");
const router = express.Router();

const {
  addOwner,
  getOwners,
  updateOwner,
  deleteOwner,
} = require("../controllers/Owner.Controller");

//Register User
router.route("/addowner").post(addOwner);

router.route("/getowners").get(getOwners);

router.route("/updateowners/:id").put(updateOwner);

router.route("/deleteowners/:id").delete(deleteOwner);

module.exports = router;
