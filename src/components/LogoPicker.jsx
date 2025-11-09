import React from 'react';
import './LogoPicker.css';

const LogoPicker = ({ availableLogos, selectedLogo, onSelect }) => {
  return (
    <div className="logo-picker">
      {/* {availableLogos.map((logo, index) => (
        <div
          key={index}
          className={`logo-option ${selectedLogo === logo ? 'selected' : ''}`}
          onClick={() => onSelect(logo)}
        >
          <img src={logo} alt="logo option" />
        </div>
      ))} */}
    </div>
  );
};

export default LogoPicker;