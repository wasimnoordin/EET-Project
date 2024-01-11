import React, { useState } from 'react';
import './login.css'


const Login =() => {
const {login, setLogin} = useState('');
  // < form className="login-form" onSubmit={handleSubmit}> handleSubmit is a function where we perform your authentication logic
    return (
      <div className="login-container">
          
      <form className="login-form" > 
          {  <input 
          className="button"
            type="text"
            id="username"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            />}
         
        </form>
    </div>
    );
  };
  
 export default Login;
      
