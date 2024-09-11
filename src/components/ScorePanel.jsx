import React, { useState } from 'react'

const ScorePanel = ({scoreList}) => {
  const [scoreDifficulty, setScoreDifficulty] = useState("all")
  
  const sortedScoreList = scoreList
    .filter(score => scoreDifficulty === "all" || score.difficulty === scoreDifficulty)
    .sort((a, b) => b.collected - a.collected)
  
  
  return (
    <div id="scorePanel" className="rounded bg-purple-800 bg-opacity-50 p-2 flex flex-col gap-2">

        <div className="flex flex-col gap-2 items-center">
          <h3 className='text-blue-300 font-bold uppercase text-xl text-center'>Score</h3>

          <div className="grid grid-cols-4 justify-center gap-[1px] rounded-xl overflow-hidden border-2 border-blue-600 bg-blue-600"> {/*  hover:border-blue-600 */}
            <button aria-label="All" className={`px-2 py-2 bg-blue-600 hover:bg-blue-700 duration-200 ${scoreDifficulty === "all" ? "bg-blue-700" : "bg-blue-500"}`} onClick={() => setScoreDifficulty("all")}>All</button>
            <button aria-label="Easy" className={`px-2 py-2 bg-blue-600 hover:bg-blue-700 duration-200 ${scoreDifficulty === "easy" ? "bg-blue-700" : "bg-blue-500"}`} onClick={() => setScoreDifficulty("easy")}>Easy</button>
            <button aria-label="Medium" className={`px-2 py-2 bg-blue-600 hover:bg-blue-700 duration-200 ${scoreDifficulty === "medium" ? "bg-blue-700" : "bg-blue-500"}`} onClick={() => setScoreDifficulty("medium")}>Med</button>
            <button aria-label="Hard" className={`px-2 py-2 bg-blue-600 hover:bg-blue-700 duration-200 ${scoreDifficulty === "hard" ? "bg-blue-700" : "bg-blue-500"}`} onClick={() => setScoreDifficulty("hard")}>Hard</button>
          </div>
        </div>

        <hr className='w-full border-purple-400' />

        <div className="">
          {sortedScoreList.map((score, index) => {
            const {name, collected, difficulty} = score
            return (
            <div key={index} className="grid grid-cols-3 capitalize text-xl text-center border-b pb-1 mb-1 border-blue-600">
              <span>{name}</span>
              <span>{difficulty}</span>
              <span>{collected}</span>
            </div>
          )})}
        </div>
    </div>
  )
}

export default ScorePanel
