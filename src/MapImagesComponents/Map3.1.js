import Navbar from "../SideBarComponents/NavBar";
import Mapimg from "./OfficeMaps";
import OfficeMaps from "./SeatAllocation";
import './OfficeMaps.css';

function ThreePOne(){
    return(
        <div>
            <Navbar />
            <div className='wrapper'>
                <OfficeMaps />
                    <Mapimg
                    src="./3.1.png"
                    alt="3.1"/>
                        
                   
                    </div>
        </div>
    )
}
export default ThreePOne;