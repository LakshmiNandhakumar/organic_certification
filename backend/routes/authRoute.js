const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;


router.post('/register', async (req, res) => {

  const { username, address, place, email, password, userType,storeName,buildingname,buildingnum } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.json({ success: false, message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, address, place, email, password: hashedPassword, userType });

  if(userType==='retailer'){
    newUser.storeName = storeName;
  }
  await newUser.save().then(() => {
    res.json({ success: true, message: 'Successfully registered!' });
  })
    .catch((error) => {
      res.json({ success: false, message: `Authentication Failed!${error}` });
    });

});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: 'Authentication failed' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.json({ message: 'password incorrect' });
    }

    const payload = { userId: user._id, username: user.username, address: user.address, place: user.place, email: user.email, userType: user.userType };
    if (user.userType === 'retailer') {
      payload.storeName = user.storeName; 
    }
    
    const token = jwt.sign(payload, secret);
    res.status(200).json({ success: true, message: 'User authenticated!', token });

  } catch (error) {
    res.json({ error: 'Authentication failed' });
  }
});

function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication token missing' });
  }

  jwt.verify(token, secret, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }

    try {
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.status(200).json({
        success: true,
        message: 'User profile retrieved successfully',
        profile: {
          userid: user._id,
          username: user.username,
          address: user.address,
          place: user.place,
          email: user.email,
          userType: user.userType,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to retrieve user profile' });
    }
  });
}
router.get('/profile', authenticateToken);


module.exports = router;