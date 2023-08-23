import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class SetMode extends React.Component {
    setMode(mode) {
        this.props.setMode(mode)
    }

    render() {
        if (!this.props.mode) {
            return (
                <div className="choose-mode">
                    <div className="choose-mode-item" onClick={() => this.setMode('pvp')}>
                        <FontAwesomeIcon icon={"user"}/>
                        <span>vs</span>
                        <FontAwesomeIcon icon={"user"}/>
                    </div>
                    <div className="choose-mode-item" onClick={() => this.setMode('pve')}>
                        <FontAwesomeIcon icon={"user"}/>
                        <span>vs</span> 
                        <FontAwesomeIcon icon={"computer"}/>
                    </div>
                </div>
            );
        }
    }
}

export default SetMode;
