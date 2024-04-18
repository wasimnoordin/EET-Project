import Navbar from "../SideBarComponents/NavBar";
import Mapimg from "./OfficeMaps";
import OfficeMaps from "./SeatAllocation";
import './OfficeMaps.css';

function ThreePThree(){
    return(
        <div>
            <Navbar />
            <div className='wrapper'>
                
                <OfficeMaps />
                    <Mapimg
                    src="./3.3.png"
                    alt="3.3"/>
                        
                  
                    </div>
        </div>
    )
}
export default ThreePThree;