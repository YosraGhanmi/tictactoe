'use client'

import { useState } from 'react'
import ModeSelector from '@/components/ModeSelector'
import GameBoard from '@/components/GameBoard'
import GameOverScreen from '@/components/GameOverScreen'
import WinnerDisplay from '@/components/WinnerDisplay'

export default function Home() {
  const [gameMode, setGameMode] = useState<'classic' | 'overwrite' | 'moving' | null>(null)
  const [gameActive, setGameActive] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)
  const [isDraw, setIsDraw] = useState(false)
  const [gameKey, setGameKey] = useState(0)

  const handleModeSelect = (mode: 'classic' | 'overwrite' | 'moving') => {
    setGameMode(mode)
    setGameActive(true)
    setWinner(null)
    setIsDraw(false)
  }

  const handleBackToMenu = () => {
    setGameMode(null)
    setGameActive(false)
    setWinner(null)
    setIsDraw(false)
  }

  const handleGameOver = (gameWinner: string | null, gameIsDraw: boolean) => {
    setGameActive(false)
    setWinner(gameWinner)
    setIsDraw(gameIsDraw)
  }

  const handleRetry = () => {
    setWinner(null)
    setIsDraw(false)
    setGameKey((prev) => prev + 1)
    setGameActive(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-4xl relative z-10">
        {!gameMode ? (
          <ModeSelector onModeSelect={handleModeSelect} />
        ) : (
          <GameBoard key={gameKey} mode={gameMode} onGameOver={handleGameOver} onBackToMenu={handleBackToMenu} />
        )}
      </div>

      {/* Winner Display Modal */}
      {(winner !== null || isDraw) && (
        <WinnerDisplay
          winner={winner}
          isDraw={isDraw}
          onRetry={handleRetry}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </main>
  )
}
