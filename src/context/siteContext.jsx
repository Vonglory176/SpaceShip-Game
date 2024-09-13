import React, { createContext, useContext, useState, useEffect } from 'react'
import { playerScoresRef } from '../firebase' // Import the playerScoresRef
import { onValue, set } from 'firebase/database' // Import necessary Firebase functions

const SiteContext = createContext()

const SiteProvider = ({ children }) => {
  const [scoreList, setScoreList] = useState([]) // {name: "TIM", difficulty: "easy", collected: 7},
  const [gameDifficulty, setGameDifficulty] = useState('easy') // Default difficulty
  const [gameState, setGameState] = useState('start') // Possible states: 'start', 'playing', 'end'

  // Fetch scores from Firebase on component mount
  useEffect(() => {
    onValue(playerScoresRef, (snapshot) => {
      const scores = snapshot.val() || []
      setScoreList(scores)
    })
  }, [])

  // Uploads a new score to the scoreboard
  const addScore = (newScore) => {
    if (!scoreList.some(score => 
        score.name === newScore.name && 
        score.collected === newScore.collected && 
        score.difficulty === newScore.difficulty
    )) {
        const updatedScores = [...scoreList, newScore]
        setScoreList(updatedScores)
        set(playerScoresRef, updatedScores) // Update Firebase with the new score list
    }
  }

  return (
    <SiteContext.Provider value={{ 
        scoreList, 
        gameDifficulty, 
        gameState, 
        addScore,
        setGameDifficulty, 
        setGameState 
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

const useSiteContext = () => {
  return useContext(SiteContext)
}

export { SiteProvider, useSiteContext }