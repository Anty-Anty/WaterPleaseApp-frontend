import React, { useState } from "react";

import "./EditMap.css";

const columnsNumber = 8;
const SquaresNumber = Math.pow(columnsNumber, 2);

const EditMap = (props) => {
  return (
    <>
      <div
        className="map-container-edit"
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
              onClick={() => props.squareClickHandler(index)}
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
        <div className="map-btn-edit">
          <button onClick={props.mapSaveHandler}>✔</button>
          <button onClick={props.mapCancelHandler}>✖</button>
          <button onClick={props.mapResetHandler}>🗘</button>
        </div>
      </div>

      <div className="plant-list-edit">
        <div>edit map</div>
        <div>pick plant</div>
      </div>
    </>
  );
};

export default EditMap;