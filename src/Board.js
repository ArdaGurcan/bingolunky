import { Component } from "react";

class Board extends Component {
  render() {
    // console.log(this.props)
      let cells = this.props.tasks.map((task, i) => {
          return (
              <div
                  key={i}
                  className={"cell " + (task.state === 2 ? "ignored": "") + (task.state === 1 ? "done": "")}
                  onClick={() => this.props.toggleTask(i)}
              >
                  {task.name}
              </div>
          );
      });
        return <div className="grid">{cells}</div>;
    }
}

export default Board;
