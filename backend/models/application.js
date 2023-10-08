const mongoose = require('mongoose');
require('mongoose-type-url');

const applicationSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  applicationDetails:{
    fieldId: { type: String, unique: true},
    latitude: { type: String },
    longitude: { type: String },
    standard: { type: String },
    cropType: { type: String },
    extend: { type: String },
    manure: { type: String },
    protection: { type: String },
    soilType: { type: String },
    prevCrop: { type: String },
    measures: { type: String },
    seedSource: { type: String },
    fileUrl:String,
    filePdfData: Buffer
  },
  applicationStatus: String,
  InspectionDetails: {
    InspectionDate: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\d{2}-\d{2}-\d{4}$/.test(v);
        },
        message: 'Invalid date format (DD-MM-YYYY)',
      },
    },
    inspectorname: String,
    rejectReason: String,
  },
  certificationDetails: {
    certificationDate: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\d{2}-\d{2}-\d{4}$/.test(v);
        },
        message: 'Invalid date format (DD-MM-YYYY)',
      }
    },
    certifiername: String,
    certificateName:String,
    validFrom: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\d{2}-\d{2}-\d{4}$/.test(v);
        },
        message: 'Invalid date format (DD-MM-YYYY)',
      },
    },
    expiresIn: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\d{2}-\d{2}-\d{4}$/.test(v);
        },
        message: 'Invalid date format (DD-MM-YYYY)',
      },
    },
    rejectReason: String,
    certificateUrl: String,
  }
});

module.exports = mongoose.model('Application', applicationSchema);;