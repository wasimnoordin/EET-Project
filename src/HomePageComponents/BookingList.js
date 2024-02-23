import React, { useEffect, useState } from 'react';

function BookingList() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Fetch bookings from backend API endpoint
        fetch('/api/bookings')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch bookings');
                }
                return response.json();
            })
            .then(data => {
                // Update state with retrieved bookings
                setBookings(data);
            })
            .catch(error => {
                console.error('Error fetching bookings:', error);
            });
    }, []);

    return (
        <div>
            
            <ul>
                {bookings.map(booking => (
                    <li key={booking.id}>
                        {booking.date} - {booking.room}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookingList;