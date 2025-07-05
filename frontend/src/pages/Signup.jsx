import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const navigate = useNavigate();

  const handleSignup = async () => {
    const response = await fetch('https://medicine-2-yidh.onrender.com/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role })
    });

    const data = await response.json();
    if (response.ok) {
      alert('Signup successful');
      navigate('/login');
    } else {
      alert(data.error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Signup</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} /><br />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="patient">Patient</option>
        <option value="caretaker">Caretaker</option>
      </select><br />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
