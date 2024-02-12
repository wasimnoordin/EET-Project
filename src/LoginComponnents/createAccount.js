import React, { useState } from 'react';
import './createAccount.css';
import { Link } from 'react-router-dom';

const Account = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [registrationResult, setRegistrationResult] = useState('');

  const onButtonClick = () => {
    setPasswordError('');
    if (password.length < 8) {
      setPasswordError('The password must be 8 characters or longer');
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const form = document.getElementById('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      var formData = new FormData(form);
      // Create a JSON object with user data
      const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
      };
      console.log(userData)

      // Make a POST request to the backend API endpoint
      fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the backend
          if (data.message) {
            // Registration successful
            setRegistrationResult('Registration successful. You can now log in.');
          } else if (data.error) {
            // Registration error
            setRegistrationResult('Registration failed. ' + data.error);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          setRegistrationResult('An error occurred while registering.');
        });
    })
  }

    return (
      <div className="accountForm">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit} id="form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="errorLabel">{passwordError}</label>
          <button
            type="submit"
            className="submit"
            onClick={onButtonClick}
          >
            Create Account
          </button>
        </form>
        {registrationResult && <p>{registrationResult}</p>}
        <p>
          Already have an account? <Link to="/" className="LogLink">Login</Link>
        </p>
      </div>
    );
  };

  export default Account;

