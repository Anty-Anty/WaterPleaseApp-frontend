import React, { useState } from "react";

import "./Map.css";
import { daysUntilNextWatering } from "./util/days";

const Map = (props) => {

  const columnsNumber = props.DUMMY_MAP.columnsNumber;
  const SquaresNumber = Math.pow(columnsNumber, 2);

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

          // plantId stored in map
          const plantId = props.DUMMY_MAP.squares[index];

          // find full plant object
          const plant = props.plants.find(p => p.id === plantId);

          // calculate days 
          const days =
            plant?.lastWateredDate && plant?.daysToNextWatering
              ? daysUntilNextWatering(
                plant.lastWateredDate,
                plant.daysToNextWatering
              )
              : null;

          return (

            <div
              key={index}
              className={`map-container-item 
              ${isLastInRow ? "last-in-row" : ""} 
              ${isLastRow ? "last-row" : ""}
              ${isSelected ? "selected" : ""}
              `}
            >

              {plant && (
                <div
                  className="logo-option-map"
                >
                  <img
                    src={`images/plant_${plant.img}.svg`}
                    alt={plant.title}
                    className="plant-logo"
                  />

                  {days !== null && (
                    <div className={`daysUntilNextWatering ${days < 0 ? "overdue" : ""}`}>
                      {days}
                    </div>
                  )}

                </div>
              )}

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