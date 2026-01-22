'use client'

import { useState, useEffect, useRef } from 'react'
import TicTacToeGame from '@/lib/game-logic'
import GameCell from './GameCell'

interface GameBoardProps {
  mode: 'classic' | 'overwrite' | 'moving'
  onGameOver: (winner: string | null, isDraw: boolean) => void
  onBackToMenu: () => void
}

export default function GameBoard({ mode, onGameOver, onBackToMenu }: GameBoardProps) {
  const [game, setGame] = useState(() => new TicTacToeGame(mode))
  const [boardOffset, setBoardOffset] = useState({ x: 0, y: 0 })

  // Animation refs (do NOT trigger re-renders)
  const animationRef = useRef<number | null>(null)
  const directionRef = useRef<1 | -1>(1)

  /* ================================
     MOVING BOARD ANIMATION
     ================================ */
  useEffect(() => {
    if (mode !== 'moving') return

    const moveBoard = () => {
      setBoardOffset((prev) => {
        const maxX = 150
        const speed = 2.5

        let newX = prev.x + directionRef.current * speed

        if (newX >= maxX || newX <= -maxX) {
          directionRef.current *= -1
        }

        return { x: newX, y: 0 }
      })

      animationRef.current = requestAnimationFrame(moveBoard)
    }

    animationRef.current = requestAnimationFrame(moveBoard)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [mode])

  /* ================================
     GAME LOGIC
     ================================ */
  const handleCellClick = (index: number) => {
    if (game.isGameOver()) return

    const newGame = game.makeMove(index)
    setGame(newGame)

    if (newGame.isGameOver()) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      onGameOver(newGame.getWinner(), newGame.isDraw())
    }
  }

  const handleRetry = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    directionRef.current = 1
    setBoardOffset({ x: 0, y: 0 })
    setGame(new TicTacToeGame(mode))
  }

  const winner = game.getWinner()
  const isDraw = game.isDraw()
  const winningLine = game.getWinningLine()

  const modeLabel = {
    classic: 'Classic Mode',
    overwrite: 'Overwrite Mode',
    moving: 'Moving Board',
  }

  /* ================================
     RENDER
     ================================ */
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {modeLabel[mode]}
        </h2>

        {!winner && !isDraw && (
          <p className="text-xl font-semibold text-slate-300">
            Current Player:{' '}
            <span
              className={`text-2xl font-bold ${
                game.isXNext() ? 'text-blue-400' : 'text-red-400'
              }`}
            >
              {game.isXNext() ? 'X' : 'O'}
            </span>
          </p>
        )}
      </div>

      {/* Game Board */}
      <div
        className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border-2 border-purple-500/50 shadow-2xl mx-auto w-fit transition-transform duration-75 backdrop-blur"
        style={{
          transform: `translate(${boardOffset.x}px, ${boardOffset.y}px)`,
        }}
      >
        <div className="grid grid-cols-3 gap-4 w-96 h-96">
          {game.getBoard().map((cell, index) => (
            <GameCell
              key={index}
              value={cell}
              index={index}
              onClick={() => handleCellClick(index)}
              disabled={game.isGameOver()}
              isWinningCell={winningLine?.includes(index) ?? false}
            />
          ))}
        </div>
      </div>

      {/* Back Button */}
      {!winner && !isDraw && (
        <button
          onClick={onBackToMenu}
          className="w-full py-3 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg"
        >
          Back to Menu
        </button>
      )}
    </div>
  )
}
