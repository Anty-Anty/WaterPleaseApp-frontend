import React, { useState } from 'react';

// import './Plant.css';

const Plant = props => {

    return (
        <>
            <li className='item'>
                    <div className='item__text'>
                        <div className='item__info'>
                            <h2>{props.title}</h2>
                            <p>{props.lastWateredDate}</p>
                            <p>{props.nextWateredDate}</p>
                        </div>

                        {/* <div className="button-stack">
                            <button onClick={props.showEditModalHandler}>edit</button>
                            <button onClick={props.showDeleteModalHandler}>delete</button>
                        </div> */}

                    </div>
            </li>
        </>
    );
};

export default Plant;