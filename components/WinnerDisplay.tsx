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
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 border-3 border-purple-400 rounded-3xl p-10 space-y-8 text-center shadow-2xl shadow-purple-500/50 max-w-md w-full animate-in fade-in zoom-in duration-300">
          {/* Congratulations Message */}
          <div className="space-y-4">
            <p className="text-2xl font-bold text-yellow-400">🎉 Congratulations! 🎉</p>
            
            {isDraw ? (
              <>
                <h3 className="text-5xl font-black bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">It's a Draw!</h3>
                <p className="text-slate-200 text-lg">Both players are equally skilled!</p>
              </>
            ) : (
              <>
                <h3 className="text-6xl font-black bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">{winner} Wins!</h3>
                <p className="text-slate-200 text-lg">Amazing performance! You're a true champion!</p>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-6 border-t border-purple-500/30">
            <button
              onClick={onRetry}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-green-500/50 transform hover:scale-105"
            >
              Play Again
            </button>

            {/* Mode Switch Buttons - Show only other modes */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              {otherModes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => onSwitchMode(mode)}
                  className="py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold text-sm rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 capitalize"
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
