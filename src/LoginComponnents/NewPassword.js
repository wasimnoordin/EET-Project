import React, { useState, useEffect } from 'react';
import './NewPassword.css';

const NPassword = () => { 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const token = query.get('token');
        setResetToken(token);
    }, []);

    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }
    
        // // Log the resetToken to the console for debugging
        // console.log("Sending reset token:", resetToken);
    
        try {
            const response = await fetch('http://localhost:8080/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: resetToken, newPassword: password }),
            });
            const data = await response.json();
            if (data.error) {
                setMessage(data.error);
            } else {
                setMessage("Password reset successful. You can now log in with your new password.");
                // Optional: Redirect to login page, e.g., window.location.href = "/login";
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
                    onChange={handlePasswordChange} />
                <input
                    type="password"
                    className='inputForm'
                    placeholder='Confirm New Password'
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange} />
                <button
                    type="submit"
                    className='confirmPassword'>
                    Confirm Password</button>
            {message && <div className="message">{message}</div>}
        </form>
    </div>
    );
}

export default NPassword;
