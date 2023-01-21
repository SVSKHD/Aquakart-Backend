const mongoose = require("mongoose")

exports.getInvoices = (req,res) =>{
const Invoices = mongoose.Collection('Invoices')
res.json(Invoices)
}