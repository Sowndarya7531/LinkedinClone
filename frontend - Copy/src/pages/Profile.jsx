// Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { id } = useParams();
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(storedUser);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [pic, setPic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts`);
        const filtered = res.data.filter(p => p.userId === id);
        setPosts(filtered);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      }
    };
    fetchPosts();
  }, [id]);

  const saveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('bio', bio);
      if (pic) formData.append('profilePic', pic);

      const res = await axios.put(`http://localhost:5000/api/users/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      setEditMode(false);
      setPreview(null);
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert('Update failed');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  if (!user || user._id !== id) return <p>Unauthorized</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={preview || (user?.profilePic ? `http://localhost:5000/uploads/${user.profilePic}` : "https://via.placeholder.com/150")}
          alt="Profile"
          className="profile-pic"
        />

        {editMode && (
          <input type="file" onChange={handleFileChange} />
        )}

        {editMode ? (
          <div className="edit-section">
            <input className="edit-input" value={name} onChange={e => setName(e.target.value)} />
            <textarea className="edit-textarea" value={bio} onChange={e => setBio(e.target.value)} />
            <div className="edit-buttons">
              <button className="save-btn" onClick={saveProfile}>Save</button>
              <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <h2>{user.name}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Bio:</strong> {user.bio || 'No bio available'}</p>
            <button onClick={() => setEditMode(true)}>Edit Profile</button>
          </>
        )}
      </div>

      <div className="user-posts">
        <h3>Your Posts</h3>
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : posts.map(post => (
          <div className="post" key={post._id}>
            <p>{post.content}</p>
            {post.image && (
              <img src={`http://localhost:5000/uploads/${post.image}`} alt="Post" className="post-img" />
            )}
            <div className="interactions">
              <button>👍 Like ({post.likes || 0})</button>
              <button>💬 Comment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
