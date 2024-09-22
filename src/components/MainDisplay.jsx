import React, { useEffect, useState } from 'react'
import CanvasComponent from './CanvasComponent'
import useGame from '../hooks/useGame'
// import useLoadAssets from '../hooks/loadAssets'
import { useAssetsContext } from '../context/assetContext'
import { useSiteContext } from '../context/siteContext'
import { containsBadWords } from '../helpers/helper'
import { FaGithub } from 'react-icons/fa'
const MainDisplay = () => {
    const { progress, assets } = useAssetsContext()
    const { gameState, setGameState, gameDifficulty, setGameDifficulty, addScore } = useSiteContext()
    const [finalScore, setFinalScore] = useState(0)
    const [initials, setInitials] = useState("")
    const { startGame } = useGame()
    const [errorMessage, setErrorMessage] = useState("")

    // const { progress, assets } = useLoadAssets()
    // const handleButtonHover = () => assets?.sounds?.playButtonHover()
    const handleButtonClick = () => assets?.sounds?.playButtonClick()

    const handleGameReset = () => {
        setGameState("start")
        setGameDifficulty("")
        setFinalScore(0)
        setInitials("")
        setErrorMessage("")
    }

    const handleGameStart = (difficulty) => {
        // handleButtonClick()
        setGameState("playing")
        setGameDifficulty(difficulty)
    }

    const handleSubmitScore = () => {    
        // handleButtonClick()

        // Only allow submission if score is above zero
        if (scoreIsAboveZero) {

            // Length Check
            if (initials.length !== 3) {
                setErrorMessage({
                    type: "length", 
                    message: "Initials must be 3 characters to be saved. Are you sure you want to continue?"
                })
                return
                // if (!window.confirm("Initials must be 3 characters. If you continue, your score will not be saved.")) {
                //     console.log("Not saved")
                //     // addScore({name: initials, difficulty: gameDifficulty, collected: finalScore})
                //     return
                // }
            }

            // Bad Word Check
            else if (containsBadWords(initials)) {
                setErrorMessage({
                    type: "badWord", 
                    message: "Please remove any profanity before submitting your score."
                })
                return
            }

            // Save Score
            else {    
                console.log("Saved")
                addScore({name: initials, difficulty: gameDifficulty, collected: finalScore})
            }
        }

        // Reset the game        
        handleButtonClick()        
        handleGameReset()
    }

    const getScore = (score) => {
        setFinalScore(score)
        setGameState("end")
    }

    const scoreIsAboveZero = Boolean(finalScore > 0)

    // const difficultyMap = {
    //     "easy": 1,
    //     "medium": 2,
    //     "hard" : 3
    // }

    // useEffect(() => {
    //     console.log(gameDifficulty)
    // }, [gameDifficulty])


    return (
        <div id="mainDisplay" className="rounded overflow-hidden min-h-[341px] aspect-square my-auto relative">

            {/* <!-- START SCREEN --> */}
            {gameState === "start" && (
                <div id="startScreen" className="flex flex-col gap-8 items-center justify-center h-full w-full">

                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl text-blue-300 font-bold text-center">Asteroid Gauntlet</h1>


                    
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
                                <button aria-label="Easy" onClick={() => handleGameStart("easy")} className="text-xl px-3 py-2 w-[100px] rounded-xl bg-blue-600 border-2 border-blue-500 hover:bg-blue-700 hover:border-blue-600 duration-200">Easy</button>  {/* onMouseEnter={handleButtonHover} */}
                                <button aria-label="Medium" onClick={() => handleGameStart("medium")} className="text-xl px-3 py-2 w-[100px] rounded-xl bg-blue-600 border-2 border-blue-500 hover:bg-blue-700 hover:border-blue-600 duration-200">Medium</button>
                                <button aria-label="Hard" onClick={() => handleGameStart("hard")} className="text-xl px-3 py-2 w-[100px] rounded-xl bg-blue-600 border-2 border-blue-500 hover:bg-blue-700 hover:border-blue-600 duration-200">Hard</button>
                            </div>
                        </div>
                    }

                    {/* Author */}
                    <p className="text-sm font-semibold flex items-center gap-2">Skyler 2023 <a href="https://github.com/Vonglory176/SpaceShip-Game" target="_blank" rel="noopener noreferrer"><FaGithub size={24} /></a></p>
                </div>
            )}

            {/* <!-- GAME SCREEN --> */}
            {gameState !== "start" && (
                <CanvasComponent width={900} height={900} startGame={startGame} getScore={getScore} /> // {/* gameDifficulty={difficultyMap[gameDifficulty] */}
                // <canvas id="gameCanvas" className="p-0 img-fluid border"></canvas>
            )}
            
            {/* <!-- END SCREEN --> */}
            {gameState === "end" && (
                <div id="endScreen" className="flex flex-col items-center justify-center gap-8 z-10 absolute inset-0 bg-black/50 fadeIn">

                    <h1 className='text-4xl sm:text-5xl font-bold text-center'>Game Over</h1>

                    {/* <div className="flex flex-col gap-2 items-center justify-center"></div> */}

                    <div className="flex flex-col gap-2 items-center justify-center">
                        {/* <input type="text" id="initialsInput" placeholder="Enter your initials" maxLength="3" className='text-xl px-3 py-2 rounded-xl bg-blue-600 border-2 border-blue-500 hover:bg-blue-700 hover:border-blue-600 duration-200 uppercase text-center' /> */}
                        <h2 className='text-2xl'>Your score was <span className='text-blue-500'>{finalScore}</span> on <span className='text-blue-500 capitalize'>{gameDifficulty || "Unknown"}</span></h2>
                        
                        {scoreIsAboveZero && <input 
                            type="text" 
                            id="initialsInput" 
                            placeholder="Enter your initials" 
                            maxLength="3" 
                            value={initials}
                            onInput={(e) => e.target.value = e.target.value.toUpperCase()} 
                            onChange={(e) => setInitials(e.target.value)}
                            className='text-xl px-3 py-2 rounded-xl bg-transparent border duration-200 text-center'
                        />}

                        {errorMessage && <p className="text-red-500 text-lg text-center max-w-[330px]">{errorMessage.message}</p>}
                    </div>
                    

                    {errorMessage?.type !== "length" ?
                        <button 
                            aria-label="submit score" 
                            onClick={() => handleSubmitScore()} 
                            className="text-xl px-3 py-2 w-[100px] rounded-xl bg-blue-600 border-2 border-blue-500 hover:bg-blue-700 hover:border-blue-600 duration-200"
                            // disabled={errorMessage?.type === "badWord"}
                            // onMouseEnter={handleButtonHover}
                        >
                            {scoreIsAboveZero? "Submit" : "Try Again"}
                        </button>

                        :

                        <div className="flex flex-col gap-2 items-center justify-center">

                            {/* <p className='text-xl text-red-500 max-w-[350px] text-center'>Are you sure you want to continue? Your score will not be saved. </p> */}

                            <div className="flex gap-4">
                                <button 
                                aria-label="Return to Start Screen" 
                                onClick={() => initials.length !== 3 ? handleGameReset() : handleSubmitScore()} 
                                className="text-xl px-3 py-2 w-[109px] rounded-xl bg-red-700 border-2 border-red-600 hover:bg-red-800 hover:border-red-600 duration-200"
                                // onMouseEnter={handleButtonHover}
                                >
                                    Continue
                                </button>

                                <button 
                                aria-label="Cancel"
                                onClick={() => setErrorMessage("")} 
                                className="text-xl px-3 py-2 w-[109px] rounded-xl bg-blue-600 border-2 border-blue-500 hover:bg-blue-700 hover:border-blue-600 duration-200"
                                // onMouseEnter={handleButtonHover}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    }
                </div>
            )}
        </div>
    )
}

export default MainDisplay
