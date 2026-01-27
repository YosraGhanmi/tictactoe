'use client'

import { useState, useEffect } from 'react'
import ModeSelector from '@/components/ModeSelector'
import GameBoard from '@/components/GameBoard'
import WinnerDisplay from '@/components/WinnerDisplay'
import TimerDisplay from '@/components/TimerDisplay'
import ScoreDisplay from '@/components/ScoreDisplay'
import GameEndScreen from '@/components/GameEndScreen'

const TOTAL_TIME_SECONDS = 600 // 10 minutes

export default function Home() {
  const [gameMode, setGameMode] = useState<'classic' | 'overwrite' | 'moving' | null>(null)
  const [gameActive, setGameActive] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)
  const [isDraw, setIsDraw] = useState(false)
  const [gameKey, setGameKey] = useState(0)
  const [sessionActive, setSessionActive] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_TIME_SECONDS)
  const [xWins, setXWins] = useState(0)
  const [oWins, setOWins] = useState(0)
  const [showGameEnd, setShowGameEnd] = useState(false)
  const [lastWinner, setLastWinner] = useState<string | null>(null)
  const [currentStartsWithX, setCurrentStartsWithX] = useState(true)

  // Timer effect
  useEffect(() => {
    if (!sessionActive) return

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setSessionActive(false)
          setGameActive(false)
          setShowGameEnd(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [sessionActive])

  const handleModeSelect = (mode: 'classic' | 'overwrite' | 'moving') => {
    if (!sessionActive) {
      // Start new session
      setSessionActive(true)
      setTimeRemaining(TOTAL_TIME_SECONDS)
      setXWins(0)
      setOWins(0)
      setShowGameEnd(false)
      
      // Request fullscreen
      if (typeof document !== 'undefined' && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {
          // Fullscreen request failed, continue without fullscreen
        })
      }
    }
    setGameMode(mode)
    setGameActive(true)
    setWinner(null)
    setIsDraw(false)
  }

  const handleBackToMenu = () => {
    // Reset session
    setSessionActive(false)
    setGameMode(null)
    setGameActive(false)
    setWinner(null)
    setIsDraw(false)
    setTimeRemaining(TOTAL_TIME_SECONDS)
    setXWins(0)
    setOWins(0)
  }

  const handleGameOver = (gameWinner: string | null, gameIsDraw: boolean) => {
    setGameActive(false)
    setWinner(gameWinner)
    setIsDraw(gameIsDraw)

    // Increment win counter and track last winner
    if (gameWinner === 'X') {
      setXWins((prev) => prev + 1)
      setLastWinner('X')
    } else if (gameWinner === 'O') {
      setOWins((prev) => prev + 1)
      setLastWinner('O')
    } else if (gameIsDraw) {
      // On draw, random 50/50 chance
      setLastWinner(null)
    }
  }

  const getNextStartingPlayer = (): boolean => {
    // If there's a last winner, they start next
    if (lastWinner === 'X') {
      return true // X starts
    } else if (lastWinner === 'O') {
      return false // O starts
    }
    // For first game or after draw, 50/50 random chance
    return Math.random() < 0.5
  }

  const handleRetry = () => {
    const newStartsWithX = getNextStartingPlayer()
    setCurrentStartsWithX(newStartsWithX)
    setWinner(null)
    setIsDraw(false)
    setGameKey((prev) => prev + 1)
    setGameActive(true)
  }

  const handleSwitchMode = (mode: 'classic' | 'overwrite' | 'moving') => {
    const newStartsWithX = getNextStartingPlayer()
    setCurrentStartsWithX(newStartsWithX)
    setWinner(null)
    setIsDraw(false)
    setGameMode(mode)
    setGameKey((prev) => prev + 1)
    setGameActive(true)
  }

  const handleEndSession = () => {
    setSessionActive(false)
    setGameActive(false)
    setGameMode(null)
    setShowGameEnd(false)
    setTimeRemaining(TOTAL_TIME_SECONDS)
    setXWins(0)
    setOWins(0)
  }

  return (
    <main className="w-screen h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Timer Display - Top Center */}
      {sessionActive && (
        <TimerDisplay timeRemaining={timeRemaining} />
      )}

      {/* Score Display - Top Left */}
      {sessionActive && (
        <ScoreDisplay xWins={xWins} oWins={oWins} />
      )}
      
      <div className="w-full h-full flex items-center justify-center relative z-10">
        {!gameMode ? (
          <ModeSelector onModeSelect={handleModeSelect} />
        ) : (
          <GameBoard key={gameKey} mode={gameMode} startsWithX={currentStartsWithX} onGameOver={handleGameOver} onBackToMenu={handleBackToMenu} />
        )}
      </div>

      {/* Winner Display Modal */}
      {(winner !== null || isDraw) && gameActive === false && gameMode !== null && (
        <WinnerDisplay
          winner={winner}
          isDraw={isDraw}
          currentMode={gameMode}
          onRetry={handleRetry}
          onSwitchMode={handleSwitchMode}
        />
      )}

      {/* Game End Screen - Timer ended */}
      {showGameEnd && (
        <GameEndScreen
          xWins={xWins}
          oWins={oWins}
          onPlayAgain={() => {
            handleEndSession()
            setTimeout(() => setGameMode(null), 100)
          }}
        />
      )}
    </main>
  )
}
