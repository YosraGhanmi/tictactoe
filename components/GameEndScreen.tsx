'use client';

interface GameEndScreenProps {
  xWins: number
  oWins: number
  onPlayAgain: () => void
}

export default function GameEndScreen({ xWins, oWins, onPlayAgain }: GameEndScreenProps) {
  const winner = xWins > oWins ? 'X' : oWins > xWins ? 'O' : null

  return (
    <>
      {/* Dark overlay backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40" />

      {/* Modal popup centered on screen */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 border-2 sm:border-3 border-purple-400 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 space-y-6 sm:space-y-8 text-center shadow-2xl shadow-purple-500/50 max-w-2xl w-full animate-in fade-in zoom-in duration-300">
          {/* Time's Up Message */}
          <div className="space-y-3 sm:space-y-4">
            <p className="text-2xl sm:text-3xl font-bold text-yellow-400">⏱️ Time's Up! ⏱️</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">Final Score</h2>
          </div>

          {/* Score Display */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 py-6 sm:py-8 border-y border-purple-500/30">
            {/* X Score */}
            <div className="space-y-2 sm:space-y-3">
              <p className="text-blue-300 text-base sm:text-lg font-semibold">Player X</p>
              <p className="text-blue-400 text-5xl sm:text-6xl lg:text-7xl font-black">{xWins}</p>
              <p className="text-blue-300/70 text-xs sm:text-sm">Wins</p>
            </div>

            {/* O Score */}
            <div className="space-y-2 sm:space-y-3">
              <p className="text-red-300 text-base sm:text-lg font-semibold">Player O</p>
              <p className="text-red-400 text-5xl sm:text-6xl lg:text-7xl font-black">{oWins}</p>
              <p className="text-red-300/70 text-xs sm:text-sm">Wins</p>
            </div>
          </div>

          {/* Winner Announcement */}
          {winner ? (
            <div className="space-y-1 sm:space-y-2">
              <p className="text-lg sm:text-xl text-slate-300">Champion</p>
              <p className={`text-4xl sm:text-5xl lg:text-6xl font-black ${winner === 'X' ? 'text-blue-400' : 'text-red-400'}`}>
                Player {winner} Wins!
              </p>
            </div>
          ) : (
            <div className="space-y-1 sm:space-y-2">
              <p className="text-2xl sm:text-3xl font-bold text-yellow-400">It's a Tie!</p>
              <p className="text-slate-300 text-sm sm:text-base">Both players performed equally</p>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={onPlayAgain}
            className="w-full py-4 sm:py-5 lg:py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-base sm:text-lg lg:text-xl rounded-xl sm:rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-purple-500/50 transform hover:scale-105"
          >
            Play Again
          </button>
        </div>
      </div>
    </>
  )
}
