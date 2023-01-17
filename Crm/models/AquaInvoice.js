const Mongoose = require("mongoose");

const AquaInvoiceSchema = Mongoose.Schema({
    //invoice No
    invoiceNo:{
     type:String
    },
    //customer
    name:{
     type:String
   },
   email:{
    type:String
   },
   phone:{
    type:Number
   },
   address:{
    type:String
   },
   //gst details
   gstName:{
    type:String
   } ,
   gstNo:{
    type:String
   },
   gstPhone:{
    type:Number
   },
   gstEmail:{
    type:String
   },
   gstAddress:{
    type:String
   },
   products:[{
     name:{type:String},
     quantity:{type:String},
     basePrice:{type:Number},
     productGst:{type:Number},
     total:{type:Number}
   }],
   deliveryDate:{
    type:String
   },
   deliveredBy:{
    type:String
   },
   transferType:{
    type:String
   },
   transferTo:{
    type:String
   },
   createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model("AquaInvoices", AquaInvoiceSchema);
