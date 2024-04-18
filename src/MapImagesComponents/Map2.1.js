import Navbar from "../SideBarComponents/NavBar";
import Mapimg from "./OfficeMaps";
import OfficeMaps from "./SeatAllocation";
import './OfficeMaps.css';

function TwoPOne(){
    return(
        <div>
            <Navbar />
            <div className='wrapper'>
              
                <OfficeMaps />
                    <Mapimg
                    src="./2.1.png"
                    alt="2.1"/>
                        
                
                    </div>
        </div>
    )
}
export default TwoPOne;