// frontend/src/pages/CreatePost.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handlePost = async () => {
    if (!user) return alert('Login required');

    const formData = new FormData();
    formData.append('userId', user._id);
    formData.append('name', user.name);
    formData.append('bio', user.bio || '');
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Post created');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Error creating post');
    }
  };

  return (
    <div className="container">
      <h2>Create Post</h2>
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button onClick={handlePost}>Post</button>
    </div>
  );
};

export default CreatePost;
