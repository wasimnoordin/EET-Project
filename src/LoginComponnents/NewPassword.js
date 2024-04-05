import React, { useState } from 'react';
import './NewPassword.css';

const NPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        // Retrieve the token from localStorage
        const token = localStorage.getItem('resetToken');

        try {
            const response = await fetch('http://localhost:8080/api/Passwordreset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword: password }),
            });
            const data = await response.json();

            // Clear the token from localStorage after use
            localStorage.removeItem('resetToken');

            if (data.error) {
                setMessage(data.error);
            } else {
                setMessage("Password reset successful. You can now log in with your new password.");
                // Optional: Redirect to login page, e.g., window.location.replace("/login");
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage("An error occurred while resetting your password.");
        }
    };

    return (
        <div className='wrapper'>
            <form className='PasswordForm' onSubmit={handleFormSubmit}>
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
                <button type="submit" className='confirmPassword'>Confirm Password</button>
                {message && <div className="message">{message}</div>}
            </form>
        </div>
    );
};

export default NPassword;
