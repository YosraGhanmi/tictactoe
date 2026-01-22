'use client'

interface GameOverScreenProps {
  mode: 'classic' | 'overwrite' | 'moving'
  onRetry: () => void
  onBackToMenu: () => void
}

export default function GameOverScreen({
  mode,
  onRetry,
  onBackToMenu,
}: GameOverScreenProps) {
  const modeLabel = {
    classic: 'Classic Mode',
    overwrite: 'Overwrite Mode',
    moving: 'Moving Board',
  }

  return (
    <div className="space-y-6 text-center">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Game Over!</h2>
        <p className="text-slate-400">You were playing {modeLabel[mode]}</p>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <p className="text-slate-300">What would you like to do?</p>

        <div className="space-y-2">
          <button
            onClick={onRetry}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
          >
            Retry This Mode
          </button>
          <button
            onClick={onBackToMenu}
            className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  )
}
