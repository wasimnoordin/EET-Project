import './bookingForm.css';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from './TimePicker';
import "react-datepicker/dist/react-datepicker.css";

function DatepickerComponent({}) { // Remove handleDateChange from parameters
    const today = new Date();
    const [inHours, setInHours] = useState('09');
    const [inMinutes, setInMinutes] = useState('00');
    const [outHours, setOutHours] = useState('17');
    const [outMinutes, setOutMinutes] = useState('00');
    const [selectedDate, setSelectedDate] = useState(null);

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

    const handleDateChange = date => {
        setSelectedDate(date);
       
    };

    const placeholderText = selectedDate ?
        selectedDate.toLocaleDateString() :
        "  Select a date";

    return (
        <div className='in'>
            <DatePicker
                className='SelectDateCalendar'
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={today}
                dateFormat="dd/MM/yyyy"
                placeholderText={placeholderText}
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
