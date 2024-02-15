
import './forgotPassword.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Password = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


//Allows a user to input their email address to reset their pasword
  return(
  
  <div>
  <form className="RP" >
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
    {message && <div className="message">{message}</div>}{' '}
    {/* Display feedback message */}
   
  
  <p>
       <Link to="/" className="LoginLink">Back to login page </Link> 
      </p>
      </form> 
</div>

  );
};
export default Password;
