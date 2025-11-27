import React, { useState, useEffect } from 'react';

import Input from './FormElements/Input';
import LogoPicker from './UIElements/LogoPicker';
import CustomDateInput from './UIElements/CustomDateInput';
import NextWaterDateInput from './UIElements/NextWaterDateInput';
import { VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH, VALIDATOR_MAX_TODAY, VALIDATOR_MIN } from './util/validators';
import { useImagesList } from './hooks/ImagesList-hook';


import './AddEditPlant.css';

const EditPlant = props => {

    const logos = useImagesList('plant');
    const wLogos = useImagesList('water');

    //state controles visibility of logoPicker.jsx
    const [showLogoPicker, setShowLogoPicker] = useState(false);
    const openLogoPickerHandler = () => setShowLogoPicker(true);
    const closeLogoPickerHandler = () => setShowLogoPicker(false);

    //state controles visibility of logoPicker.jsx
    const [showWLogoPicker, setShowWLogoPicker] = useState(false);
    const openWLogoPickerHandler = () => setShowWLogoPicker(true);
    const closeWLogoPickerHandler = () => setShowWLogoPicker(false);


    // state stores eaither logo picked in logoPicker.jsx or logo from PlantsList.jsx 
    const [selectedLogo, setSelectedLogo] = useState(props.logo || null);

    const [selectedWLogo, setSelectedWLogo] = useState(props.wLogo || null);

    // state stores lastWateredDated initially recieved from DataBase or everytime its updated in CustomDateInput
    const [lastWateredDate, setLastWateredDate] = useState(props.lastWateredDate || "");

    const dateInputHandler = (id, value, isValid) => {
        if (id === "lastWateredDate") {
            setLastWateredDate(value);
        }
    };

    return (
        <>

            <div className='plants-list-item'>

                {/* plant logo */}
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
                            basename={"plant"}
                            selectedLogo={selectedLogo}
                            onSelect={(logo) => {
                                setSelectedLogo(logo);
                                setShowLogoPicker(false);
                            }}
                        />
                    )}

                </div>
                {/* water level logo*/}
                <div>
                    <div className="add-edit-plant-logo">

                        <img
                            onClick={openWLogoPickerHandler}
                            src={`images/water_${selectedWLogo || props.wLevel}.svg`}
                            alt={`water_${selectedWLogo || props.wLevel}`}
                            className="wLevel-logo"
                        />


                        {showWLogoPicker && (
                            <LogoPicker
                                show={showWLogoPicker}
                                onCancel={closeWLogoPickerHandler}
                                availableLogos={wLogos}
                                basename={"water"}
                                selectedLogo={selectedWLogo}
                                onSelect={(wLogo) => {
                                    setSelectedWLogo(wLogo);
                                    setShowWLogoPicker(false);
                                }}
                            />
                        )}

                    </div>
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
                        initialValue={lastWateredDate}
                        validators={[VALIDATOR_MAX_TODAY()]}
                        errorText="Please select a valid date."
                        onInput={dateInputHandler}
                    />
                </div>

                {/* Next Watering Date */}
                <div>
                    <NextWaterDateInput
                        id="nextWaterDate"
                        placeholder="Select date"
                        nextWateredDate={props.nextWateredDate}
                        lastWateredDate={lastWateredDate}
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(1)]}
                        errorText="Please enter at least 1 day."
                    // onInput={props.inputHandler} 
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