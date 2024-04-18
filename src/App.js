import './App.css';
import Login from './LoginComponnents/login.js';
import Header from './Header.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Account from './LoginComponnents/createAccount';
import Password from './LoginComponnents/forgotpassword';
import Home from './HomePageComponents/HomePage';
import Booking from './BookingFormComponents/BookingForm';
import OnePOne from './MapImagesComponents/Map1.1';
import OnePTwo from './MapImagesComponents/Map1.2';
import OnePThree from './MapImagesComponents/Map1.3';
import OnePFour from './MapImagesComponents/Map1.4';
import TwoPOne from './MapImagesComponents/Map2.1';
import TwoPTwo from './MapImagesComponents/Map2.2';
import TwoPThree from './MapImagesComponents/Map2.3';
import TwoPFour from './MapImagesComponents/Map2.4';
import ThreePOne from './MapImagesComponents/Map3.1';
import ThreePTwo from './MapImagesComponents/Map3.2';
import ThreePThree from './MapImagesComponents/Map3.3';
import ThreePFour from './MapImagesComponents/Map3.4';

import NPassword from './LoginComponnents/NewPassword';

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
        <Route path="/homepage" element={<Home />} />
        <Route path="/bookingform" element={<Booking />} />
        <Route path="/1.1" element={<OnePOne />} />
        <Route path="/1.2" element={<OnePTwo />} />
        <Route path="/1.3" element={<OnePThree />} />
        <Route path="/1.4" element={<OnePFour />} />
        <Route path="/2.1" element={<TwoPOne />} />
        <Route path="/2.2" element={<TwoPTwo />} />
        <Route path="/2.3" element={<TwoPThree />} />
        <Route path="/2.4" element={<TwoPFour />} />
        <Route path="/3.1" element={<ThreePOne />} />
        <Route path="/3.2" element={<ThreePTwo />} />
        <Route path="/3.3" element={<ThreePThree />} />
        <Route path="/3.4" element={<ThreePFour />} />

        <Route path="/NewPassword/:token" element={<NPassword />} />
        </Routes>
        </Router>
  );
}

export default App;