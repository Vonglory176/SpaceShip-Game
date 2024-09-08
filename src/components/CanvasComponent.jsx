import React, { useRef, useEffect } from 'react'

const CanvasComponent = ({ width, height, startGame, gameState, assets }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    if (gameState === 'game' && assets) {
      startGame(canvas, context, assets)
    }
  }, [startGame, gameState, assets])

  return <canvas ref={canvasRef} width={width} height={height} />
}

export default CanvasComponent