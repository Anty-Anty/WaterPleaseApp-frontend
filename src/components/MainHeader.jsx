import React from "react";

import "./MainHeader.css";

const MainHeader = props => {

    return (
        <header className="main-header">
            <div className="main-header-logo">
                WaterPleaseApp
            </div>

            <div className="main-header-btn">
                edit map
            </div>
        </header>
    )
};

export default MainHeader;