import React from "react";

export default function Error() {
  return (
    <div style={{textAlign:"center"}}>
      <div className="alert alert-danger" role="alert">
        Something went wrong
      </div>
    </div>
  );
}