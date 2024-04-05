import React, { useState, useEffect } from 'react';
import Navbar from "../SideBarComponents/NavBar";
import './HomePage.css';
import Notification from './Notificationcomp';

function Home() {
    const [username, setUsername] = useState('');
    const [bookings, setBookings] = useState([]);
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const [notificationContent, setNotificationContent] = useState('');

    // Fetch the username data from backend API
    useEffect(() => {
        const token = localStorage.getItem('token'); // Retrieve the token
        fetch('http://localhost:8080/api/getUsername', {
            headers: new Headers({
                'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            }),
        })
        .then(response => response.json())
        .then(data => setUsername(data.username))
        .catch(error => console.error('Error fetching username:', error));
    }, []);

    // Fetch the bookings data from backend API
    useEffect(() => {
        // Assuming you also need to authenticate this request
        const token = localStorage.getItem('token');
        fetch('http://localhost:8080/api/getBookings', {
            headers: new Headers({
                'Authorization': `Bearer ${token}`, // Include the token here as well if needed
            }),
        })
        .then(response => response.json())
        .then(data => setBookings(data))
        .catch(error => console.error('Error fetching bookings:', error));
    }, []);

    const handleCheckIn = () => {
        alert('Checked in successfully!');
    }

    const hasBookingForToday = () => {
        const today = new Date().toISOString().slice(0, 10);
        return bookings.some(booking => booking.date === today);
    }

    const sendBookingNotification = () => {
        setShowNotificationModal(true);
    }

    const handleSubmitNotification = () => {
        alert(`Notification content submitted: ${notificationContent}`);
        setShowNotificationModal(false);
    }

    return (
        <div>
            <Navbar />
            <div className='wrapper'>
                <div className="HomeForm">
                    <p>
                        Good afternoon {username}
                    </p>
                    <br />
                    {bookings.length > 0 ? (
                        <p>Your next booking is on {bookings[0].date}, at {bookings[0].Room}</p>
                    ) : (
                        <p>You have no upcoming bookings.</p>
                    )}
                    {hasBookingForToday() && (
                        <button onClick={handleCheckIn}>Check In</button>
                    )}
                    <button onClick={sendBookingNotification}>Send Booking Notification</button>
                    {showNotificationModal && <Notification
                        notificationContent={notificationContent}
                        setNotificationContent={setNotificationContent}
                        handleSubmitNotification={handleSubmitNotification}
                    />}
                </div>
            </div>
        </div>
    );
}

export default Home;