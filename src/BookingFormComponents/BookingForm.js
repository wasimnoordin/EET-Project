import React, { useState } from 'react';
import Navbar from '../SideBarComponents/NavBar';
import './bookingForm.css';
import DatepickerComponent from './DatePicker';
import FloorDropdownComponent from './FloorDropdown';
import RadioOptionsComponent from './Floor';
import { Link } from 'react-router-dom'; 

function Booking() {
    const [selectedFloor, setSelectedFloor] = useState("");
    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedDesk, setSelectedDesk] = useState("");
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const handleFloorChange = event => {
        setSelectedFloor(event.target.value);
    };

    const handleDeskChange = event => {
        setSelectedArea(event.target.value);
    };

    const handleSelectedDesk = desk => {
        setSelectedDesk(desk);
    };

    const handleSubmit = () => {
        setSubmitAttempted(true);
        if (!selectedArea || !selectedFloor || !selectedDesk) {
            alert('Please select all required fields.');
            return;
        }
        alert('Form submitted successfully.');
    };

    return (
        <div>
            <Navbar />
            <div className='wrapper'>
                <div className="bookingForm">
                    <div className='inlineElements'>
                        <label className="Office">Choose an office:</label>
                        <select id="Office" name="Office" className="OfficeOption" onChange={handleDeskChange}>
                            <option value="">Select Office</option>
                            <option value="Telford">Telford</option>  
                        </select>
                    </div>
                    <div className='inlineElements'>
                        <DatepickerComponent submitAttempted={submitAttempted} />
                        <FloorDropdownComponent selectedFloor={selectedFloor} handleFloorChange={handleFloorChange} />
                        <div className='radio'>
                            <RadioOptionsComponent selectedFloor={selectedFloor} handleDeskChange={handleDeskChange} handleSelectedDesk={handleSelectedDesk} />
                        </div>
                        <Link to={`/${selectedDesk}`}>
                            <button onClick={handleSubmit}>Submit Booking</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Booking;