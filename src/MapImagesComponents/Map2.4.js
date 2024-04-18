import Navbar from "../SideBarComponents/NavBar";
import Mapimg from "./OfficeMaps";
import OfficeMaps from "./SeatAllocation";
import './OfficeMaps.css';

function TwoPFour(){
    return(
        <div>
            <Navbar />
            <div className='wrapper'>
             
                <OfficeMaps />
                    <Mapimg
                    src="./2.4.png"
                    alt="2.4"/>
                        
                    
                    </div>
        </div>
    )
}
export default TwoPFour;