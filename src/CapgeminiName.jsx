import React from "react";

const CapgeminiName = ({ src, alt }) => {
    return (
      <div className="CapgeminiName">
        <img src={src} alt={alt} />
      </div>
    );
  };
  
  export default CapgeminiName;