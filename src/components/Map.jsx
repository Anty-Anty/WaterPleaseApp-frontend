import React, { useState } from 'react';

// import './Plant.css';

const columnsNumber = 7;
const SquaresNumber = Math.pow(columnsNumber, 2)

const Map = () => {
  return (
    <div className="map-container">

      {Array.from({ length: SquaresNumber }, (_, i) => {
        // creates table of squares
        const index = i + 1;
        // adds right border
        const isLastInRow = index % columnsNumber === 0; // 7, 14, 21, ...
        // adds bottom border
        const isLastRow = index > SquaresNumber - columnsNumber; // 43–49

        return (
          <div
            key={i}
            className={`map-container-item 
              ${isLastInRow ? 'last-in-row' : ''} 
              ${isLastRow ? 'last-row' : ''}`}
          >
            {/* {index} */}
          </div>
        );
      })}

    </div>
  );
};

export default Map;