import React, { useState } from 'react';
import SearchBar from './SearchBar';
import './HomePage.css'

const Notification = ({ notificationContent, setNotificationContent, handleSubmitNotification }) => {
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (query) => {
        setSearchResults([query]);
    };

    return (
        <div className="notification">
            <h1 className=''>Notify a team member of a booking</h1>
            <p>Search for a team member:</p> 
            <SearchBar onSearch={handleSearch} />
            <ul>
                {searchResults.map((result, index) => (
                    <li key={index}>{result}</li>
                ))}
            </ul>
            <textarea
                value={notificationContent}
                onChange={(e) => setNotificationContent(e.target.value)}
                placeholder="Enter your notification content here..."
            />
            <button onClick={handleSubmitNotification}>Submit</button>
        </div>
    );
}

export default Notification;
