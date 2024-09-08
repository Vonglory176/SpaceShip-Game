import React from 'react'

const ScorePanel = () => {
  return (
    <div id="scorePanel" className="hidden md:block rounded bg-purple-800 bg-opacity-50">            
        <h2 className='text-center text-2xl'>Score</h2>
        <div id="scoreContainer" className=""></div>
    </div>
  )
}

export default ScorePanel
