import React, { useState, useReducer, useEffect } from "react";

import PlantsList from "../components/PlantsList";
import Map from "../components/Map";

import Modal from '../components/UIElements/Modal';

import "./MainPage.css";

const DUMMY_PLANTS_LIST = [
    {
        id: "1",
        img: "1",
        title: "Aloe Vera",
        lastWateredDate: "Sep 18",
        nextWateredDate: "Sep 19",
        mapPosition: "h1"
    },
    {
        id: "2",
        img: "2",
        title: "Palm",
        lastWateredDate: "Sep 18",
        nextWateredDate: "Sep 19",
        mapPosition: "h2"
    },
    {
        id: "3",
        img: "3",
        title: "Palm",
        lastWateredDate: "Sep 18",
        nextWateredDate: "Sep 19",
        mapPosition: "h2"
    },
    {
        id: "4",
        img: "4",
        title: "Palm",
        lastWateredDate: "Sep 18",
        nextWateredDate: "Sep 19",
        mapPosition: "h2"
    },
    {
        id: "5",
        img: "2",
        title: "Palm",
        lastWateredDate: "Sep 18",
        nextWateredDate: "Sep 19",
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
                            <div>last</div>
                            <div>next</div>
                            <div></div>
                        </div>

                        <PlantsList
                            plants={DUMMY_PLANTS_LIST}
                        />

                        {/* ADD ITEM */}
                        <Modal
                            show={showAddItem}
                            onCancel={closeAddModalHandler}
                            footer={
                                <>
                                    <button type="button" >delete</button>
                                    <button type="button" onClick={closeAddModalHandler}>cancel</button>
                                </>
                            }
                        >
                            <p>Please confirm deletion.</p>
                        </Modal>


                        {!showAddItem && <div className='plants-list-item'>
                            <button className='add-plant-btn' onClick={showAddModalHandler}>
                                add plant
                            </button>
                        </div>
                        }

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