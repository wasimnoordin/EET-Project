import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login';
import Header from './Header.js';
import ForgottenPassword from './forgotpassword.js';
import CreateAccount from './createAccount'; 

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgottenPassword />} />
          <Route path="/create-account" element={<CreateAccount />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
