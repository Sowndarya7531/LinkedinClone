const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');

const router = express.Router();

// Multer configuration for profile pic upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

/**
 *  GET /api/users/test
 * Simple test route to check API is working
 */
router.get('/test', (req, res) => {
  res.send('Users API is working ✅');
});

/**
 *  GET /api/users/:id
 * Get user details by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // exclude password
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

/**
 *  PUT /api/users/:id
 * Update user profile info and profile picture
 */
router.put('/:id', upload.single('profilePic'), async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      bio: req.body.bio,
    };

    if (req.file) {
      updates.profilePic = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
