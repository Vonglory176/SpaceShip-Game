import React, { useEffect, useState } from 'react'
import CanvasComponent from './CanvasComponent'
import useGame from '../hooks/useGame'
import useLoadAssets from '../hooks/loadAssets'

const MainDisplay = () => {
    const [gameState, setGameState] = useState("start")
    const [gameDifficulty, setGameDifficulty] = useState(0)
    const [finalScore, setFinalScore] = useState(0)
    const { startGame } = useGame()
    const { progress, assets } = useLoadAssets()

    const handleGameStart = (difficulty) => {
        setGameState("game")
        setGameDifficulty(difficulty)
    }

    const handleSubmitScore = () => {
        console.log("Submitted")
        setGameState("start")
    }

    const getScore = (score) => {
        setFinalScore(score)
        setGameState("end")
    }

    const difficultyMap = {
        1: "Easy",
        2: "Normal",
        3: "Hard"
    }


    return (
        <div id="mainDisplay" className="rounded overflow-hidden min-h-[341px] aspect-square my-auto relative">

            {/* <!-- START SCREEN --> */}
            {gameState === "start" && (
                <div id="startScreen" className="flex flex-col gap-8 items-center justify-center h-full w-full">

                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl font-bold text-center">Asteroid Gauntlet</h1>


                    
                    {progress !== 100 ?
                        
                        // Loading Screen
                        <div className="flex flex-col gap-2 items-center justify-center">
                            <h2 className="text-2xl">Loading, please wait...</h2>

                            <div className="p-2 border-2 border-blue-500 rounded-xl relative overflow-hidden w-80">
                                <p className="text-xl z-10 text-center relative">{progress.toFixed(0)}%</p>
                                <div className="bg-blue-700 absolute inset-0" style={{width: `${progress.toFixed(0)}%`}}></div>
                            </div>
                        </div>

                        :

                        // Difficulty
                        <div className="flex flex-col gap-2 items-center justify-center">
                            <h2 className="text-2xl">Select a difficulty to start</h2>

                            <div className="flex gap-2">
                                <button aria-label="Easy" onClick={() => handleGameStart(1)} className="text-xl px-3 py-2 w-[100px] rounded-xl bg-blue-600 border-2 border-blue-500 hover:bg-blue-700 hover:border-blue-600 duration-200">Easy</button>
                                <button aria-label="Normal" onClick={() => handleGameStart(2)} className="text-xl px-3 py-2 w-[100px] rounded-xl bg-blue-600 border-2 border-blue-500 hover:bg-blue-700 hover:border-blue-600 duration-200">Normal</button>
                                <button aria-label="Hard" onClick={() => handleGameStart(3)} className="text-xl px-3 py-2 w-[100px] rounded-xl bg-blue-600 border-2 border-blue-500 hover:bg-blue-700 hover:border-blue-600 duration-200">Hard</button>
                            </div>
                        </div>
                    }

                    {/* Author */}
                    <p className="text-sm font-semibold">Skyler Conley - 2024</p>
                </div>
            )}

            {/* <!-- GAME SCREEN --> */}
            {gameState !== "start" && (
                <CanvasComponent width={900} height={900} startGame={startGame} gameState={gameState} getScore={getScore} assets={assets} gameDifficulty={gameDifficulty} />
                // <canvas id="gameCanvas" className="p-0 img-fluid border"></canvas>
            )}
            
            {/* <!-- END SCREEN --> */}
            {gameState === "end" && (
                <div id="endScreen" className="flex flex-col items-center justify-center gap-8 z-10 absolute inset-0 bg-black/50 fadeIn">

                    <h1 className='text-4xl sm:text-5xl font-bold text-center'>Game Over</h1>

                    {/* <div className="flex flex-col gap-2 items-center justify-center"></div> */}

                    <div className="flex flex-col gap-2 items-center justify-center">
                        {/* <input type="text" id="initialsInput" placeholder="Enter your initials" maxLength="3" className='text-xl px-3 py-2 rounded-xl bg-blue-600 border-2 border-blue-500 hover:bg-blue-700 hover:border-blue-600 duration-200 uppercase text-center' /> */}
                        <h2 className='text-2xl'>Your score was <span className='text-blue-500'>{finalScore}</span> on <span className='text-blue-500'>{difficultyMap[gameDifficulty] || "Unknown"}</span></h2>
                        
                        <input 
                            type="text" 
                            id="initialsInput" 
                            placeholder="Enter your initials" 
                            maxLength="3" 
                            onInput={(e) => e.target.value = e.target.value.toUpperCase()} 
                            className='text-xl px-3 py-2 rounded-xl bg-transparent border duration-200 text-center' 
                        />
                    </div>

                    <button aria-label="submit score" onClick={() => handleSubmitScore()} className="text-xl px-3 py-2 w-[100px] rounded-xl bg-blue-600 border-2 border-blue-500 hover:bg-blue-700 hover:border-blue-600 duration-200">Submit</button>
                </div>
            )}
        </div>
    )
}

export default MainDisplay
