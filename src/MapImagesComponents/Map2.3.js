import Navbar from "../SideBarComponents/NavBar";
import Mapimg from "./OfficeMaps";
import OfficeMaps from "./SeatAllocation";
import './OfficeMaps.css';

function TwoPThree(){
    return(
        <div>
            <Navbar />
            <div className='wrapper'>
               
                <OfficeMaps />
                    <Mapimg
                    src="./2.3.png"
                    alt="2.3"/>
                        
                    
                    </div>
        </div>
    )
}
export default TwoPThree;