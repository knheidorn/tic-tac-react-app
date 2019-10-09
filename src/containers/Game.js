import React, { Component } from 'react'
import Board from './Board'

class Game extends Component {
  constructor(){
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true
    }
  }

  handleClick = (i) => {
    const history = this.state.history
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (this.calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext
    })
  }

  calculateWinner = (squares) => {
    const line = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (let i = 0; i < line.length; i++) {
      let [a, b, c] = line[i]
      if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  render() {
    let history = this.state.history
    let current = history[history.length-1]
    let winner = this.calculateWinner(current.squares)
    let status;

    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <div className="game">
       <div className="game-board">
         <Board
          onClick={this.handleClick}
         />
       </div>
       <div className="game-info">
         <div>{ status }</div>
         <ol>{/* TODO */}</ol>
       </div>
     </div>
    )
  }
}

export default Game
