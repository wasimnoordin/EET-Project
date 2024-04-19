import './bookingForm.css'
import { useState } from 'react';

function RadioOptionsComponent({ selectedFloor, handleDeskChange, handleSelectedDesk }) {
    const [selectedDesk, setSelectedDesk] = useState(null);

    const handleChange = event => {
        const deskValue = event.target.value;
        setSelectedDesk(deskValue);
        handleDeskChange(event); // If still needed
        handleSelectedDesk(deskValue); // Pass the selected desk back to parent
    };

    const renderRadioOptions = () => {
        let numDesks = selectedFloor === "Ground" ? 3 : 4; // Simplified conditional logic

        return Array.from({ length: numDesks }, (_, index) => (
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
            {selectedFloor && renderRadioOptions()}
        </div>
    );
}

export default RadioOptionsComponent;
