import React from "react";

const CapName = ({ src, alt }) => {
    return (
      <div className="CapgeminiName">
        <img src={src} alt={alt} />
      </div>
    );
  };
  
  export default CapName;