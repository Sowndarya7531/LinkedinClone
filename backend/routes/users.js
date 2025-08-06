const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');

const router = express.Router();

// Multer for profile pic upload
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

// PUT /api/users/:id
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
