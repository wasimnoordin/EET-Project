import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Define useNavigate

    const handleLogin = async () => {
      setError('');

    // Log email and password before sending the request
    console.log({ email, password });
  
      try {
          const response = await fetch('http://localhost:8080/api/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
          });
  
          const data = await response.json();
  
          if (!response.ok) {
              throw new Error(data.error || 'Login failed');
          }
  
          // Login successful, redirect to dashboard using navigate
          navigate('/dashboard');
      } catch (error) {
          setError(error.message);
      }
  };

    return (
        <div className='g'>
            <div className="background">
                <div className="container" id="container">
                    <div className="form-container log-in-container">
                        <form action="#">
                            <h1>TeamUp!</h1>
                            <p>Connecting you with your team mates!</p>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-right">
                                <h1>Login to TeamUp!</h1>

                                <input
                                    type="email"
                                    className='inputForm'
                                    value={email}
                                    placeholder="Email"
                                    onChange={(ev) => setEmail(ev.target.value)} />

                                <input
                                    type="password"
                                    className='inputForm'
                                    value={password}
                                    placeholder='Password'
                                    onChange={(ev) => setPassword(ev.target.value)} />

                                <button className="Loginbutton" onClick={handleLogin}>Login</button>
                                {error && <p className='error-message'>{error}</p>}
                                <p>
                                    <Link to="/Changepassword"> Forgotten your password?</Link>
                                    <Link to="/Createaccount">Create an account</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
