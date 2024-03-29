import React from "react";
import "./Sidebar.css";
import { SidebarData } from '../SideBarComponents/SidebarData';


function Sidebar(){
    return<div className="navbar">
        <ul className="navbarlist">
                    {SidebarData.map((val, key) =>{
                        return (                        
                        <li
                         key={key}
                         className ="row"
                         onClick={() =>{window.location.pathname=val.link}}>
                            <div id="icon">{val.icon}</div>
                            <div id="title">{val.title}</div>
                        </li>
                        );    
                })}
               </ul>
            </div>
    

}

export default Sidebar;