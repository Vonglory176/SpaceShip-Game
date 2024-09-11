import React, { useRef, useEffect } from 'react'

const CanvasComponent = ({ width, height, startGame, gameState, getScore, assets, gameDifficulty }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (gameState === 'playing' && assets) {
      startGame(canvas, ctx, assets, gameDifficulty, getScore)
    }
  }, [startGame, gameState, assets, gameDifficulty, getScore])

  return <canvas ref={canvasRef} width={width} height={height} className='w-full' />
}

export default CanvasComponent