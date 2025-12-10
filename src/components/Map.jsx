import React, { useState } from "react";

import "./Map.css";

const columnsNumber = 8;
const SquaresNumber = Math.pow(columnsNumber, 2);

const Map = (props) => {
  return (
    <>
      <div
        className="map-container"
        style={{ "--columns-number": columnsNumber }}
      >
        {/* MAP GRID */}
        {Array.from({ length: SquaresNumber }, (_, i) => {
          // creates table of squares
          const index = i + 1;
          // adds right border
          const isLastInRow = index % columnsNumber === 0; // 7, 14, 21, ...
          // adds bottom border
          const isLastRow = index > SquaresNumber - columnsNumber; // 43–49
          // adds background to selected square
          const isSelected = props.selectedSquares.includes(index);

          return (
            <div
              key={i}
              className={`map-container-item 
              ${isLastInRow ? "last-in-row" : ""} 
              ${isLastRow ? "last-row" : ""}
              ${isSelected ? "selected" : ""}
              `}
            >
              {/* {index} */}
            </div>
          );
        })}

        {/* BUTTONS */}
        <div className="map-btn">
          <button onClick={props.showEditMapHandler}>✎</button>
          {/* <button>✔</button>
          <button>✖</button>
          <button>🗘</button> */}
        </div>
      </div>
    </>
  );
};

export default Map;