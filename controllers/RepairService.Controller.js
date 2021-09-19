const Service = require("../models/RepairService.Model");

//create Report of Service/Repair in a vehicle
exports.addReportOfService = async (req, res, next) => {
  const { type, vehino, serviceDate, serviceParts } = req.body;

  const reportOfService = await Service.create({
    type,
    vehino,
    serviceDate,
    serviceParts,
  });

  res.status(200).json({
    success: true,
    reportOfService,
    message: "Report of Service/Repair Details Added",
  });
};

//create Quotation of Service/Repair in a vehicle
exports.createQuotation = async (req, res, next) => {
  const newdata = {
    items: req.body.items,
    totPrice: req.body.totPrice,
    specialNote: req.body.specialNote,
    isQutationCreated: true,
  };

  let quotationOfService = await Service.findByIdAndUpdate(
    req.params.id,
    newdata,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  if (!quotationOfService) {
    res.status(400).json({
      success: false,
    });
  }

  res.status(200).json({
    success: true,
    quotationOfService,
  });
};

//Get Details of Report of Service/Repair in a vehicle
exports.getReportOfService = async (req, res, next) => {
  const reportOfService = await Service.find();

  if (!reportOfService) {
    return res.status(400).json({
      success: false,
      message: "Report of Repair/Service Details Not Found",
    });
  }

  res.status(200).json({
    success: true,
    reportOfService,
    message: "Get Report of Repair/Service Details",
  });
};

//Get Details of quotations
exports.getListOfQuotations = async (req, res, next) => {
  const quotationOfService = await Service.find();

  if (!quotationOfService) {
    return res.status(400).json({
      success: false,
      message: "List of Quotations Not Found",
    });
  }

  res.status(200).json({
    success: true,
    quotationOfService,
    message: "Get List of Quotations",
  });
};

//Update Details of Report of Service/Repair in a vehicle
exports.updateReportOfService = async (req, res, next) => {
  let reportOfService = await Service.findById(req.params.id);

  if (!reportOfService) {
    return res.status(400).json({
      success: false,
      message: "Report of Repair/Service Details Not Found",
    });
  }

  reportOfService = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    reportOfService,
    message: "Update Successfull",
  });
};

//Delete Details of Report of Service/Repair in a vehicle
exports.deleteReportOfService = async (req, res, next) => {
  let reportOfService = await Service.findById(req.params.id);

  if (!reportOfService) {
    return res.status(404).json({
      success: false,
      message: "Report of Repair/Service Details Not Found",
    });
  }

  reportOfService = await Service.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    reportOfService,
    message: "Delete Successfull",
  });
};

//Delete List of Qutations
exports.deleteQuotations = async (req, res, next) => {
  let quotationOfService = await Service.findById(req.params.id);

  if (!quotationOfService) {
    return res.status(404).json({
      success: false,
      message: "List of Quotations Not Found",
    });
  }

  quotationOfService = await Service.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    quotationOfService,
    message: "Delete Successfull",
  });
};

//check the Report of Service/Repair in a vehicle
exports.checkedReportOfService = async (req, res, next) => {
  let reportid = req.params.id;
  let report = await Service.findById(reportid);

  if (!report) {
    res.status(404).json({
      success: false,
      message: "No Report Found",
    });
  }

  report = await Service.updateOne(
    { _id: reportid },
    { isChecked: true },
    {
      new: true,
      useFindAndModify: false,
    }
  );

  report = await Service.findById(reportid);

  res.status(200).json({
    success: true,
    report,
  });
};

//approve the quotations
exports.approveQuotations = async (req, res, next) => {
  let quotationid = req.params.id;
  let quotations = await Service.findById(quotationid);

  if (!quotations) {
    res.status(404).json({
      success: false,
      message: "Quotations Found",
    });
  }

  quotations = await Service.updateOne(
    { _id: quotationid },
    { isApproved: true },
    {
      new: true,
      useFindAndModify: false,
    }
  );

  quotations = await Service.findById(quotationid);

  res.status(200).json({
    success: true,
    quotations,
  });
};
