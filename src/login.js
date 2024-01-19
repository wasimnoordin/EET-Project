import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from 'react-router-dom'
import styles from './login.module.css'; // Import the CSS module

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onButtonClick = () => {
    setEmailError('');
    setPasswordError('');

    // Sets email errors
    if ('' === email) {
      setEmailError('Please enter your email address');
      return;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    // Sets password errors
    if ('' === password) {
      setPasswordError('Please enter a password');
      return;
    }
    if (password.length < 8) {
      setPasswordError('The password must be 8 characters or longer');
      return;
    }
  };

  return (
    <body>
      <div className={styles.container} id="container">
        <div className={`${styles['form-container']} ${styles['log-in-container']}`}>
          <form action="#">
            <h1>TeamUp!</h1>
            <p>Connecting you with your team mates!</p>
          </form>
        </div>
        <div className={styles['overlay-container']}>
          <div className={styles.overlay}>
            <div className={`${styles['overlay-panel']} ${styles['overlay-right']}`}>
              <h1>Login to TeamUp!</h1>
              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <label className={styles.errorLabel}>{emailError}</label>
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(ev) => setPassword(ev.target.value)}
              />
              <label className={styles.errorLabel}>{passwordError}</label>
              {/* Add a link to the Forgot Password page */}
              <p>
                <Link to="/forgot-password">Forgotten your password?</Link>
                <Link to="/create-account">Create an account</Link> {/* Use Link here */}
              </p>
              <input
                className={styles.button}
                type="button"
                onClick={onButtonClick}
                value="login"
              />
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Login;
