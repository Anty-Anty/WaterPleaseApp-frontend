import React, { useState, useEffect } from 'react';

import Input from './FormElements/Input';
import LogoPicker from './UIElements/LogoPicker';
import CustomDateInput from './UIElements/CustomDateInput';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH, VALIDATOR_MAX_TODAY, VALIDATOR_MIN_TOMORROW } from './util/validators';
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

                {/* logo */}
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

                {/* plant name */}
                <div>
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
                </div>

                {/* Last Watering Date */}
                <div>
                    <CustomDateInput
                        id="lastWateredDate"
                        placeholder="Last Watering Date"
                        initialValue={props.lastWateredDate}
                        validators={[VALIDATOR_MAX_TODAY()]}
                        errorText="Please select a valid date."
                    // onInput={inputHandler}
                    />
                </div>

                {/* Next Watering Date */}
                <div>
                    <CustomDateInput
                        id="nextWateredDate"
                        placeholder="Next Watering Date"
                        initialValue={props.nextWateredDate}
                        validators={[VALIDATOR_MIN_TOMORROW()]}
                        errorText="Please select a valid date."
                    // onInput={inputHandler}
                    />
                </div>


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