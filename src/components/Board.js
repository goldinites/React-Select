import React from "react";
import Cell from "./Cell";

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cells: []
        }

        this.fillCells = this.fillCells.bind(this)
    }

    componentWillMount() {
        this.fillCells();
    }

    fillCells() {
        for (let i = 1; i <= 9; i++) {
            this.setState((state) => {
                state.cells.push({
                    data: '',
                    show: '',
                    used: false,
                    flashlight: false
                })
            })
        }
    }

    render () {
        if (this.props.mode) {
            const cells = [];
            for (const i in this.state.cells) {
                const cell = this.state.cells[i];
                cells.push(<Cell cell={cell} index={i} key={i}/>)
            }

            return (
                <div className="field">
                    {cells}
                </div>
            );
        }
    }
}

export default Board;
