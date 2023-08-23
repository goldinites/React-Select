import React from "react";

class Cell extends React.Component {
    fillCell(index) {

    }

    render() {
        const cell = this.props.cell;

        let cellClass = 'cell'
        if (cell.flashlight) {
            cellClass += ' flashlight'
        }

        return (
            <div className={cellClass} onClick={() => this.fillCell(this.props.index)}>
                <span>{cell.show}</span>
            </div>
        )
    }
}

export default Cell
