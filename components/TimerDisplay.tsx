'use client';

interface TimerDisplayProps {
  timeRemaining: number
}

export default function TimerDisplay({ timeRemaining }: TimerDisplayProps) {
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  const isLowTime = timeRemaining < 60

  const formatTime = () => {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40">
      <div className={`px-10 sm:px-12 lg:px-16 py-4 sm:py-5 lg:py-6 rounded-2xl sm:rounded-3xl border-2 sm:border-3 font-bold text-3xl sm:text-4xl lg:text-5xl backdrop-blur-md ${
        isLowTime 
          ? 'bg-red-500/20 border-red-400 text-red-300 animate-pulse' 
          : 'bg-blue-500/20 border-blue-400 text-blue-300'
      }`}>
        {formatTime()}
      </div>
    </div>
  )
}
