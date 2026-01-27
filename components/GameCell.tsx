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
        w-35 h-35 sm:w-42 sm:h-42 md:w-45 md:h-45 lg:w-50 lg:h-50
        text-4xl sm:text-5xl md:text-6xl lg:text-7xl
        font-bold rounded-lg sm:rounded-xl transition-all duration-200
        border-2 sm:border-3 relative flex items-center justify-center
        ${
          isWinningCell
            ? 'bg-yellow-400 border-yellow-300 shadow-2xl shadow-yellow-400'
            : 'bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/50 hover:border-purple-400 hover:from-slate-700 hover:to-slate-800'
        }
        ${disabled && !isWinningCell ? 'cursor-not-allowed' : isEmpty ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
        ${isX ? 'text-red-400' : isO ? 'text-blue-400' : 'text-slate-600'}
        ${isClicking ? 'animate-cell-click' : ''}
      `}
    >
      {/* Color flash effect on click */}
      {isClicking && (
        <div 
          className={`absolute inset-0 rounded-xl pointer-events-none animate-color-flash ${
            isX ? 'border-red-400' : 'border-blue-400'
          }`}
          style={{
            borderWidth: '3px',
          }}
        />
      )}
      
      {/* Glowing text effect for X and O */}
      <span className={`inline-block ${isX ? 'animate-o-glow' : isO ? 'animate-x-glow' : ''}`}>
        {value}
      </span>
    </button>
  )
}
