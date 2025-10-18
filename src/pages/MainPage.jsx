import React from "react";

import PlantsList from "../components/PlantsList";

// import "./MainPage.css";

const DUMMY_PLANTS_LIST = [
    {
        id: "1",
        img: "AloeVera",
        title: "Aloe Vera",
        lastWateredDate: "2025-10-18",
        nextWateredDate: "2025-10-19",
        mapPosition: "h1"
    },
    {
        id: "2",
        img: "Palm",
        title: "Palm",
        lastWateredDate: "2025-10-18",
        nextWateredDate: "2025-10-19",
        mapPosition: "h2"
    }
]

const MainPage = props => {

    return (
        <>
            {/* LIST OF PLANTS */}
            <PlantsList
                plants={DUMMY_PLANTS_LIST}
            />
        </>
    )
};

export default MainPage;