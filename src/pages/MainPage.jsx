import React, { useState, useReducer, useEffect } from "react";

import PlantsList from "../components/PlantsList";
import Map from "../components/Map";

import Modal from '../components/UIElements/Modal';
import AddPlant from "../components/AddPlant";

import "./MainPage.css";

const DUMMY_PLANTS_LIST = [
    {
        id: "1",
        img: "1",
        title: "Aloe Vera",
        lastWateredDate: "2025-09-18",
        nextWateredDate: "2025-09-19",
        mapPosition: "h1"
    },
    {
        id: "2",
        img: "2",
        title: "Palm",
        lastWateredDate: "2025-09-18",
        nextWateredDate: "2025-09-19",
        mapPosition: "h2"
    },
    {
        id: "3",
        img: "3",
        title: "Palm",
        lastWateredDate: "2025-09-18",
        nextWateredDate: "2025-09-19",
        mapPosition: "h2"
    },
    {
        id: "4",
        img: "4",
        title: "Palm",
        lastWateredDate: "2025-09-18",
        nextWateredDate: "2025-09-19",
        mapPosition: "h2"
    },
    {
        id: "5",
        img: "2",
        title: "Palm",
        lastWateredDate: "2025-09-18",
        nextWateredDate: "2025-09-19",
        mapPosition: "h2"
    }

]

const MainPage = props => {

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
                    <Map />
                </div>

            </div>

        </>
    )
};

export default MainPage;