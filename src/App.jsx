// import './App.css'

import BackgroundDisplay from "./components/BackgroundDisplay"
import InfoPanel from "./components/InfoPanel"
import ScorePanel from "./components/ScorePanel"
import MainDisplay from "./components/MainDisplay"
import { useEffect, useState } from "react"

function App() {
  const [scoreList, setScoreList] = useState([
    // {name: "TIM", difficulty: "easy", collected: 7},
  ])

  const addScoreCallback = (newScore) => {
    console.log(newScore)
    // Change from score.score to score.collected
    if (!scoreList.some(score => 
        score.name === newScore.name && 
        score.collected === newScore.collected && 
        score.difficulty === newScore.difficulty
    )) {
        setScoreList([...scoreList, newScore])
    }
}

  useEffect(() => {
    console.log(scoreList)
  }, [scoreList])

  return (
    <div className="App">

      <main className="p-1 w-full h-full min-h-[100svh] lg:flex flex-1 lg:flex-col lg:justify-center lg:items-center">

        <BackgroundDisplay />

        {/* <div className="game-container grid grid-cols-[1fr_3fr_1fr] gap-2 border border-purple-900 p-2 m-2 bg-purple-950 bg-opacity-50 rounded-lg z-10 relative max-w-[1200px] lg:max-h-[718px]">  min-w-[825px] */}
        <div className="game-container gap-2 border border-purple-900 p-2 m-2 m-auto bg-purple-950 bg-opacity-50 rounded-lg z-10 relative max-w-[757px] lg:max-w-[1200px] lg:max-h-[726px]">
          <InfoPanel />
          <MainDisplay addScoreCallback={addScoreCallback} />
          <ScorePanel scoreList={scoreList} />
        </div>

      </main>
    </div>
  )
}

export default App


/* TODO ---------------------

Finish animated background
Pagination for scoreboard
Setup backend and database for score keeping

*/