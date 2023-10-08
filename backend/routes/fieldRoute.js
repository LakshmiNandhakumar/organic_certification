const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const generateQRCode = require('qrcode');

const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');


const Field = require('../models/field');
const User = require('../models/user');
const Application = require('../models/application');

router.get('/search/:fieldId', async (req, res) => {
  try {

    const fieldId = req.params.fieldId;
    const field = await Field.findOne({ 'fieldDetails.fieldId': fieldId });
    if (!field) {
      return res.status(404).json({ success: false, message: 'fieldId not found' });
    } else { res.json(field); }


  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/addFieldDetails', async (req, res) => {
  try {
    const { farmerId, fieldId, latitude, longitude, cropType } = req.body;
    const farmerObjectId = new mongoose.Types.ObjectId(farmerId);
    const user = await User.findOne({ _id: farmerObjectId }, 'username address place');

    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }

    const fieldData = {
      farmerId: farmerObjectId,
      username: user.username,
      address: user.address,
      place: user.place,
      fieldDetails: {
        fieldId,
        latitude,
        longitude,
        cropType,
        certified: 'Not organically Certified'
      }
    };

    const newFieldDetails = new Field(fieldData);
    await newFieldDetails.save();
    res.json({ success: true, message: 'Successfully added the details' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: `Details save failed! ${error}` });
  }
});

router.get('/displayFarmDetails/:fieldId', async (req, res) => {
  try {
    const fieldId = req.params.fieldId;

    const fieldDetails = await Field.findOne({ 'fieldDetails.fieldId': fieldId }).populate('farmerId')

    if (!fieldDetails) {
      return res.json({ error: 'Field details not found' });
    }
    res.json(fieldDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/addProductDetails', async (req, res) => {
  try {
    const { farmerId, fieldId, riceType, duration, quantity } = req.body;

    const fieldDetails = await Field.findOne({ 'fieldDetails.fieldId': fieldId });
    const application = await Application.findOne({ 'applicationDetails.fieldId': fieldId });

    if (!fieldDetails && !application) {
      return res.status(404).json({ message: 'Field details not found' });
    }
    else if (!fieldDetails) {
      const farmerObjectId = new mongoose.Types.ObjectId(farmerId);
      const user = await User.findOne({ _id: farmerObjectId }, 'username address place');
      if (!user) {
        return res.status(404).json({ error: 'user not found' });
      }
      const { latitude, longitude, cropType } = application.applicationDetails;
      const newfieldDetail = new Field({
        farmerId: farmerObjectId,
        fieldDetails: {
          fieldId, certified: 'organically Certified',
          latitude, longitude, cropType
        },
        productDetails: { riceType, duration, quantity, },
      });
      await newfieldDetail.save();
      return res.status(201).json(newfieldDetail);
    } else if (!application) {

      fieldDetails.productDetails.riceType = riceType;
      fieldDetails.productDetails.duration = duration;
      fieldDetails.productDetails.quantity = quantity;

      await fieldDetails.save();
      return res.status(201).json(fieldDetails);
    }
    else {
      fieldDetails.productDetails.riceType = riceType;
      fieldDetails.productDetails.duration = duration;
      fieldDetails.productDetails.quantity = quantity;
      fieldDetails.fieldDetails.latitude = application.applicationDetails.latitude;
      fieldDetails.fieldDetails.longitude = application.applicationDetails.longitude;
      fieldDetails.fieldDetails.cropType = application.applicationDetails.cropType;

      await fieldDetails.save();
      return res.status(201).json(fieldDetails);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


//............mill owner..............

router.get('/viewproductdetails', (req, res) => {
  Field.find({})
    .then(fieldDetails => res.send(fieldDetails))
    .catch((error) => console.log(error));
});

router.get('/viewproductdetails/:fieldId', async (req, res) => {
  try {
    const fieldId = req.params.fieldId;

    const fieldDetails = await Field.findOne({ 'fieldDetails.fieldId': fieldId }).populate('farmerId');

    if (!fieldDetails) {
      return res.json({ error: 'Field details not found' });
    }
    res.json(fieldDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/mill-details/:fieldId', async (req, res) => {

  try {
    const fieldId = req.params.fieldId;
    const { millName, millType, grading, numberOfBags, bagType } = req.body;

    const field = await Field.findOne({ 'fieldDetails.fieldId': fieldId }).select('productDetails.riceType productDetails.duration productDetails.quantity fieldDetails.latitude fieldDetails.longitude fieldDetails.cropType fieldDetails.certified');
    if (!field) {
      return res.status(400).json('Field is not found');
    }

    const riceType = field.productDetails.riceType;
    const duration = field.productDetails.duration;
    const quantity = field.productDetails.quantity;
    const latitude = field.fieldDetails.latitude;
    const longitude = field.fieldDetails.longitude;
    const cropType = field.fieldDetails.cropType;
    const certified = field.fieldDetails.certified;

    if (quantity < numberOfBags) {
      return res.status(400).json({ message: 'Not enough quantity' });
    }
    const quantityPerBag = Math.floor(quantity / numberOfBags);
    const qrCodeDirectory = path.join(__dirname, 'qr_codes');

    try {
      await fs.mkdir(qrCodeDirectory, { recursive: true });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to create directory for QR codes' });
    }
    const qrCodeImages = [];

    //generate qrcode for each bag
    for (let i = 0; i < numberOfBags; i++) {
      const uniqueToken = crypto.randomBytes(8).toString('hex');
      const qrCodeText = `${uniqueToken}`;

      const qrCodeFilePath = path.join(qrCodeDirectory, `qrcode_${fieldId}_${i + 1}.png`);

      try {
        await generateQRCode.toFile(qrCodeFilePath, qrCodeText);
      } catch (error) {
        console.error('Error generating QR code:', error);
        return res.status(500).json({ message: 'Failed to generate QR code' });
      }

      const binaryData = await fs.readFile(qrCodeFilePath);

      qrCodeImages.push({
        uniqueToken: uniqueToken,
        imageName: `image_${i + 1}.png`,
        image: binaryData,
      });

    }

    field.millingDetails.millName = millName;
    field.millingDetails.millType = millType;
    field.millingDetails.grading = grading;
    field.millingDetails.numberOfBags = numberOfBags;
    field.millingDetails.bagType = bagType;
    field.millingDetails.quantityPerBag = quantityPerBag;
    field.status = 'milling process';
    field.qrcodeImages = qrCodeImages;

    await field.save();

    return res.status(200).json({ message: 'QR code generated and saved successfully' });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/qrcodes/:fieldId', async (req, res) => {
  const fieldId = req.params.fieldId;

  try {
    const field = await Field.findOne({ 'fieldDetails.fieldId': fieldId });
    if (!field) {
      return res.status(404).json({ message: 'field not found' });
    }

    const qrCodeImages = field.qrcodeImages.map((image) => ({
      uniqueToken: image.uniqueToken,
      imageName: image.imageName,
      image: `data:image/png;base64,${image.image.toString('base64')}`,
    }));

    res.status(200).json({ qrCodeImages });
  } catch (error) {
    res.json({ message: 'Internal Server Error' });
  }
});


//........transporting company............................

router.get('/productdetails', async (req, res) => {
  Field.find({})
    .then(fieldDetails => res.send(fieldDetails))
    .catch((error) => console.log(error));
  try {
    // Find and retrieve documents with status 'accepted'
    const millingProcess = await Field.find({ status: 'milling process' }).select('id fieldDetails.fieldId fieldDetails.latitude fieldDetails.longitude fieldDetails.certified productDetails.riceType productDetails.duration productDetailsquantity bagType grading millName millType numberOfBags quantityPerBag qrcodeImages status')
      .then(fieldDetails => res.send(fieldDetails))
      .catch((error) => console.log(error));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/tqrcodes/:fieldId', async (req, res) => {
  const fieldId = req.params.fieldId;

  try {
    const field = await Field.findOne({ fieldId });

    if (!field) {
      return res.status(404).json({ message: 'field not found' });
    }

    const qrCodeImages = field.qrcodeImages.map((image) => ({
      uniqueToken: image.uniqueToken,
      imageName: image.imageName,

      image: `data:image/png;base64,${image.image.toString('base64')}`,
    }));


    res.status(200).json({ qrCodeImages });
  } catch (error) {
    res.json({ message: 'Internal Server Error' });
  }
});

router.get('/getDetailsByToken', async (req, res) => {
  const uniqueToken = req.query.token;
  try {
    const field = await Field.findOne({
      'qrcodeImages.uniqueToken': uniqueToken
    }).select('id fieldDetails.fieldId fieldDetails.latitude fieldDetails.longitude fieldDetails.cropType fieldDetails.certified productDetails.riceType productDetails.duration productDetails.quantity  millingDetails.grading  millingDetails.millName  millingDetails.millType  millingDetails.numberOfBags  millingDetails.bagType  millingDetails.quantityPerBag  status');
    if (!field) {
      return res.status(404).json({ message: 'Field not found' });
    }

    res.json(field);
  } catch (error) {
    console.error('Error fetching field by uniqueToken:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/addDetailsByToken', async (req, res) => {
  const uniqueToken = req.body.token;
  const { companyId, companyName, storeName, from, to } = req.body;

  try {
    const field = await Field.findOne({ 'qrcodeImages.uniqueToken': uniqueToken });

    if (!field) {
      return res.status(404).json({ message: 'Field not found' });
    }



    const qrCodeImage = field.qrcodeImages.find((image) => image.uniqueToken === uniqueToken);

    if (qrCodeImage) {
      qrCodeImage.companyId = companyId;
      qrCodeImage.companyName = companyName;
      qrCodeImage.from = from;
      qrCodeImage.to = to;
      qrCodeImage.storeName = storeName;
      qrCodeImage.bagstatus = 'onboard to deliver';
    } else {
      return res.status(404).json({ message: 'QR code image not found for token' });
    }


    const numberOfBagsTransported = field.qrcodeImages.filter((image) => image.bagstatus === 'onboard to deliver').length;


    if (numberOfBagsTransported === field.qrcodeImages.length) {
      field.status = 'fully delivered';
    } else {
      field.status = 'Transport process';
    }

    await field.save();


    res.status(200).json({ message: 'Details added successfully' });
  } catch (error) {
    console.error('Error adding details by uniqueToken:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/stores', async (req, res) => {
  try {
    const users = await User.find({ storeName: { $ne: null } }, 'storeName'); 
    const storeNames = users.map((user) => user.storeName); 
    res.json(storeNames);
  } catch (error) {
    console.error('Error fetching store names:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


//retailer

router.get('/getBagDetailsByStoreName/:storeName', async (req, res) => {
  const storeName = req.params.storeName;

  try {

    const user = await User.findOne({ storeName });

    if (!user) {
      return res.status(404).json({ message: 'User not found with the specified storeName' });
    }


    const fieldsWithMatchingStoreName = await Field.find({ 'qrcodeImages.storeName': storeName });

    if (!fieldsWithMatchingStoreName || fieldsWithMatchingStoreName.length === 0) {
      return res.status(404).json({ message: 'No matching bag details found for this storeName' });
    }


    const allBagDetails = [];


    fieldsWithMatchingStoreName.forEach((field) => {
      field.qrcodeImages.forEach((matchingImage) => {
        if (matchingImage.storeName === storeName) {

          const imageBase64 = `data:image/png;base64,${matchingImage.image.toString('base64')}`;


          allBagDetails.push({
            companyId: matchingImage.companyId,
            companyName: matchingImage.companyName,
            storeName: matchingImage.storeName,
            from: matchingImage.from,
            to: matchingImage.to,
            bagstatus: matchingImage.bagstatus,
            qrCodeImage: imageBase64,
            fieldId: field.fieldId,
            certified: field.certified,
            riceType: field.riceType,
            duration: field.duration,
            quantity: field.quantity,
            millName: field.millName,
            millType: field.millType,
            grading: field.grading,
            numberOfBags: field.numberOfBags,
            quantityPerBag: field.quantityPerBag,
          });
        }
      });
    });


    res.status(200).json({ bagDetails: allBagDetails });
  } catch (error) {
    console.error('Error fetching bag details by storeName:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/getDetailsByTokenRetailer', async (req, res) => {
  const uniqueToken = req.query.token;
  try {
    const field = await Field.findOne({
      'qrcodeImages.uniqueToken': uniqueToken
    }).select('id fieldDetails.fieldId fieldDetails.latitude fieldDetails.longitude fieldDetails.cropType fieldDetails.certified productDetails.riceType productDetails.duration productDetails.quantity  millingDetails.grading  millingDetails.millName  millingDetails.millType  millingDetails.numberOfBags  millingDetails.bagType  millingDetails.quantityPerBag status qrcodeImages.uniqueToken qrcodeImages.companyId qrcodeImages.companyName qrcodeImages.from qrcodeImages.to  qrcodeImages.bagstatus');

    if (!field) {
      return res.status(404).json({ message: 'Field not found' });
    }
    const { qrcodeImages } = field;


    const matchingImage = qrcodeImages.find((image) => image.uniqueToken === uniqueToken);

    if (matchingImage) {
      const selectedField = {
        uniqueToken: matchingImage.uniqueToken,
        companyId: matchingImage.companyId,
        companyName: matchingImage.companyName,
        from: matchingImage.from,
        to: matchingImage.to,
        bagstatus: matchingImage.bagstatus,
        millName: field.millingDetails.millName,
        millType: field.millingDetails.millType,
        grading: field.millingDetails.grading,
        numberOfBags: field.millingDetails.numberOfBags,
        bagType: field.millingDetails.bagType,
        quantityPerBag: field.millingDetails.quantityPerBag,
        fieldId: field.fieldDetails.fieldId,
        cropType: field.fieldDetails.cropType,
        latitude: field.fieldDetails.latitude,
        longitude: field.fieldDetails.longitude,
        certified: field.fieldDetails.certified,
        riceType: field.productDetails.riceType,
        duration: field.productDetails.duration,
        quantity: field.productDetails.quantity,
        status: field.status,
      };
      res.json(selectedField);
    } else {
      console.log('No matching image found for the given uniqueToken.');
    }

  } catch (error) {
    console.error('Error fetching field by uniqueToken:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/addDetailsByTokenRetailers', async (req, res) => {
  const uniqueToken = req.body.token;
  try {
    const field = await Field.findOne({ 'qrcodeImages.uniqueToken': uniqueToken });

    if (!field) {
      return res.status(404).json({ message: 'Field not found' });
    }


    const qrCodeImage = field.qrcodeImages.find((image) => image.uniqueToken === uniqueToken);
    if (qrCodeImage) {

      qrCodeImage.bagstatus = 'delivered';
    }

    await field.save();

    // Respond with a success message
    res.status(200).json({ message: 'Details added successfully' });
  } catch (error) {
    console.error('Error adding details by uniqueToken:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



//customer

router.get('/ctproduct/:storeName', async (req, res) => {
  const storeName = req.params.storeName;

  try {
    const user = await User.findOne({ storeName });

    if (!user) {
      return res.status(404).json({ message: 'User not found with the specified storeName' });
    }
    const fieldsWithMatchingStoreName = await Field.find({ 'qrcodeImages.storeName': storeName });

    if (!fieldsWithMatchingStoreName || fieldsWithMatchingStoreName.length === 0) {
      return res.status(404).json({ message: 'No matching bag details found for this storeName' });
    }
  
    const allBagDetails = [];
   
    fieldsWithMatchingStoreName.forEach((field) => {
      field.qrcodeImages.forEach((matchingImage) => {
        if (matchingImage.storeName === storeName) {
          const imageBase64 = `data:image/png;base64,${matchingImage.image.toString('base64')}`;

          allBagDetails.push({
            companyId: matchingImage.companyId,
            companyName: matchingImage.companyName,
            storeName: matchingImage.storeName,
            from: matchingImage.from,
            to: matchingImage.to,
            bagstatus: matchingImage.bagstatus,
            qrCodeImage: imageBase64,
            fieldId: field.fieldId,
            certified: field.certified,
            riceType: field.riceType,
            duration: field.duration,
            quantity: field.quantity,
            millName: field.millName,
            millType: field.millType,
            grading: field.grading,
            numberOfBags: field.numberOfBags,
            quantityPerBag: field.quantityPerBag,
          });
        }
      });
    });

    // Respond with all bag details
    res.status(200).json({ bagDetails: allBagDetails });
    console.log('All Bag Details:', allBagDetails);
  } catch (error) {
    console.error('Error fetching bag details by storeName:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




module.exports = router;


