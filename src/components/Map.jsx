import React, { useState } from 'react';

// import './Plant.css';

const SquaresNumber = 49;

const Map = props => {

    return (
        <div className="map-container">
            {Array.from({ length: SquaresNumber }, (_, i) => (
                <div key={i} className="map-container-item">
                    map {i + 1}
                </div>
            ))}
        </div>
    );
};

export default Map;