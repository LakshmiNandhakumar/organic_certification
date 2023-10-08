require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const multer = require('multer');

const fs = require('fs');

const Application = require('../models/application');
const User = require('../models/user');
const currentTimestamp = Date.now();
const currentDate = new Date(currentTimestamp);

const tenYearsLater = new Date(currentDate);
tenYearsLater.setFullYear(currentDate.getFullYear() + 10);

const day = String(currentDate.getDate()).padStart(2, '0');
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const year = currentDate.getFullYear();
const formattedDate = `${day}-${month}-${year}`;

const day_ten = String(tenYearsLater.getDate()).padStart(2, '0');
const month_ten = String(tenYearsLater.getMonth() + 1).padStart(2, '0');
const year_ten = tenYearsLater.getFullYear();
const formattedTenYearsLater = `${day_ten}-${month_ten}-${year_ten}`;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname);
  },
});
const upload = multer({ storage: storage });


//..........................................Farmer.........................................................................


router.post('/applicationsubmit', upload.single('pdfFile'), async (req, res) => {
  try {
    const {
      farmerId,
      fieldId,
      latitude,
      longitude,
      standard,
      cropType,
      extend,
      manure,
      protection,
      soilType,
      prevCrop,
      measures,
      seedSource
    } = req.body;

    const pdfBinaryData = fs.readFileSync(req.file.path);
    fs.unlinkSync(req.file.path);

    const farmerObjectId = new mongoose.Types.ObjectId(farmerId);
    const user = await User.findOne({ _id: farmerObjectId }, 'username address place');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const applicationData = {
      farmerId: farmerObjectId,
      applicationDetails: {
        fieldId,
        latitude,
        longitude,
        standard,
        cropType,
        extend,
        manure,
        protection,
        soilType,
        prevCrop,
        measures,
        seedSource,
        fileUrl: req.file.originalname,
        filePdfData: pdfBinaryData
      },
      applicationStatus: 'Application Submitted'
    };

    const newApplication = new Application(applicationData);
    await newApplication.save();
    res.json({ success: true, message: 'Successfully submitted the application' });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ success: false, message: 'Submission Failed! An error occurred.' });
  }
});

router.get('/appStatus/:farmerId', async (req, res) => {
  try {
    const farmerId = req.params.farmerId;
    const application = await Application.find({
      farmerId: new mongoose.Types.ObjectId(farmerId),
    }).select('_id applicationDetails.fieldId farmerId applicationStatus InspectionDetails.inspectorname InspectionDetails.InspectionDate InspectionDetails.rejectReason certificationDetails.certificationDate certificationDetails.certifiername certificationDetails.rejectReason certificationDetails.certificateUrl applicationDetails.latitude applicationDetails.longitude applicationDetails.standard applicationDetails.cropType applicationDetails.extend applicationDetails.manure applicationDetails.protection applicationDetails.soilType applicationDetails.prevCrop applicationDetails.measures applicationDetails.seedSource certificationDetails.validFrom certificationDetails.expiresIn');
    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/search/:fieldId',async (req, res) => {
  try {

    const fieldId = req.params.fieldId;
    const field = await Application.findOne({ 'applicationDetails.fieldId': fieldId });
    if (!field) {
      return res.status(404).json({ success:false,message: 'fieldId not found' });
    }
    else{res.json(field);}
    

  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/appDisplayFarmDetails/:fieldId', async (req, res) => {
  try {
    const fieldId = req.params.fieldId;
    const fieldDetails = await Application.findOne({ 'applicationDetails.fieldId': fieldId }).populate('farmerId');
    if (!fieldDetails) {
      return res.json({ error: 'Field details not found' });
    }
    res.json(fieldDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



//..........................................Inspector..................................................................

router.get('/viewApplication', (req, res) => {
  Application.find({}).populate('farmerId')
    .then(applications => res.send(applications))
    .catch((error) => console.log(error));
});

router.get('/viewapplication/:applicationId', (req, res) => {
  const applicationId = req.params.applicationId;

  Application.findById(applicationId)
    .populate('farmerId')
    .exec()
    .then(application => {
      if (!application) {
        return res.status(404).json({ error: 'Application not found' });
      }
      res.json(application);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

router.put('/viewApplication/accept/:applicationId', async (req, res) => {
  try {

    const applicationId = req.params.applicationId;
    const { Inspectorname } = req.body;

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
   
    application.InspectionDetails.InspectionDate = formattedDate;
    application.InspectionDetails.inspectorname = Inspectorname;
    application.applicationStatus = 'Inspection completed';
    
    await application.save();
    res.json(application);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/viewApplication/reject/:applicationId', async (req, res) => {
  try {

    const applicationId = req.params.applicationId;
    const { rejectReason } = req.body;

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    application.InspectionDetails.rejectReason = rejectReason;
    application.applicationStatus = 'Rejected by inspector';

    await application.save();
    res.json(application);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/applications/:applicationId/identification-file', async (req, res) => {
  try {
    const { applicationId } = req.params;

 
    const application = await Application.findById(applicationId);

    if (!application || !application.applicationDetails) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const { fileUrl, filePdfData } = application.applicationDetails;

    if (!fileUrl || !filePdfData) {
      return res.status(404).json({ message: 'Identification file not found' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=identification.pdf`);

    res.send(filePdfData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//............................................. Certifier.............................................................................

router.get('/certifierView', async (req, res) => {
  try {
    const acceptedApplications = await Application.find({

      applicationStatus: { $in: ['Inspection completed', 'Certified','Rejected by certifier'] }

    }).select('_id farmerId farmerName applicationDetails.fieldId InspectionDetails.InspectionDate InspectionDetails.inspectorname applicationStatus').populate('farmerId');

    res.json(acceptedApplications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/cviewapplication/:applicationId', (req, res) => {
  const applicationId = req.params.applicationId;

  Application.findById(applicationId)
    .populate('farmerId')
    .exec()
    .then(application => {
      if (!application) {
        return res.status(404).json({ error: 'Application not found' });
      }
      res.json(application);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

router.put('/cviewapplication/accept/:applicationId', async (req, res) => {
  try {

    const applicationId = req.params.applicationId;
    const { certifiername } = req.body;
    const { certificateUrl } =req.body;
   

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    application.certificationDetails.certificationDate = formattedDate;
    application.certificationDetails.certifiername = certifiername;
    application.certificationDetails.validFrom = formattedDate;
    application.certificationDetails.expiresIn = formattedTenYearsLater;
    application.applicationStatus= 'Certified';

    await application.save();
    res.json(application);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/cviewapplication/reject/:applicationId', async (req, res) => {
  try {

    const applicationId = req.params.applicationId;
    const { rejectReason } = req.body;

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    application.certificationDetails.rejectReason = rejectReason;
    application.applicationStatus = 'Rejected by certifier';

    await application.save();
    res.json(application);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;