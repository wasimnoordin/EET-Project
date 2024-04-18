import './bookingForm.css'
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from './TimePicker';
import "react-datepicker/dist/react-datepicker.css";

function DatepickerComponent({ selectedDate, handleDateChange }) {
    const today = new Date();
    const [inHours, setInHours] = useState('09');
    const [inMinutes, setInMinutes] = useState('00');
    const [outHours, setOutHours] = useState('17');
    const [outMinutes, setOutMinutes] = useState('00');
    const handleInHourChange = (value) => {
        setInHours(value);
    };

    const handleInMinuteChange = (value) => {
        setInMinutes(value);
    };

    const handleOutHourChange = (value) => {
        setOutHours(value);
    };

    const handleOutMinuteChange = (value) => {
        setOutMinutes(value);
    };

    return (<div className='in'>
        <DatePicker
            className='SelectDateCalendar'
            selected={selectedDate}
            onChange={handleDateChange}
            minDate={today}            
            dateFormat="Pp"
            placeholderText="Select a date"
        />
        <TimePicker
        label="In Time"
        hours={inHours}
        minutes={inMinutes}
        onHourChange={handleInHourChange}
        onMinuteChange={handleInMinuteChange}
    />
    <TimePicker
        label="Out Time"
        hours={outHours}
        minutes={outMinutes}
        onHourChange={handleOutHourChange}
        onMinuteChange={handleOutMinuteChange}
    />
    </div>
    );
}

export default DatepickerComponent;
