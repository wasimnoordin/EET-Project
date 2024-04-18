import Navbar from "../SideBarComponents/NavBar";
import Mapimg from "./OfficeMaps";
import OfficeMaps from "./SeatAllocation";
import './OfficeMaps.css';

function ThreePFour(){
    return(
        <div>
            <Navbar />
            <div className='wrapper'>
                <OfficeMaps />
                    <Mapimg
                    src="./3.4.png"
                    alt="3.4"/>
                    
                    </div>
        </div>
    )
}
export default ThreePFour;