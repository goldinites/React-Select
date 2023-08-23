import React from "react";
import './App.css'
import Restart from "./components/Restart";

import {library} from "@fortawesome/fontawesome-svg-core";
import {faArrowsRotate, faUser, faComputer, faO, faX} from "@fortawesome/free-solid-svg-icons";
import SetMode from "./components/SetMode";
import Board from "./components/Board";
import NextPlayer from "./components/NextPlayer";

library.add(faArrowsRotate)
library.add(faUser)
library.add(faComputer)
library.add(faO)
library.add(faX)

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lines : [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ],
            players: {
                x: {
                    data: 'x',
                    score: 0
                },
                o: {
                    data: 'o',
                    score: 0
                }
            },
            isXPlayer: true,
            canClick: false,
            mode: '',
            lastWinner: '',
        }

        this.restartGameHandler = this.restartGameHandler.bind(this);
        this.setModeHandler = this.setModeHandler.bind(this);
    }

    restartGameHandler() {
        this.setState({mode: ''})
    }

    setModeHandler(event) {
        this.setState({mode: event})
    }

    render() {
        const currentMode = this.state.mode;

        return (
            <div className="game">
                <div className="game-title">
                    <div className="title">Tic Tac Toe</div>
                    <Restart mode={currentMode} restartGame={this.restartGameHandler}/>
                </div>
                <NextPlayer
                    mode={currentMode}
                    players={this.state.players}
                    isXPlayer={this.state.isXPlayer}
                />
                <Board mode={currentMode} />
                <SetMode mode={currentMode} setMode={this.setModeHandler}/>
            </div>
        );
    }
}

export default App;
