'use client';

interface ScoreDisplayProps {
  xWins: number
  oWins: number
}

export default function ScoreDisplay({ xWins, oWins }: ScoreDisplayProps) {
  return (
    <div className="fixed top-20 left-8 z-40 flex gap-6">
      {/* X Wins */}
      <div className="px-6 py-3 rounded-xl border-2 border-blue-400 bg-blue-500/10 backdrop-blur-md">
        <p className="text-blue-400 text-sm font-semibold mb-1">X Wins</p>
        <p className="text-blue-300 text-3xl font-black">{xWins}</p>
      </div>

      {/* O Wins */}
      <div className="px-6 py-3 rounded-xl border-2 border-red-400 bg-red-500/10 backdrop-blur-md">
        <p className="text-red-400 text-sm font-semibold mb-1">O Wins</p>
        <p className="text-red-300 text-3xl font-black">{oWins}</p>
      </div>
    </div>
  )
}
