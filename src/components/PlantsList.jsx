import React from 'react';

import Plant from './Plant';

// import './PlantsList.css';


const PlantsList = props => {

    //check if there are plants
    // if (props.items.length === 0) {
    //     return (
    //         <div className='items-list'>
    //              <div className='item'>
    //                 Plants list is empty.
    //             </div>
    //         </div>
    //     );
    // }

    // render list of items

    return (
        <ul >
            {props.plants.map(plant => (
                <Plant
                    key={plant.id}
                    id={plant.id}
                    img={plant.img}
                    title={plant.title}
                    lastWateredDate={plant.lastWateredDate}
                    nextWateredDate={plant.nextWateredDate}
                    mapPosition={plant.mapPosition}
                    // showEditModalHandler={()=>props.showEditModalHandler(plant.id)} //pass the edited item Id
                    // showDeleteModalHandler={()=>props.showDeleteModalHandler(plant.id)} //pass the edited item Id
                    showDeleteModalHandler={()=>props.showDeleteModalHandler()} //pass the edited item Id
                />

            ))}

        </ul>
    )


};

export default PlantsList;