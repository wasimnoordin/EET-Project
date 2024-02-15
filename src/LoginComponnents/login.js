import React, { useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';




const Login =(props) => {
const [Email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [emailError, setEmailError] = useState('');
const [passwordError, setPasswordError] = useState ('');

//const navigate = useNavigate();

const onButtonClick = () => {
  setEmailError("")
  setPasswordError("")

  //sets email errors
  if ("" === Email){
    setEmailError("Please enter your email address")
    return
  }
if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Email)){
  setEmailError("Please enter a valid email address");
  return;
}  
//Sets password errors
if ("" === password){
  setPasswordError("Please enter a password")
  return
}
if (password.length < 7){
  setPasswordError("The password must be 8 characters or longer")
  return
} 
}

//Email and password input boxes and a login button
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
                    value={Email}
                    placeholder="Email"
                    onChange={ev => setEmail(ev.target.value)} />
                    <label className="errorLabel">{emailError}</label>

            <input 
                  type="password"
                   className='inputForm'
                    value={password}
                    placeholder='Password'
                onChange={ev => setPassword(ev.target.value)}/>
              <label className="errorLabel">{passwordError}</label>
            <p><Link to ="/Changepassword"> Forgotten your password?</Link> 
            <Link to ="/Createaccount">Create an account</ Link>
            </p>

            <input 
                   className ={"Loginbutton"}
                   type ="button"
                   onClick={onButtonClick}
                   value={"login"} />
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    );
  };
  
 export default Login;
      
