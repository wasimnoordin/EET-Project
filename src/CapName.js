import React from "react";
import './CapName.css';
const CapName = ({ src, alt }) => {
    return (
     
        <img className="Capimg" src={src} alt={alt} />
     
    );
  };
  
  export default CapName;