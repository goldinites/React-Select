import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class NextPlayer extends React.Component {
    render() {
        const next = this.props.isXPlayer ? this.props.players.x : this.props.players.o;
        if (this.props.mode === 'pvp') {
            return (
                <div className="next-player">
                    Next player <FontAwesomeIcon icon={next.data} />
                </div>
            )
        }
    }
}

export default NextPlayer;
