import Navbar from "../SideBarComponents/NavBar";
import Mapimg from "./OfficeMaps";
import OfficeMaps from "./SeatAllocation";
import './OfficeMaps.css';

function OnePOne(){
    return(
        <div>
            <Navbar />
            <div className='wrapper'>
                <div className="bookingForm">
                    <Mapimg
                    src="./1.1.png"
                    alt="1.1"/>
                        <OfficeMaps />
                    </div>
                    </div>
        </div>
    )
}
export default OnePOne;