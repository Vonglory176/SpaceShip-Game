import React, { useRef, useEffect } from 'react'
import { useSiteContext } from '../context/siteContext'
import { useAssetsContext } from '../context/assetContext'

const CanvasComponent = ({ width, height, startGame, getScore }) => {
  const canvasRef = useRef(null)
  const { gameState, gameDifficulty } = useSiteContext()
  const { assets } = useAssetsContext()

  const difficultyMap = { // Determines asteroid speed using this as a multiplier
    "easy": 1,
    "medium": 2,
    "hard" : 3
  }
  
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    if (gameState === 'playing' && assets) {
      startGame(canvas, ctx, assets, difficultyMap[gameDifficulty], getScore)
    }
  }, [startGame, gameState]) // , assets, gameDifficulty, getScore

  return <canvas ref={canvasRef} width={width} height={height} className='w-full' />
}

export default CanvasComponent