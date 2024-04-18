import Navbar from "../SideBarComponents/NavBar";
import Mapimg from "./OfficeMaps";
import OfficeMaps from "./SeatAllocation";
import './OfficeMaps.css';

function OnePThree(){
    return(
        <div>
            <Navbar />
            <div className='wrapper'>
                
                <OfficeMaps />
                    <Mapimg
                    src="./1.3.png"
                    alt="1.3"/>
                        
                   
                    </div>
        </div>
    )
}
export default OnePThree;