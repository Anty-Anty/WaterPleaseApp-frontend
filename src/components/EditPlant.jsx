import React, { useState } from 'react';

// import './EditPlant.css';

const EditPlant = props => {

    return (
        <>
            <div className='plants-list-item'>
                    
                            <div>logo</div>
                            <div>input</div>
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