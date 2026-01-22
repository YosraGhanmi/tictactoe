'use client';

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
  const isX = value === 'X'
  const isO = value === 'O'

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-32 h-32 text-6xl font-bold rounded-xl transition-all duration-200
        border-3
        ${
          isWinningCell
            ? 'bg-yellow-400 border-yellow-300 shadow-2xl shadow-yellow-400'
            : 'bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/50 hover:border-purple-400 hover:from-slate-700 hover:to-slate-800'
        }
        ${disabled && !isWinningCell ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${isX ? 'text-blue-400' : isO ? 'text-red-400' : 'text-slate-600'}
      `}
    >
      {value}
    </button>
  )
}
