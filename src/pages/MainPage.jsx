import React from "react";

import PlantsList from "../components/PlantsList";
import Map from "../components/Map";

import "./MainPage.css";

const DUMMY_PLANTS_LIST = [
    {
        id: "1",
        img: "11",
        title: "Aloe Vera",
        lastWateredDate: "Sep 18",
        nextWateredDate: "Sep 19",
        mapPosition: "h1"
    },
    {
        id: "2",
        img: "22",
        title: "Palm",
        lastWateredDate: "Sep 18",
        nextWateredDate: "Sep 19",
        mapPosition: "h2"
    }
]

const MainPage = props => {

    return (
        <>
            {/* LIST OF PLANTS */}

            <div className="main-container">

                <div className='plants-list'>
                    <div className="plants-list-table">
                        <div>logo</div>
                        <div>name</div>
                        <div>last</div>
                        <div>next</div>
                        <div></div>
                    </div>
                    <PlantsList 
                        plants={DUMMY_PLANTS_LIST}
                    />
                </div>
                <div className='map'>
                    <Map />
                </div>
            </div>

        </>
    )
};

export default MainPage;