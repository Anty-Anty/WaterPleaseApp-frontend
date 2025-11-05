import React, { useState } from 'react';

import './Plant.css';

const Plant = props => {

    return (
        <>
            <li className='plants-list-item'>
                    
                            <div><img src={`images/plant${props.img}.svg`} alt={`img${props.img}`} className="plant-logo" /></div>
                            <div>{props.title}</div>
                            <div>{props.lastWateredDate}</div>
                            <div>{props.nextWateredDate}</div>
                        

                        {/* <div className="button-stack">
                            <button onClick={props.showEditModalHandler}>edit</button>
                            <button onClick={props.showDeleteModalHandler}>delete</button>
                        </div> */}
                        
                        <div className="plant-button-stack">
                            <button>✎</button>
                            <button onClick={props.showDeleteModalHandler}>🗑</button>
                        </div>

                    
            </li>
        </>
    );
};

export default Plant;