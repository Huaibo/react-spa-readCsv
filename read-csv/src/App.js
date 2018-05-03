import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div id="board-game" >
          </div>
      </div>
    );
  }
}


function Square(props) {
  return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
  );
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squaresArray: Array(9).fill(null),
      xIsNext: true,
    };
  }
  handleClick(i) {
    const squares = this.state.squaresArray.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({squaresArray: squares,
        xIsNext: !this.state.xIsNext,});

  }
  renderSquare(i) {
    return (<Square value={this.state.squaresArray[i]}
                   onClick={() => this.handleClick(i)}
    />);
  }
  render() {
    const winner = calculateWinner(this.state.squaresArray);
    let status = winner ?'Winner: ' + winner:'Next player:'+ (this.state.xIsNext ? 'X' : 'O');

    return(
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
    );
  }
}

export class Game extends Component {
  render(){
    return(
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
    )
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
export default App;
