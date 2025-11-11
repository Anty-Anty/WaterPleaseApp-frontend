import React, { useState, useEffect } from 'react';

import Input from './FormElements/Input';
import LogoPicker from './UIElements/LogoPicker';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH } from './util/validators';
import { useImagesList } from './hooks/ImagesList-hook';


import './AddEditPlant.css';

const EditPlant = props => {

    const logos = useImagesList('plant');

    //state controles visibility of logoPicker.jsx
    const [showLogoPicker, setShowLogoPicker] = useState(false);
    const openLogoPickerHandler = () => setShowLogoPicker(true);
    const closeLogoPickerHandler = () => setShowLogoPicker(false);


    // state stores eaither logo picked in logoPicker.jsx or logo from PlantsList.jsx 
    const [selectedLogo, setSelectedLogo] = useState(props.logo || null);

    return (
        <>
            
            <div className='plants-list-item'>

                <div className="add-edit-plant-logo" >

                    {/* shows eaither logo picked in logoPicker.jsx or logo from PlantsList.jsx */}
                    <img
                        onClick={openLogoPickerHandler}
                        src={`images/plant_${selectedLogo || props.img}.svg`}
                        alt={`plant_${selectedLogo || props.img}`}
                        className="plant-logo"
                    />


                    {showLogoPicker && (
                        <LogoPicker
                            show={showLogoPicker}
                            onCancel={closeLogoPickerHandler}
                            availableLogos={logos}
                            selectedLogo={selectedLogo}
                            onSelect={(logo) => {
                                setSelectedLogo(logo);
                                setShowLogoPicker(false);
                            }}
                        />
                    )}
                </div>


                <Input
                    id='plant'
                    element="input"
                    name="toDoItem"
                    placeholder="plant name"
                    className='add-input'
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(50)]}
                    errorText='Enter a valid plant name — 1 to 50 characters required.'
                // onInput={inputHandler}
                />

                <div>input</div>
                <div>input</div>


                {/* <div className="button-stack">
                            <button onClick={props.showEditModalHandler}>edit</button>
                            <button onClick={props.showDeleteModalHandler}>delete</button>
                        </div> */}

                <div className="add-edit-plant-button-stack">
                    <button>✔</button>
                    <button onClick={props.closeEditModalHandler}>✖</button>
                </div>
            </div>
        </>
    );
};

export default EditPlant;