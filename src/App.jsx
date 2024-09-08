// import './App.css'

import BackgroundDisplay from "./components/BackgroundDisplay"
import InfoPanel from "./components/InfoPanel"
import ScorePanel from "./components/ScorePanel"
import MainDisplay from "./components/MainDisplay"

function App() {
  return (
    <div className="App">

      <main className="flex justify-center items-center w-full h-full">

        <BackgroundDisplay />

        <div className="game-container grid grid-cols-[1fr_3fr_1fr] gap-2 border border-purple-900 p-2 m-2 bg-purple-950 bg-opacity-50 rounded-lg z-10 relative max-w-[1200px]"> {/*  min-w-[825px] */}
          <InfoPanel />
          <MainDisplay />
          <ScorePanel />
        </div>

      </main>
    </div>
  )
}

export default App
