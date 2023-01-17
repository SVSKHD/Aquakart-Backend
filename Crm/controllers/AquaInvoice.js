const toNext = require("../../middlewares/toNext");
const CustomError = require("../../utils/CustomError");
const AquaInvoices = require("../models/AquaInvoice");

exports.createInvoice = toNext(async (req, res, next) => {
  const body = req.body;
  if (!body) {
    return next(new CustomError("Please Provide valid data", 400));
  }

  const Invoice = await AquaInvoices.create(body);
  res.send(Invoice);
});

exports.loadAllInvoices = () => {};
exports.loadGstInvoices = () => {};

exports.updateInvoice = () => {};

exports.deleteInvoice = () => {};
