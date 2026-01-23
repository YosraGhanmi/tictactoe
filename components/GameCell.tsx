'use client';

import { useState } from 'react'

interface GameCellProps {
  value: string | null
  index: number
  onClick: () => void
  disabled: boolean
  isWinningCell: boolean
}

export default function GameCell({
  value,
  onClick,
  disabled,
  isWinningCell,
}: GameCellProps) {
  const [isClicking, setIsClicking] = useState(false)
  const isX = value === 'X'
  const isO = value === 'O'
  const isEmpty = !value

  const handleClick = () => {
    if (!disabled) {
      setIsClicking(true)
      onClick()
      setTimeout(() => setIsClicking(false), 400)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        w-32 h-32 text-6xl font-bold rounded-xl transition-all duration-200
        border-3 relative
        ${
          isWinningCell
            ? 'bg-yellow-400 border-yellow-300 shadow-2xl shadow-yellow-400'
            : 'bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/50 hover:border-purple-400 hover:from-slate-700 hover:to-slate-800'
        }
        ${disabled && !isWinningCell ? 'cursor-not-allowed' : isEmpty ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
        ${isX ? 'text-blue-400' : isO ? 'text-red-400' : 'text-slate-600'}
        ${isClicking ? 'animate-cell-click' : ''}
      `}
    >
      {/* Color flash effect on click */}
      {isClicking && (
        <div 
          className={`absolute inset-0 rounded-xl pointer-events-none animate-color-flash ${
            isX ? 'border-blue-400' : 'border-red-400'
          }`}
          style={{
            borderWidth: '3px',
          }}
        />
      )}
      
      {/* Glowing text effect for X and O */}
      <span className={`inline-block ${isX ? 'animate-x-glow' : isO ? 'animate-o-glow' : ''}`}>
        {value}
      </span>
    </button>
  )
}
