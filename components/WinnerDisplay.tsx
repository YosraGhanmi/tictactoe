'use client';

interface WinnerDisplayProps {
  winner: string | null
  isDraw: boolean
  currentMode: 'classic' | 'overwrite' | 'moving'
  onRetry: () => void
  onSwitchMode: (mode: 'classic' | 'overwrite' | 'moving') => void
}

export default function WinnerDisplay({
  winner,
  isDraw,
  currentMode,
  onRetry,
  onSwitchMode,
}: WinnerDisplayProps) {
  const modes: ('classic' | 'overwrite' | 'moving')[] = ['classic', 'overwrite', 'moving']
  const otherModes = modes.filter((mode) => mode !== currentMode)
  return (
    <>
      {/* Dark overlay backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" />
      
      {/* Modal popup centered on screen */}
      <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-4 z-50">
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 border-2 sm:border-3 border-purple-400 rounded-2xl sm:rounded-3xl lg:rounded-4xl p-8 sm:p-12 lg:p-16 space-y-8 sm:space-y-10 lg:space-y-12 text-center shadow-2xl shadow-purple-500/50 max-w-sm sm:max-w-lg lg:max-w-2xl w-full animate-in fade-in zoom-in duration-300">
          {/* Congratulations Message */}
          <div className="space-y-4 sm:space-y-6">
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-400">Congratulations!</p>
            
            {isDraw ? (
              <>
                <h3 className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">It's a Draw!</h3>
                <p className="text-slate-200 text-base sm:text-lg lg:text-xl">Both players are equally skilled!</p>
              </>
            ) : (
              <>
                <h3 className="text-6xl sm:text-7xl lg:text-8xl font-black bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">{winner} Wins!</h3>
                <p className="text-slate-200 text-base sm:text-lg lg:text-xl">Amazing performance! You're a true champion!</p>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 sm:space-y-5 lg:space-y-6 pt-8 sm:pt-10 lg:pt-12 border-t border-purple-500/30">
            <button
              onClick={onRetry}
              className="w-full py-5 sm:py-6 lg:py-7 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-base sm:text-lg lg:text-2xl rounded-xl sm:rounded-2xl lg:rounded-3xl transition-all duration-200 shadow-lg hover:shadow-2xl hover:shadow-green-500/50 transform hover:scale-105"
            >
              Play Again
            </button>

            {/* Mode Switch Buttons - Show only other modes */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5 pt-4 sm:pt-5 lg:pt-6">
              {otherModes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => onSwitchMode(mode)}
                  className="py-5 sm:py-6 lg:py-7 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-bold text-xs sm:text-sm lg:text-lg rounded-lg sm:rounded-xl lg:rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 capitalize"
                >
                  {mode === 'classic' ? 'Classic' : mode === 'overwrite' ? 'Overwrite' : 'Moving'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
