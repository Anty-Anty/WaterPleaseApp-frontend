import React from 'react';

import Backdrop from './Backdrop';

import './LogoPicker.css';

const LogoPicker = props => {
    return (
        <>
            {props.show && <Backdrop onClickProp={props.onCancel} />}
            <div className="logo-picker">
                {props.availableLogos.map(plant => (
                    <div
                        key={plant.id}
                        className={`logo-option ${props.selectedLogo === plant.img ? 'selected' : ''}`}
                        onClick={() => {props.onSelect(plant.img);}}
                    >
                        <img
                            src={`images/plant_${plant.img}.svg`}
                            alt={`plant_${plant.img}`}
                            className="plant-logo"
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default LogoPicker;