import './Header.css';
import React, { useState } from 'react';
import './createAccount.css';
import { Link } from 'react-router-dom';

const Account = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to server or perform validation)
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="accountForm">
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="submit">
          Create Account
        </button>
      </form>
      <p>
        Already have an account? <Link to="/" className="LogLink">Login</Link>
      </p>
    </div>
  );
};
export default Account;
