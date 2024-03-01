import React, { useState } from 'react';
import './NewPassword.css';

const NPassword = () => { 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
          
            console.log("Passwords match, form submitted!");
        } else {
            
            console.log("Passwords do not match!");
        }
    };

    return (
        <div className='wrapper'>
            <div className='PasswordForm'>
                <h1>Change Password</h1>
                <input 
                    type="password"
                    className='inputForm' 
                    placeholder='Enter new password'
                    value={password}
                    onChange={handlePasswordChange} 
                />
                <input 
                    type="password"
                    className='inputForm'
                    placeholder='Confirm New Password'
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange} 
                />
                <button type="submit" className='confirmPassword' onClick={handleFormSubmit}>
                    Confirm Password
                </button>
            </div>
        </div>
    );
}

export default NPassword;
