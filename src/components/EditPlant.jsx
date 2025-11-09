import React, { useState } from 'react';

import Input from './FormElements/Input';
import LogoPicker from './LogoPicker';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH } from './util/validators';

import './AddEditPlant.css';

const EditPlant = props => {

    const [showLogoPicker, setShowLogoPicker] = useState(false);

    const showLogoPickerHandler = () => { setShowLogoPicker(prev => !prev); };

    return (
        <>
            <div className='plants-list-item'>

                <div className="add-edit-plant-logo" onClick={showLogoPickerHandler}>
                    logo
                    {showLogoPicker && (
                        <LogoPicker
                        // availableLogos={logoList}
                        // selectedLogo={formData.logo}
                        // onSelect={(logo) => setFormData({ ...formData, logo })}
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