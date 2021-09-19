const express = require("express");
const router = express.Router();

const {
  addReportOfService,
  getReportOfService,
  createQuotation,
  updateReportOfService,
  deleteReportOfService,
  checkedReportOfService,
  getListOfQuotations,
  deleteQuotations,
  approveQuotations,
  updateQuotation,
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

//update vehicle quotation
router.route("/updateQuotation/:id").post(updateQuotation);

//get list of quotations
router.route("/getListOfQuotations").get(getListOfQuotations);

//delete list of quotations
router.route("/deleteQuotations/:id").delete(deleteQuotations);

//check report of services
router.route("/checkReportOfservice/:id").get(checkedReportOfService);

//approve quotations
router.route("/approveQuotations/:id").get(approveQuotations);

module.exports = router;
