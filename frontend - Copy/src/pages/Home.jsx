import React, { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  // Sync user info from localStorage when window/tab is focused
  useEffect(() => {
    const syncUser = () => {
      const updatedUser = JSON.parse(localStorage.getItem('user'));
      setUser(updatedUser);
    };

    window.addEventListener('focus', syncUser);

    return () => {
      window.removeEventListener('focus', syncUser);
    };
  }, []);

  // Load posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('https://linkedinclone-ce15.onrender.com/api/posts');
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to load posts', err);
      }
    };
    fetchPosts();
  }, []);

  const handleOpenPostComposer = () => {
    navigate('/create-post');
  };

  const handleLike = async (postId) => {
    try {
      const res = await axios.patch(`https://linkedinclone-ce15.onrender.com/api/posts/${postId}/like`);
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? res.data : post))
      );
    } catch (err) {
      console.error('Error liking post', err);
    }
  };

  return (
    <div className="home-layout">
      {/* Left Sidebar - Profile */}
      <aside className="sidebar">
        <div className="profile-card">
          <img
            src={
              user?.profilePic
                ? `https://linkedinclone-ce15.onrender.com/uploads/${user.profilePic}`
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWGNnlvR10sY3jn6-xUAoRIYuAz0KodHzLow&s'
            }
            alt="User"
            className="profile-pic"
          />
          <h3>{user?.name || 'Guest'}</h3>
          <p>{user?.bio || 'No bio available'}</p>
          <p>Email: {user?.email || 'N/A'}</p>
        </div>
      </aside>

      {/* Feed - Posts */}
      <main className="feed">
        <div className="create-post" onClick={handleOpenPostComposer} style={{ cursor: 'pointer' }}>
          <input type="text" placeholder="Start a post" readOnly />
          <div className="post-options">
            <span>📷 Photo</span>
            <span>🎥 Video</span>
            <span>📅 Event</span>
            <span>📝 Article</span>
          </div>
        </div>

        {posts.length === 0 ? (
          <p>No posts yet. Be the first to post!</p>
        ) : (
          posts.map((post) => (
            <div className="post" key={post._id}>
              <h3>{post.name}</h3>
              <p className="bio">{post.bio}</p>
              <p>{post.content}</p>
              {post.image && (
                <img
                  src={`https://linkedinclone-ce15.onrender.com/uploads/${post.image}`}
                  alt="post"
                  className="post-img"
                />
              )}
              <div className="interactions">
                <button onClick={() => handleLike(post._id)}>
                  👍 Like ({post.likes || 0})
                </button>
                <button>💬 Comment</button>
              </div>
            </div>
          ))
        )}
      </main>

      {/* Right Sidebar - Suggestions */}
      <aside className="rightbar">
        <h4>Add to your feed</h4>
        <ul>
          <li>CD PROJECT RED <button>+ Follow</button></li>
          <li>Bulldogjob <button>+ Follow</button></li>
          <li>GeeksforGeeks <button>+ Follow</button></li>
        </ul>
        <h4>Most viewed courses</h4>
        <ol>
          <li>Six Morning Habits of High Performers</li>
          <li>Unconscious Bias</li>
        </ol>
      </aside>
    </div>
  );
};

export default Home;
