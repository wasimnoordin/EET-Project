import './bookingForm.css'
import { useState } from 'react';


const deskImages = {
    "Ground.1":'./G.1.png',
    "Ground.3":'./G.3.png',
    "1.1": './1.1.png',
    "1.2": './1.2.png',
    "1.3": './1.3.png',
    "1.4": './1.4.png',
    "2.1": './2.1.png',
    "2.2": './2.2.png',
    "2.3": './2.3.png',
    "2.4": './2.4.png',
    "3.1": './3.1.png',
    "3.2": './3.2.png',
    "3.3": './3.3.png',
    "3.4": './3.4.png',
    "4.1": './4.1.png',
    "4.2": './4.2.png',
    "4.3": './4.3.png',
    "4.4": './4.4.png',
};

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
            numDesks = 3; // Set to 2 desks for ground floor
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
                    <img src={deskImages[selectedDesk]} alt={`Desk ${selectedDesk}`} className='MapImg' />
                </div>
            )}
        </div>
    );
}

export default RadioOptionsComponent;