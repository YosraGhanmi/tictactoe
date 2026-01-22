/**
 * Tic Tac Toe Game Logic
 * Handles game state, move validation, and win detection
 */

export default class TicTacToeGame {
  private board: (string | null)[]
  private xIsNext: boolean
  private mode: 'classic' | 'overwrite' | 'moving'

  // Win conditions: all possible winning lines (rows, columns, diagonals)
  private static readonly WINNING_LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  constructor(mode: 'classic' | 'overwrite' | 'moving' = 'classic') {
    this.board = Array(9).fill(null)
    this.xIsNext = true
    this.mode = mode
  }

  /**
   * Make a move at the given cell index
   * Returns a new game state (immutable pattern)
   */
  makeMove(index: number): TicTacToeGame {
    // Validate move is within bounds
    if (index < 0 || index > 8) return this

    const cellValue = this.board[index]

    // Classic mode: cannot move on occupied cell
    if (this.mode === 'classic' && cellValue !== null) {
      return this
    }

    // Overwrite mode: cannot move on own piece (but can overwrite opponent)
    if (this.mode === 'overwrite') {
      const currentPlayer = this.xIsNext ? 'X' : 'O'
      if (cellValue === currentPlayer) {
        return this
      }
    }

    // Moving mode: same rules as classic
    if (this.mode === 'moving' && cellValue !== null) {
      return this
    }

    // Create new game state
    const newGame = new TicTacToeGame(this.mode)
    newGame.board = [...this.board]
    newGame.xIsNext = this.xIsNext
    newGame.board[index] = this.xIsNext ? 'X' : 'O'
    newGame.xIsNext = !this.xIsNext

    return newGame
  }

  /**
   * Get current board state
   */
  getBoard(): (string | null)[] {
    return [...this.board]
  }

  /**
   * Check if it's X's turn
   */
  isXNext(): boolean {
    return this.xIsNext
  }

  /**
   * Check if there's a winner
   * Returns 'X', 'O', or null
   */
  getWinner(): string | null {
    for (const [a, b, c] of TicTacToeGame.WINNING_LINES) {
      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        return this.board[a]
      }
    }
    return null
  }

  /**
   * Get winning line indices
   * Returns [0, 1, 2] if first row is winning, null if no winner
   */
  getWinningLine(): number[] | null {
    for (const line of TicTacToeGame.WINNING_LINES) {
      const [a, b, c] = line
      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        return line
      }
    }
    return null
  }

  /**
   * Check if board is full (draw condition)
   */
  isDraw(): boolean {
    return this.board.every((cell) => cell !== null) && !this.getWinner()
  }

  /**
   * Check if game is over (winner or draw)
   */
  isGameOver(): boolean {
    return this.getWinner() !== null || this.isDraw()
  }
}
