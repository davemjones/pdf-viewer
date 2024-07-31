import React from "react";
import './controls.css'

function Controls() {
  return (
    <>
    <div className="control-group">
      <button>Previous Page</button>
      <button>Next Page</button>
      </div>
      <div className="control-group">
        <button>Zoom Down</button>
        <button>Zoom Up</button>
        <span id="current-zoom">Current Zoom: </span>
      </div>
    </>
  );
}

export default Controls;
