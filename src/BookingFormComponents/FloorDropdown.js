import React from 'react';
import './bookingForm.css'

function FloorDropdownComponent({ handleFloorChange, selectedFloor }) {
    return (
        <div className=''>
            <label className="floor">Choose a floor:</label>
            <select 
                id="floor"
                name="floor"
                className="floorOption"
                onChange={handleFloorChange}
                value={selectedFloor}
            >
                <option value="">Floor</option>
                <option value="Ground">Ground</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
        </div>
    );
}

export default FloorDropdownComponent;