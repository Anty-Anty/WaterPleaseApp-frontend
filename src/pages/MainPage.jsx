import React, { useState, useReducer, useEffect } from "react";

import PlantsList from "../components/PlantsList";
import Map from "../components/Map";
import Modal from "../components/UIElements/Modal";
import AddPlant from "../components/AddPlant";
import EditMap from "../components/EditMap";
import LoadingSpinner from '../components/UIElements/LoadingSpinner';
import ErrorModal from '../components/UIElements/ErrorModal';
import { useHttpClient } from '../components/hooks/http-hook';

import "./MainPage.css";


const DUMMY_PLANTS_LIST = [
    {
        id: "1",
        img: "1",
        wLevel: "1",
        title: "Aloe Vera",
        lastWateredDate: "2025-12-13",
        daysToNextWatering: "2",
        mapPosition: null,
    },
    {
        id: "2",
        img: "2",
        wLevel: "2",
        title: "Palm",
        lastWateredDate: "2025-09-18",
        daysToNextWatering: "1",
        mapPosition: null,
    },
    {
        id: "3",
        img: "3",
        wLevel: "3",
        title: "Palm",
        lastWateredDate: "2025-09-18",
        daysToNextWatering: "1",
        mapPosition: null,
    },
    {
        id: "4",
        img: "4",
        wLevel: "1",
        title: "Palm",
        lastWateredDate: "2025-09-18",
        daysToNextWatering: "1",
        mapPosition: null,
    },
    {
        id: "5",
        img: "2",
        wLevel: "1",
        title: "Palm",
        lastWateredDate: "2025-09-18",
        daysToNextWatering: "1",
        mapPosition: null,
    },
    {
        id: "6",
        img: "2",
        wLevel: "1",
        title: "Palm",
        lastWateredDate: "2025-09-18",
        daysToNextWatering: "1",
        mapPosition: null,
    },
    {
        id: "7",
        img: "2",
        wLevel: "1",
        title: "Palm",
        lastWateredDate: "2025-09-18",
        daysToNextWatering: "1",
        mapPosition: null,
    },
    {
        id: "8",
        img: "2",
        wLevel: "1",
        title: "Palm",
        lastWateredDate: "2025-09-18",
        daysToNextWatering: "1",
        mapPosition: null,
    },
    {
        id: "9",
        img: "2",
        wLevel: "1",
        title: "Palm",
        lastWateredDate: "2025-09-18",
        daysToNextWatering: "1",
        mapPosition: null,
    },
    {
        id: "10",
        img: "2",
        wLevel: "1",
        title: "Palm",
        lastWateredDate: "2025-09-18",
        daysToNextWatering: "1",
        mapPosition: null,
    },
];

const DUMMY_MAP = {
    columnsNumber: 6,
    selectedSquares: [],
};

const MainPage = (props) => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    // ADD ITEM
    // state controls visibility of AddItem.jsx
    const [showAddItem, setShowAddItem] = useState(false);

    const showAddModalHandler = () => {
        setShowAddItem(true);
    };
    const closeAddModalHandler = () => {
        setShowAddItem(false);
    };

    // updating UI: new item is added locally to state without reset of the scroll position
    // const handleItemAdded = (newItem) => {
    //     setLoadedItems((prevItems) => [...prevItems, newItem]);
    // };

    // EDIT ITEM.
    // store the ID of the plant currently being edited
    const [editingPlantId, setEditingPlantId] = useState(null);

    // updating UI: updated items added localy to state to reflect changes immidietly
    // const handleItemUpdated = (updatedItem) => {
    //     setLoadedItems(prevItems =>
    //         prevItems.map(item =>
    //             item.id === updatedItem.id ? updatedItem : item
    //         )
    //     );
    // };

    const upsertPlantHandler = (plantData) => {
        setPlants((prevPlants) => {
            const exists = prevPlants.some(p => p.id === plantData.id);

            if (exists) {
                // UPDATE
                return prevPlants.map(p =>
                    p.id === plantData.id ? { ...p, ...plantData } : p
                );
            }

            // ADD
            return [...prevPlants, plantData];
        });
    };

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
    const [selectedSquares, setSelectedSquares] = useState(
        DUMMY_MAP.selectedSquares
    );

    // local temp editing state
    const [tempSelectedSquares, setTempSelectedSquares] =
        useState(selectedSquares);

    //FETCHING PLANTS FROM DATABASE:
    const [plants, setPlants] = useState([]);



    useEffect(() => {
        //async is not used directly in useEffect. 
        const fetchItems = async () => {
            try {
                const responseData = await sendRequest(
                    `${import.meta.env.VITE_BACKEND_URL}/api/plants`,
                    'GET',
                    null
                );
                setPlants(responseData.plantsList);
            } catch (err) { }
        };
        fetchItems();
    }, [sendRequest]);

    const squareClickHandler = (squareId) => {
        setTempSelectedSquares(
            (prev) =>
                prev.includes(squareId)
                    ? prev.filter((id) => id !== squareId) // unselect
                    : [...prev, squareId] // select
        );
    };

    //MAIN MAP STATE UPDATES HERE:
    const submitMapHandler = () => {
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

    // DROP → update plant.mapPosition
    const plantDropHandler = (squareIndex, plantId) => {
        setPlants((prev) =>
            prev.map((plant) => {
                if (plant.id === plantId) {
                    return { ...plant, mapPosition: squareIndex };
                }
                if (plant.mapPosition === squareIndex) {
                    return { ...plant, mapPosition: null }; // collision handling
                }
                return plant;
            })
        );
    };

    // REMOVE → clear plant.mapPosition
    const removePlantFromSquare = (squareIndex) => {
        setPlants((prevPlants) =>
            prevPlants.map((plant) =>
                plant.mapPosition === squareIndex
                    ? { ...plant, mapPosition: null }
                    : plant
            )
        );
    };

    //JSX
    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <div className='center'><LoadingSpinner /></div>}

            <div className="main-container">
                {/* LIST OF PLANTS */}
                <div className="plants-list">
                    <div className="plants-list-container">
                        <div className="plants-list-item">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div>last</div>
                            <div>next</div>
                            <div></div>
                        </div>

                        <PlantsList
                            plants={plants}
                            editingPlantId={editingPlantId}
                            setEditingPlantId={setEditingPlantId}
                            showDeleteModalHandler={showDeleteModalHandler}
                            onUpdatePlant={upsertPlantHandler}
                        //  closeEditModalHandler={closeEditModalHandler}
                        />

                        {/* ADD ITEM */}

                        {!showAddItem && (
                            <div className="plants-list-item">
                                <button className="add-plant-btn" onClick={showAddModalHandler}>
                                    add plant
                                </button>
                            </div>
                        )}

                        {showAddItem && (
                            <AddPlant
                                onSavePlant={upsertPlantHandler}
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
                                    <button type="button">delete</button>
                                    <button type="button" onClick={closeDeleteModalHandler}>
                                        cancel
                                    </button>
                                </>
                            }
                        >
                            <p>Please confirm deletion.</p>
                        </Modal>
                    </div>
                </div>

                {/* MAP */}
                <div className="map">
                    {showEditMap ? (
                        <EditMap
                            plants={plants}
                            DUMMY_MAP={DUMMY_MAP}
                            selectedSquares={tempSelectedSquares}
                            squareClickHandler={squareClickHandler}
                            submitMapHandler={submitMapHandler}
                            mapCancelHandler={mapCancelHandler}
                            mapResetHandler={mapResetHandler}
                            //drag&drop:
                            onPlantDrop={plantDropHandler}
                            onRemovePlant={removePlantFromSquare}
                        />
                    ) : (
                        <Map
                            plants={plants}
                            selectedSquares={selectedSquares}
                            showEditMapHandler={showEditMapHandler}
                            DUMMY_MAP={DUMMY_MAP}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default MainPage;
