'use client';

interface ModeSelectorProps {
  onModeSelect: (mode: 'classic' | 'overwrite' | 'moving') => void
}

export default function ModeSelector({ onModeSelect }: ModeSelectorProps) {
  const modes = [
    {
      id: 'classic',
      title: 'Classic Mode',
      description: 'Standard Tic Tac Toe rules. No overwriting allowed.',
    },
    {
      id: 'overwrite',
      title: 'Overwrite Mode',
      description: 'Replace opponent\'s pieces on occupied cells.',
    },
    {
      id: 'moving',
      title: 'Moving Board',
      description: 'Board moves continuously. Catch it if you can!',
    },
  ]

  return (
    <div className="text-center space-y-10">
      <div>
        <h1 className="text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">Tic Tac Toe</h1>
        <p className="text-slate-300 text-lg">Choose your challenge and test your skills</p>
      </div>

      <div className="space-y-4">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeSelect(mode.id as 'classic' | 'overwrite' | 'moving')}
            className="w-full p-8 bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 transition-all duration-200 rounded-2xl border-2 border-purple-500/50 hover:border-purple-400 text-left group shadow-lg hover:shadow-xl hover:shadow-purple-500/20"
          >
            <h2 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
              {mode.title}
            </h2>
            <p className="text-slate-300 mt-3 text-base">{mode.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
