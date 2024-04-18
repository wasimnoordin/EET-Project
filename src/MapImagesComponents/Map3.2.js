import Navbar from "../SideBarComponents/NavBar";
import Mapimg from "./OfficeMaps";
import OfficeMaps from "./SeatAllocation";
import './OfficeMaps.css';

function ThreePTwo(){
    return(
        <div>
            <Navbar />
            <div className='wrapper'>
               
                <OfficeMaps />
                    <Mapimg
                    src="./3.2.png"
                    alt="3.2"/>
                       
                    </div>
        </div>
    )
}
export default ThreePTwo;