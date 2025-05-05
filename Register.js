import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label><br />
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label><br />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label><br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default Register;
