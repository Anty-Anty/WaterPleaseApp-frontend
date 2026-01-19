import React, { useState } from 'react';

import { formatDisplayDate, addDays } from "./util/days";
import './Plant.css';

const Plant = props => {

    //identifies which plant to show in edit mode
    const isEditing = props.editingPlantId === props.id;



    return (
        <>
            <li className='plants-list-item'>

                <div className="container-plant-logo">
                    <img src={`images/plant_${props.img}.svg`} alt={`plant_${props.img}`} className="plant-logo" />
                </div>
                <div className="container-plant-logo">
                    <img src={`images/water_${props.wLevel}.svg`} alt={`plant_${props.wLevel}`} className="wLevel-logo" />
                </div>
                <div>{props.title}</div>
                <div>{formatDisplayDate(props.lastWateredDate)}</div>
                <div>{addDays(props.lastWateredDate, props.daysToNextWatering)}</div>


                {/* <div className="button-stack">
                            <button onClick={props.showEditModalHandler}>edit</button>
                            <button onClick={props.showDeleteModalHandler}>delete</button>
                        </div> */}

                <div className="plant-button-stack">
                    <button onClick={() => props.setEditingPlantId(props.id)}>✎</button>
                    <button onClick={() => props.showDeleteModalHandler(props.id)}>🗑</button>
                </div>


            </li>
        </>
    );
};

export default Plant;