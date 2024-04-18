import Navbar from "../SideBarComponents/NavBar";
import Mapimg from "./OfficeMaps";
import OfficeMaps from "./SeatAllocation";
import './OfficeMaps.css';

function OnePFour(){
    return(
        <div>
            <Navbar />
            <div className='wrapper'>
            
                <OfficeMaps />
                    <Mapimg
                    src="./1.4.png"
                    alt="1.4"/>
                        
                    
                    </div>
        </div>
    )
}
export default OnePFour;