// import './App.css'

import BackgroundDisplay from "./components/BackgroundDisplay"
import InfoPanel from "./components/InfoPanel"
import ScorePanel from "./components/ScorePanel"
import MainDisplay from "./components/MainDisplay"

function App() {

  return (
    <div className="App">

      <main className="p-1 w-full h-full min-h-[100svh] lg:flex flex-1 lg:flex-col lg:justify-center lg:items-center">

        <BackgroundDisplay />

        {/* <div className="game-container grid grid-cols-[1fr_3fr_1fr] gap-2 border border-purple-900 p-2 m-2 bg-purple-950 bg-opacity-50 rounded-lg z-10 relative max-w-[1200px] lg:max-h-[718px]">  min-w-[825px] */}
        <div className="game-container gap-2 border border-purple-900 p-2 m-2 m-auto bg-purple-950 bg-opacity-50 rounded-lg z-10 relative max-w-[757px] lg:max-w-[1200px] lg:max-h-[726px]">
          <InfoPanel />
          <MainDisplay />
          <ScorePanel />
        </div>

      </main>
    </div>
  )
}

export default App


/* TODO ---------------------

Finish animated background
Pagination for scoreboard
Setup backend for extra security?

*/