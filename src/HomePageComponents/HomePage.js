
import './HomePage.css';
import ProfilePic from './UploadImage';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Sidebar from './Sidebar';

import 'react-calendar/dist/Calendar.css';
function Home() {
    const [date, setDate] = useState(new Date());

    const onChange = (newDate) => {
        setDate(newDate);
    };
    return (
        <div>
            
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      
            <div className="userBox">
                <ProfilePic />
                <p className="UserText">
                    Good afternoon Bob!
                    <br /> Check in here!
                    <br /> Your next booking is <b>Thursday at Phoenix Telford desk 1.1.21</b>
                </p>
            </div>
            <div className="CalBox">
               
                <Calendar
                    onChange={onChange}
                    value={date}
                    />
            </div>
            <div className="CommentBox">
                {/* Add content or components related to CommentBox here */}
                <p>Comment Box Content Goes Here</p>
            </div>
        </div>
    );
}


 


export default Home;