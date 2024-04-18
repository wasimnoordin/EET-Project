import './bookingForm.css'
import { useState } from 'react';
import { Link } from 'react-router-dom'; 

function RadioOptionsComponent({ selectedFloor, handleDeskChange }) {
    const [selectedDesk, setSelectedDesk] = useState(null);

    const handleChange = event => {
        const deskValue = event.target.value;
        setSelectedDesk(deskValue);
        handleDeskChange(event);
    };

    const renderRadioOptions = () => {
        let numDesks = 4; // Default number of desks for other floors

        if (selectedFloor === "Ground") {
            numDesks = 3; // Set to 3 desks for ground floor
        }

        return [...Array(numDesks)].map((_, index) => (
            <label key={index}>
                <input
                    type="radio"
                    value={`${selectedFloor}.${index + 1}`}
                    checked={selectedDesk === `${selectedFloor}.${index + 1}`}
                    onChange={handleChange}
                />
                {`${selectedFloor}.${index + 1}`}
            </label>
        ));
    };

    return (
        <div>
            {selectedFloor && (
                <div>
                    {renderRadioOptions()}
                </div>
            )}
            {selectedDesk && (
                <div>
                    <Link to={`/${selectedDesk}`}>
                        <button
                            type="submit"
                            className='SubBut'
                        >
                            Submit
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}
export default RadioOptionsComponent;