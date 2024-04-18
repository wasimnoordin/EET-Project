import Navbar from "../SideBarComponents/NavBar";
import Mapimg from "./OfficeMaps";
import OfficeMaps from "./SeatAllocation";
import './OfficeMaps.css';

function OnePTwo(){
    return(
        <div>
            <Navbar />
            <div className='wrapper'>
                
                <OfficeMaps />
                    <Mapimg
                    src="./1.2.png"
                    alt="1.2"/>
                        
                    
                    </div>
        </div>
    )
}
export default OnePTwo;