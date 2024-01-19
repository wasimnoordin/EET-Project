import React, { useState } from 'react';
import axios from 'axios';
import styles from './forgotpassword.module.css'; // Import the CSS module

const ForgottenPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with the API endpoint
      const response = await axios.post('/api/forgot-password', { email });
      setMessage(response.data.message); // Assuming the API returns a message
    } catch (error) {
      console.error('Error:', error.response);
      setMessage(error.response.data.message); // Handle the error response accordingly
    }
  };

  return (
    <div className={styles['login-container']}>
      <form className={styles['login-form']} onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>
          Send Reset Link
        </button>
        {message && <div className={styles.message}>{message}</div>}{' '}
        {/* Display feedback message */}
      </form>
    </div>
  );
};

export default ForgottenPassword;
