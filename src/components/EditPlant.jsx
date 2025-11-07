import React, { useState } from 'react';

import Input from './FormElements/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH } from './util/validators';

// import './EditPlant.css';

const EditPlant = props => {

    return (
        <>
            <div className='plants-list-item'>
                    
                            <div>logo</div>
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
                            <div>input</div>
                            <div>input</div>
                        

                        {/* <div className="button-stack">
                            <button onClick={props.showEditModalHandler}>edit</button>
                            <button onClick={props.showDeleteModalHandler}>delete</button>
                        </div> */}
                        
                        <div className="add-plant-button-stack">
                            <button>✔</button>
                            <button onClick={props.closeEditModalHandler}>✖</button>
                        </div>                    
            </div>
        </>
    );
};

export default EditPlant;