import React, { useState } from 'react';

import './Plant.css';

const Plant = props => {

    //identifies which plant to show in edit mode
    const isEditing = props.editingPlantId === props.id;

    // --- Helper: safely format YYYY-MM-DD into "Mon 10" ---
    function formatDisplayDate(dateStr, locale = "en-US") {
        if (!dateStr) return "";
        const [y, m, d] = dateStr.split("-").map(Number);
        const date = new Date(y, m - 1, d); // SAFE → no timezone shift
        return date.toLocaleDateString(locale, {
            month: "short",
            day: "numeric",
        });
    }

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
                <div>{formatDisplayDate(props.nextWateredDate)}</div>


                {/* <div className="button-stack">
                            <button onClick={props.showEditModalHandler}>edit</button>
                            <button onClick={props.showDeleteModalHandler}>delete</button>
                        </div> */}

                <div className="plant-button-stack">
                    <button onClick={() => props.setEditingPlantId(props.id)}>✎</button>
                    <button onClick={props.showDeleteModalHandler}>🗑</button>
                </div>


            </li>
        </>
    );
};

export default Plant;