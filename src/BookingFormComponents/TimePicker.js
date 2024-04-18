import React from 'react';

function TimePicker({ label, hours, minutes, onHourChange, onMinuteChange }) {
    const handleHourChange = (event) => {
        const { value } = event.target;
        onHourChange(value);
    };

    const handleMinuteChange = (event) => {
        const { value } = event.target;
        onMinuteChange(value);
    };

    return (
        <div>
            <label>{label}</label>
            <div className="time-picker">
                <input
                className='timeBox'
                    type="number"
                    min="00"
                    max="23"
                    value={hours}
                    onChange={handleHourChange}
                />
                <span>:</span>
                <input
                 className='timeBox'
                    type="number"
                    min="00"
                    max="59"
                    value={minutes}
                    onChange={handleMinuteChange}
                />
            </div>
        </div>
    );
}

export default TimePicker;