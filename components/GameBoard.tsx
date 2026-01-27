'use client'

import { useState, useEffect, useRef } from 'react'
import TicTacToeGame from '@/lib/game-logic'
import GameCell from './GameCell'

interface GameBoardProps {
  mode: 'classic' | 'overwrite' | 'moving'
  onGameOver: (winner: string | null, isDraw: boolean) => void
  onBackToMenu: () => void
  startsWithX: boolean
}

export default function GameBoard({
  mode,
  onGameOver,
  onBackToMenu,
  startsWithX,
}: GameBoardProps) {
  const [game, setGame] = useState(() => new TicTacToeGame(mode, startsWithX))
  const [boardOffset, setBoardOffset] = useState({ x: 0, y: 0 })

  // Update game when startsWithX changes
  useEffect(() => {
    setGame(new TicTacToeGame(mode, startsWithX))
  }, [mode, startsWithX])

  // Animation refs
  const animationRef = useRef<number | null>(null)
  const directionRef = useRef<1 | -1>(1)

  /* ================================
     MOVING BOARD ANIMATION
     ================================ */
  useEffect(() => {
    if (mode !== 'moving') return

    const moveBoard = () => {
      setBoardOffset((prev) => {
        const maxX = 160
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
    <div className="space-y-12 relative pt-0">
      {/* Back Button - Very Top Left Corner */}
      {!winner && !isDraw && (
        <button
          onClick={onBackToMenu}
          className="fixed top-4 left-4 px-3 py-2 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg z-50"
        >
          ← Menu
        </button>
      )}

      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {modeLabel[mode]}
        </h2>

        {!winner && !isDraw && (
          <p className="text-xl font-semibold text-slate-300">
            Current Player:{' '}
            <span
              className={`text-3xl font-bold ${
                game.isXNext() ? 'text-red-400' : 'text-blue-400'
              }`}
            >
              {game.isXNext() ? 'X' : 'O'}
            </span>
          </p>
        )}
      </div>

      {/* Game Board */}
      <div
        className="
          mx-auto -mt-2
          bg-gradient-to-br from-slate-900 to-slate-800
          p-10 rounded-3xl
          border-2 border-purple-500/50
          shadow-2xl
          transition-transform duration-75
          flex items-center justify-center
        "
        style={{
          transform: `translate(${boardOffset.x}px, ${boardOffset.y}px)`,
          width: 'clamp(490px, 95vw, 750px)',
          height: 'clamp(490px, 95vw, 750px)',
        }}
      >
        <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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
    </div>
  )
}
