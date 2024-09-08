import React, { useState } from 'react'
import CanvasComponent from './CanvasComponent'
import useGame from '../hooks/useGame'
import useLoadAssets from '../hooks/loadAssets'

const MainDisplay = () => {
    const [gameState, setGameState] = useState("start")
    const [gameDifficulty, setGameDifficulty] = useState("easy")
    const { startGame } = useGame()
    const { progress, assets } = useLoadAssets()

    const handleGameStart = (difficulty) => {
        setGameState("game")
        setGameDifficulty(difficulty)
    }

    const handleGameEnd = () => {
        setGameState("end")
    }

  return (
    <div id="mainDisplay" className="border rounded">

        {/* <!-- START SCREEN --> */}
        {gameState === "start" && (
            <div id="startScreen" className="flex flex-col gap-12 items-center justify-center h-full w-full">

                {/* Title */}
                <h1 className="text-5xl font-bold">Asteroid Gauntlet</h1>

                {/* Difficulty */}
                <div className="flex flex-col gap-2 items-center justify-center">
                    <h2 className="text-2xl font-semibold">- Select a difficulty to start -</h2>

                    <div className="flex gap-2">
                        <button aria-label="Easy" onClick={() => handleGameStart("easy")} className="text-xl px-3 py-2 w-[100px] rounded-xl bg-blue-600 border-2 border-blue-500 hover:bg-blue-700 hover:border-blue-600 duration-200">Easy</button>
                        <button aria-label="Normal" onClick={() => handleGameStart("normal")} className="text-xl px-3 py-2 w-[100px] rounded-xl bg-blue-600 border-2 border-blue-500 hover:bg-blue-700 hover:border-blue-600 duration-200">Normal</button>
                        <button aria-label="Hard" onClick={() => handleGameStart("hard")} className="text-xl px-3 py-2 w-[100px] rounded-xl bg-blue-600 border-2 border-blue-500 hover:bg-blue-700 hover:border-blue-600 duration-200">Hard</button>
                    </div>
                </div>

                {/* Author */}
                <p className="text-sm font-semibold">Skyler Conley - 2024</p>
            </div>
        )}

        {/* <!-- GAME SCREEN --> */}
        {gameState === "game" && (
            <CanvasComponent width={900} height={900} startGame={startGame} gameState={gameState} assets={assets} />
            // <canvas id="gameCanvas" className="p-0 img-fluid border"></canvas> 
        )}
        
        {/* <!-- END SCREEN --> */}
        {gameState === "end" && (
            <div id="endScreen" className="col justify-content-center">
                <h1>Game Over</h1>
                <h3>-Your score was <span id="endScore"></span> on <span id="endDifficulty"></span>-</h3>
                <input type="text" id="initialsInput" placeholder="Enter your initials" maxlength="3" />
                <div className="container">
                    <button id="submitButton">Submit</button>
                </div>
            </div>
        )}
    </div>
  )
}

export default MainDisplay
