const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fieldDetails:{
    fieldId: { type: String,unique:true },
    latitude: { type: String },
    longitude: { type: String},
    cropType: { type: String },
    certified:{type:String},
  },
  productDetails:{
    riceType:{type:String},
    duration:{type:String},
    quantity:{type:Number},
  },
  millingDetails:{
    millName:{type:String},
    millType:{type:String},
    grading:{type:String},
    numberOfBags:{type:Number},
    quantityPerBag : {type:Number},
    bagType:{type:String},
  },
  qrcodeImages: [
    {
      uniqueToken: String,
      imageName: String,
      image: Buffer,
      companyId: {type:String},
      companyName:{type:String},
      storeName: {type:String},
      from: {type:String},
      to: {type:String},
      bagstatus:String,
    },
  ],
  status:String,  
});

module.exports = mongoose.model('Field', fieldSchema);;