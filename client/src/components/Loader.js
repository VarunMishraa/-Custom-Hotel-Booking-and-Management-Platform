import React from "react";
import HashLoader from "react-spinners/HashLoader";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100px", 
        marginTop:'200px'
      }}
    >
      <div className="sweet-loading">
        <HashLoader color={"#256395"} loading={true} size={80} />
      </div>
    </div>
  );
}

export default Loader;
