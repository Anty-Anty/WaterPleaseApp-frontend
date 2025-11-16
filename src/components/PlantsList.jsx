import React from 'react';

import Plant from './Plant';
import EditPlant from './EditPlant';

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
            {props.plants.map(plant => {

                if (props.editingPlantId === plant.id) {
                    return (
                        <EditPlant
                            key={plant.id}
                            img={plant.img}
                            title={plant.title}
                            logoList={props.plants}
                            lastWateredDate={plant.lastWateredDate}
                            nextWateredDate={plant.nextWateredDate}
                            // plant={plant}
                            closeEditModalHandler={() => props.setEditingPlantId(null)}
                        />
                    )
                }
                return (
                    <Plant
                        key={plant.id}
                        id={plant.id}
                        img={plant.img}
                        title={plant.title}
                        lastWateredDate={plant.lastWateredDate}
                        nextWateredDate={plant.nextWateredDate}
                        mapPosition={plant.mapPosition}

                        setEditingPlantId={props.setEditingPlantId}
                        // showEditModalHandler={()=>props.showEditModalHandler(plant.id)} //pass the edited item Id
                        // showDeleteModalHandler={()=>props.showDeleteModalHandler(plant.id)} //pass the edited item Id
                        showDeleteModalHandler={props.showDeleteModalHandler} //pass the edited item Id
                    />
                )
            })}

        </ul>
    )


};

export default PlantsList;