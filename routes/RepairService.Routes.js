const express = require("express");
const router = express.Router();

const {
  addReportOfService,
  getReportOfService,
  createQuotation,
  updateReportOfService,
  deleteReportOfService,
  checkedReportOfService,
} = require("../controllers/RepairService.Controller");

//report of repair/service
router.route("/reportOfServiceRepair").post(addReportOfService);

//get report of repair/service
router.route("/getReportOfservice").get(getReportOfService);

//update report of repair/service
router.route("/updateReportOfservice/:id").post(updateReportOfService);

//delete report of repair/service
router.route("/deleteReportOfservice/:id").delete(deleteReportOfService);

//create vehicle quotation
router.route("/createQuotation/:id").post(createQuotation);

router.route("/checkReportOfservice/:id").get(checkedReportOfService);

module.exports = router;
