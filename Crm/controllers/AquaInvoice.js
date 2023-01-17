const toNext = require("../../middlewares/toNext")
const AquaInvoices = require("../models/AquaInvoice")

exports.createInvoice = toNext(async (req, res, next) => {
    const body = req.body
    const Invoice = await AquaInvoices.create(body)
    res.send(Invoice)
  });

exports.loadAllInvoices = () =>{

}
exports.loadGstInvoices = () =>{

}

exports.updateInvoice = ()=>{

}

exports.deleteInvoice = () =>{

}