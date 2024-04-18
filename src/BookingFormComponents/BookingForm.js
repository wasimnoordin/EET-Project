import React, { useState } from 'react';
import Navbar from '../SideBarComponents/NavBar';
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

 
    const handleDeskChange = event => {
        setSelectedArea(event.target.value);
    };


    return (
        <div>
            <Navbar />
            <div className='wrapper'>
                <div className="bookingForm">
                    <div className='inlineElements'>
                        <label className="Office">Choose an office:</label>
                        <select id="Office" 
                                name="Office" 
                                className="OfficeOption" 
                                onChange={handleDeskChange}>
                            <option value="">Office</option>
                            <option value="Telford">Telford</option>  
                        </select>
                    </div>
                    <div className='inlineElements'>
                        <DatepickerComponent />

                        <FloorDropdownComponent />
   <RadioOptionsComponent selectedFloor={selectedFloor} handleDeskChange={handleDeskChange} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Booking;
