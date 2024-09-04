import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AdminLogin.css"
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simple authentication logic for demonstration
    if (username === 'admin' && password === 'shoba@1999') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/admin');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='adminlogin'>
      <h2>Shoba Admin Login</h2>
      <form action="">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      /> <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      /> <br />
      <button type='submit' onClick={handleLogin}>Login</button>
      </form>
     
    </div>
  );
};

export default LoginPage;
