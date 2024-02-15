import React, { useState } from 'react';
import Navbar from '../NavBar';
import './bookingForm.css';
import DatepickerComponent from './DatePicker';
import FloorDropdownComponent from './FloorDropdown';
import RadioOptionsComponent from './Floor';

function Booking() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showFloorDropdown, setShowFloorDropdown] = useState(false);
    const [selectedFloor, setSelectedFloor] = useState("");
    const [selectedArea, setSelectedArea] = useState(null);

    const handleOfficeSelect = () => {
        setShowCalendar(true);
        setShowFloorDropdown(false);
        setSelectedDate(null);
        setSelectedArea("");
    };

    const handleDateChange = date => {
        setSelectedDate(date);
        setShowFloorDropdown(true);
        setSelectedArea("");
        setSelectedFloor("");
    };

    const handleFloorChange = event => {
        setSelectedFloor(event.target.value);
        setSelectedArea("");
    };

    const handleDeskChange = event => {
        setSelectedArea(event.target.value);
    };

    return (
        <div>
            <Navbar />
            <div className='wrapper'>
                <div className="bookingForm">
                    <label className="Office">Choose an office:</label>
                    <select id="Office" 
                            name="Office" 
                            className="OfficeOption" 
                            onChange={handleOfficeSelect}>
                        <option value="">Office</option>
                        <option value="Telford">Telford</option>
                    </select>

                    {showCalendar && (
                        <DatepickerComponent selectedDate={selectedDate} handleDateChange={handleDateChange} />
                    )}

                    {showFloorDropdown && (
                        <FloorDropdownComponent handleFloorChange={handleFloorChange} selectedFloor={selectedFloor} />
                    )}
                   
                    <RadioOptionsComponent selectedFloor={selectedFloor} handleDeskChange={handleDeskChange} />
                </div>
            </div>
        </div>
    );
}

export default Booking;
