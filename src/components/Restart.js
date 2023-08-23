import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Restart extends React.Component {
    render() {
        if (this.props.mode) {
            return (
                <div className="restart" onClick={this.props.restartGame}>
                    <FontAwesomeIcon icon={"arrows-rotate"} />
                </div>
            )
        }
    }
}

export default Restart;
