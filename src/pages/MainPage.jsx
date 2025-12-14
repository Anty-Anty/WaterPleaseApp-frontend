import React, { useState, useReducer, useEffect } from "react";

import PlantsList from "../components/PlantsList";
import Map from "../components/Map";

import Modal from '../components/UIElements/Modal';
import AddPlant from "../components/AddPlant";

import "./MainPage.css";
import EditMap from "../components/EditMap";

const DUMMY_PLANTS_LIST = [
    {
        id: "1",
        img: "1",
        wLevel: "1",
        title: "Aloe Vera",
        lastWateredDate: "2025-09-18",
        daysToNextWatering: "1",
        mapPosition: "h1"
    },
    {
        id: "2",
        img: "2",
        wLevel: "2",
        title: "Palm",
        lastWateredDate: "2025-09-18",
        daysToNextWatering: "1",
        mapPosition: "h2"
    },
    {
        id: "3",
        img: "3",
        wLevel: "3",
        title: "Palm",
        lastWateredDate: "2025-09-18",
        daysToNextWatering: "1",
        mapPosition: "h2"
    },
    {
        id: "4",
        img: "4",
        wLevel: "1",
        title: "Palm",
        lastWateredDate: "2025-09-18",
        daysToNextWatering: "1",
        mapPosition: "h2"
    },
    {
        id: "5",
        img: "2",
        wLevel: "1",
        title: "Palm",
        lastWateredDate: "2025-09-18",
        daysToNextWatering: "1",
        mapPosition: "h2"
    },
    {
        id: "6",
        img: "2",
        wLevel: "1",
        title: "Palm",
        lastWateredDate: "2025-09-18",
        daysToNextWatering: "1",
        mapPosition: "h2"
    },
    {
        id: "7",
        img: "2",
        wLevel: "1",
        title: "Palm",
        lastWateredDate: "2025-09-18",
        daysToNextWatering: "1",
        mapPosition: "h2"
    },
    {
        id: "8",
        img: "2",
        wLevel: "1",
        title: "Palm",
        lastWateredDate: "2025-09-18",
        daysToNextWatering: "1",
        mapPosition: "h2"
    }

]


const DUMMY_MAP = {
    columnsNumber: 8,
    squares: {
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0, 21: 0, 22: 0, 23: 0, 24: 0, 25: 0, 26: 0, 27: 0, 28: 0, 29: 0, 30: 0, 31: 0, 32: 0, 33: 0, 34: 0, 35: 0, 36: 0, 37: 0, 38: 0, 39: 0, 40: 0, 41: 0, 42: 0, 43: 0, 44: 0, 45: 0, 46: 0, 47: 0, 48: 0, 49: 0, 50: 0, 51: 0, 52: 0, 53: 0, 54: 0, 55: 0, 56: 0, 57: 0, 58: 0, 59: 0, 60: 0, 61: 0, 62: 0, 63: 0, 64: 0
    },
    selectedSquares: [20, 21, 28, 29]
}

const MainPage = props => {

    const [dummyMap, setDummyMap] = useState(DUMMY_MAP);


    // ADD ITEM
    // state controls visibility of AddItem.jsx
    const [showAddItem, setShowAddItem] = useState(false);

    const showAddModalHandler = () => { setShowAddItem(true) };
    const closeAddModalHandler = () => { setShowAddItem(false) };

    // updating UI: new item is added locally to state without reset of the scroll position 
    // const handleItemAdded = (newItem) => {
    //     setLoadedItems((prevItems) => [...prevItems, newItem]);
    // };

    // EDIT ITEM.
    // state controls visibility of EditItem.jsx
    const [showEditItem, setShowEditItem] = useState(false);
    // store the ID of the plant currently being edited
    const [editingPlantId, setEditingPlantId] = useState(null);

    const showEditModalHandler = () => {
        setShowEditItem(true);
    };

    const closeEditModalHandler = () => {
        setShowEditItem(false);
    };

    // updating UI: updated items added localy to state to reflect changes immidietly
    // const handleItemUpdated = (updatedItem) => {
    //     setLoadedItems(prevItems =>
    //         prevItems.map(item =>
    //             item.id === updatedItem.id ? updatedItem : item
    //         )
    //     );
    // };

    // DELETE ITEM confirmation.
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const showDeleteModalHandler = () => {
        setShowDeleteModal(true);
    };

    const closeDeleteModalHandler = () => {
        setShowDeleteModal(false);
    };

    // MAP
    // map state toggle
    const [showEditMap, setShowEditMap] = useState(false);

    const showEditMapHandler = () => {
        setTempSelectedSquares(selectedSquares); // copy current map
        setShowEditMap(true);
    };

    // const closeEditMapHandler = () => {
    //     setShowEditMap(false);
    // };

    // main map state
    const [selectedSquares, setSelectedSquares] = useState(DUMMY_MAP.selectedSquares);

    // local temp editing state
    const [tempSelectedSquares, setTempSelectedSquares] = useState(selectedSquares);

    const squareClickHandler = (squareId) => {
        setTempSelectedSquares(prev =>
            prev.includes(squareId)
                ? prev.filter(id => id !== squareId)   // unselect
                : [...prev, squareId]                  // select
        );
    };

    const mapSaveHandler = () => {
        setSelectedSquares(tempSelectedSquares);
        setShowEditMap(false);
    };

    const mapCancelHandler = () => {
        setTempSelectedSquares(selectedSquares); // reset to original
        setShowEditMap(false);
    };

    const mapResetHandler = () => {
        setTempSelectedSquares([]);
    };

    //drag&drop:
    const plantDropHandler = (squareIndex, plantImg) => {
        setTempSelectedSquares(prev => prev); // unchanged

        setDummyMap(prev => ({
            ...prev,
            squares: {
                ...prev.squares,
                [squareIndex]: plantImg
            }
        }));
    };

    const removePlantFromSquare = (squareIndex) => {
        setDummyMap(prev => ({
            ...prev,
            squares: {
                ...prev.squares,
                [squareIndex]: 0
            }
        }));
    };


    //JSX
    return (
        <>

            <div className="main-container">

                {/* LIST OF PLANTS */}
                <div className='plants-list'>
                    <div className='plants-list-container'>
                        <div className="plants-list-item">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div>last</div>
                            <div>next</div>
                            <div></div>
                        </div>

                        <PlantsList
                            plants={DUMMY_PLANTS_LIST}
                            editingPlantId={editingPlantId}
                            setEditingPlantId={setEditingPlantId}
                            showDeleteModalHandler={showDeleteModalHandler}
                        />

                        {/* ADD ITEM */}

                        {!showAddItem && <div className='plants-list-item'>
                            <button className='add-plant-btn' onClick={showAddModalHandler}>
                                add plant
                            </button>
                        </div>
                        }

                        {showAddItem && (
                            <AddPlant
                                closeAddModalHandler={closeAddModalHandler}
                            />
                        )}

                        {/* EDIT ITEM */}

                        {/* CONFIRATION TO DELETE ITEM */}
                        <Modal
                            show={showDeleteModal}
                            onCancel={closeDeleteModalHandler}
                            footer={
                                <>
                                    <button type="button" >delete</button>
                                    <button type="button" onClick={closeDeleteModalHandler}>cancel</button>
                                </>
                            }
                        >
                            <p>Please confirm deletion.</p>
                        </Modal>

                    </div>
                </div>

                {/* MAP */}
                <div className='map'>
                    {showEditMap ?
                        <EditMap
                            plants={DUMMY_PLANTS_LIST}
                            DUMMY_MAP={dummyMap}
                            selectedSquares={tempSelectedSquares}
                            squareClickHandler={squareClickHandler}
                            mapSaveHandler={mapSaveHandler}
                            mapCancelHandler={mapCancelHandler}
                            mapResetHandler={mapResetHandler}
                            //drag&drop:
                            onPlantDrop={plantDropHandler}
                            onRemovePlant={removePlantFromSquare}
                        />
                        :
                        <Map
                            selectedSquares={selectedSquares}
                            showEditMapHandler={showEditMapHandler}
                            DUMMY_MAP={dummyMap}
                        />
                    }
                </div>

            </div>

        </>
    )
};

export default MainPage;