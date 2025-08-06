const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Post = require('../models/Post');

// Setup multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// POST /api/posts - Create a post
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    const { userId, name, bio, content } = req.body;

    // Validate required fields
    if (!userId || !name || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newPost = new Post({
      userId,
      name,
      bio,
      content,
      image: req.file ? req.file.filename : null,
      createdAt: new Date(),
    });

    await newPost.save();
    res.status(201).json(newPost);

  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET /api/posts - Fetch all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// PATCH /api/posts/:id/like - Increment like count
router.patch('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.likes = (post.likes || 0) + 1;
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    console.error('Error liking post:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
