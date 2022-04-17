import { Component } from "react";
import Board from "./Board.js";
import Info from "./Info.js";
import {TASKS} from "./tasks.js";

let ALL = TASKS

const seed = window.location.hash;
Math.seedrandom(seed || Math.random());
let _tasks = [];
for (let i = 0; i < 25; i++) {
    let _index = Math.floor(Math.random() * ALL.length);
    _tasks.push({ name: ALL[_index], state: 0 });
    ALL.splice(_index, 1);
}

class App extends Component {
    state = {
        won: false,
        tasks: _tasks,
    };

    handleClick = (index) => {
        let tasks = this.state.tasks;
        tasks[index].state = (tasks[index].state + 1) % 3;
        this.setState({ tasks: tasks });

        let lines = 0;
        for (let i = 0; i < WINS.length; i++) {
            const [a, b, c, d, e] = WINS[i];
            if (
                this.state.tasks[a].state === 1 &&
                this.state.tasks[b].state === 1 &&
                this.state.tasks[c].state === 1 &&
                this.state.tasks[d].state === 1 &&
                this.state.tasks[e].state === 1
            ) {
                lines++;
            }
        }
        console.log(lines);
        this.setState({ won: lines >= 3 });
    };
    render() {
        return (
            <div className="App">
                <br></br>
                <h1>BingoLunky</h1>
                <br></br>
                <Board tasks={this.state.tasks} toggleTask={this.handleClick} />
                <Info won={this.state.won} />
            </div>
        );
    }
}

export default App;

const WINS = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
];
