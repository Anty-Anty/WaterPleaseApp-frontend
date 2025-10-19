import React, { useState } from 'react';

// import './Plant.css';

const Plant = props => {

    return (
        <>
            <li className='item'>
                    <div className='item__text'>
                        <div className='item__info'>
                            <div><img src={`images/plant${props.img}.svg`} alt={`img${props.img}`} className="???" /></div>
                            <div>{props.title}</div>
                            <div>{props.lastWateredDate}</div>
                            <div>{props.nextWateredDate}</div>
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