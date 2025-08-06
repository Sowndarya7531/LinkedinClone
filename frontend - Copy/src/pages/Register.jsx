import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';


const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', bio: '' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <input type="text" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <textarea placeholder="Bio" onChange={e => setForm({ ...form, bio: e.target.value })}></textarea>
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
};

export default Register;