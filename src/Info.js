import { Component } from "react";

class Info extends Component {
    render() {
        return (
            <div className="App">
                <br />
                <h1>{this.props.won ? "You Win!" : ""}</h1>
            </div>
        );
    }
}

export default Info;
