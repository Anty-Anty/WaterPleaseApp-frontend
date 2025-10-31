import React from "react";

import PlantsList from "../components/PlantsList";
import Map from "../components/Map";

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
        id: "2",
        img: "2",
        title: "Palm",
        lastWateredDate: "Sep 18",
        nextWateredDate: "Sep 19",
        mapPosition: "h2"
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
        id: "2",
        img: "2",
        title: "Palm",
        lastWateredDate: "Sep 18",
        nextWateredDate: "Sep 19",
        mapPosition: "h2"
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
        id: "2",
        img: "2",
        title: "Palm",
        lastWateredDate: "Sep 18",
        nextWateredDate: "Sep 19",
        mapPosition: "h2"
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
        id: "2",
        img: "2",
        title: "Palm",
        lastWateredDate: "Sep 18",
        nextWateredDate: "Sep 19",
        mapPosition: "h2"
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
        id: "2",
        img: "2",
        title: "Palm",
        lastWateredDate: "Sep 18",
        nextWateredDate: "Sep 19",
        mapPosition: "h2"
    },
    {
        id: "2",
        img: "2",
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
                    </div>
                </div>
                <div className='map'>
                    <Map />
                </div>
            </div>

        </>
    )
};

export default MainPage;