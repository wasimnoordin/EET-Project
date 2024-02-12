import './App.css';
import Login from './LoginComponnents/login.js';
import Header from './Header.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Account from './LoginComponnents/createAccount';
import Password from './LoginComponnents/forgotpassword';
import Home from './HomePageComponents/HomePage';

function App() {
  return (
    <Router>
      <div>
        <Header />
        
      </div>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Account />} />
        <Route path="/Changepassword" element={<Password />} />
        <Route path="/homepage" element={<Home />} />
        </Routes>
        </Router>
  );
}

export default App;