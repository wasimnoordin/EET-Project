import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';

const Sidebar = () => {
    return (
      <Menu>
        <a className="menu-item" href="/">
          map
        </a>
        <a className="menu-item" href="/logout">
          Logout
        </a>
        <a className="menu-item" href="/editPage">
          Edit account
        </a>
        <a className="menu-item" href="/desserts">
          Locate a team mate
        </a>
      </Menu>
    );
  };
  
  export default Sidebar;