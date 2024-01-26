import './App.css';
import Login from './login.js';
import Header from './Header.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Account from './createAccount';
import Password from './forgotpassword';

function App() {
  return (
    <Router>
      <div>
        <Header />
        
      </div>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Createaccount" element={<Account />} />
        <Route path="/Changepassword" element={<Password />} />
        </Routes>
        </Router>
  );
}

export default App;