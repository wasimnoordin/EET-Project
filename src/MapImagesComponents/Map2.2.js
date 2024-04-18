import Navbar from "../SideBarComponents/NavBar";
import Mapimg from "./OfficeMaps";
import OfficeMaps from "./SeatAllocation";
import './OfficeMaps.css';

function TwoPTwo(){
    return(
        <div>
            <Navbar />
            <div className='wrapper'>
          
                <OfficeMaps />
                    <Mapimg
                    src="./2.2.png"
                    alt="2.2"/>
                        
                 
                    </div>
        </div>
    )
}
export default TwoPTwo;