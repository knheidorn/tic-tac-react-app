import React, { Component } from 'react'
import Board from './Board'

class Game extends Component {
  constructor(){
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      setCounter: 0
    }
  }

  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.setCounter + 1)
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
      xIsNext: !this.state.xIsNext,
      setCounter: history.length
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  jumpTo = (move) => {
    this.setState({
      setCounter: move,
      xIsNext: (move % 2) === 0
    })
  }

  render() {
    let history = this.state.history
    let current = history[this.state.setCounter]
    let winner = this.calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      const description = move ?
        'Go to move #' + move :
        'Go to start of game'
      return (
        <li key={ move }>
          <button onClick={ () => this.jumpTo(move) }>
            {description}
          </button>
        </li>
      )
    })

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
          squares={current.squares}
         />
       </div>
       <div className="game-info">
         <div>{ status }</div>
         <ol>{ moves }</ol>
       </div>
     </div>
    )
  }
}

export default Game
