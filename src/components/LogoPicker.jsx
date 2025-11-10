import React from 'react';

import Backdrop from './UIElements/Backdrop';

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
                            src={`images/plant${plant.img}.svg`}
                            alt={`img${plant.title}`}
                            className="plant-logo"
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default LogoPicker;