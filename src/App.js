import { Component } from "react";
import Board from "./Board.js";
import Info from "./Info.js";

let ALL = [
    "Get to 7-10",
    "Genocide the BM without any explosions",
    "Find the BM without Udjad",
    "Go to eggplant world",
    "Do bubble skip",
    "Millionaire",
    "Complete the game hitless",
    "Low%",
    "No%",
    "Any%",
    "Sunken City%",
    "No Gold",
    "Pacifist",
    "Pacifist Low%",
    "Finish the game in 5m",
    "Sacrifice yourself",
    "Get killed by HH",
    "Turkey%",
    "Axolotl%",
    "Complete the tutorial under 20s",
    "Crush all characters",
    "Keyamat",
    "No TP Any%",
    "No TP Sunken",
    "No Gold Low%",
    "Chain Abzu",
    "Chain Duat",
    "Rescue the pet in every level",
    "Kill all shopkeepers",
    "Kill everything",

];
const seed = window.location.hash;
Math.seedrandom(seed || Math.random());
let _tasks = [];
for (let i = 0; i < 25; i++) {
    let _index = Math.floor(Math.random() * ALL.length);
    _tasks.push({ name: ALL[_index], done: false });
    ALL.splice(_index, 1);
}

class App extends Component {
    state = {
        won: false,
        tasks: [
            ..._tasks
        ],
    };

    handleClick = (index) => {
        let tasks = this.state.tasks;
        tasks[index].done = !tasks[index].done;
        this.setState({ tasks: tasks });

        let lines = 0;
        for (let i = 0; i < WINS.length; i++) {
            const [a, b, c, d, e] = WINS[i];
            if (
                this.state.tasks[a].done &&
                this.state.tasks[b].done &&
                this.state.tasks[c].done &&
                this.state.tasks[d].done &&
                this.state.tasks[e].done
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
