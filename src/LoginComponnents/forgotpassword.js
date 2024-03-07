import React, { useState } from 'react';
import './forgotPassword.css';
import { Link } from 'react-router-dom';

const Password = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch('http://localhost:8080/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }), // Send the email address
      });
      const data = await response.json();

      if (response.ok) {
        setMessage('If your email is registered, you will receive a password reset link.');
      } else {
        setMessage(data.error || 'An error occurred while sending the reset link.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while sending the reset link.');
    }
  };

  return (
    <div>
      <form className="RP" onSubmit={handleFormSubmit}> {/* Add onSubmit handler */}
        <h2>Reset Password</h2>
        <input
          className='inputForm'
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="forgottenbutton">
          Send Reset Link
        </button>
        {message && <div className="message">{message}</div>}
        <p>
          <Link to="/" className="LoginLink">Back to login page</Link> 
        </p>
      </form> 
    </div>
  );
};

export default Password;
