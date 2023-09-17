import { useEffect, useState } from 'react'

import jQuery from "jquery"
window.$ = window.jQuery = jQuery

import objectiveCollect from './assets/images/objectiveCollect.png'
import arrowKeys from './assets/images/arrowKeys.png'
import spacebar from './assets/images/spacebar.png'

import Starfield from './components/Starfield'

import './style/background.css'
import './style/site.css'

export default function App() {
  // Handle keyboard controls
  let keysDown = {}; // object were we add up to 5 properties when keys go down and then delete them when the key goes up
  useEffect(() => {
  addEventListener("keydown", function (e) { keysDown[e.keyCode] = true; }, false);
  addEventListener("keyup", function (e) { delete keysDown[e.keyCode]; }, false);
  },[])
  

  // Asset Code //////////////////////////////////////////////////////////////////////////////////////
  let loadProgress = 0

  // Audio ////
  let buttonClickSound = new Audio('sounds/ButtonClick.wav'); buttonClickSound.volume=0.5;// buttonClickSound.onload = () => {loadProgress += 1}
  let buttonHoverSound = new Audio('sounds/ButtonHover.wav'); buttonHoverSound.volume=0.5;// buttonHoverSound.onload = () => {loadProgress += 1}
  
  let gameStartSound = new Audio('sounds/GameStart.wav'); gameStartSound.volume=0.5;// gameStartSound.onload = () => {loadProgress += 1}
  let gameMusic = new Audio('sounds/GameMusic.wav'); gameMusic.volume=0.3;// gameMusic.onload = () => {loadProgress += 1}
  let gameOverSound = new Audio('sounds/GameOver.wav'); gameOverSound.volume=0.5;// gameOverSound.onload = () => {loadProgress += 1}

  let thrusterSound = new Audio('sounds/Thruster.mp3'); thrusterSound.volume=0.9;// thrusterSound.onload = () => {loadProgress += 1}
  let collectedPodSound = new Audio('sounds/CollectedPod.wav'); collectedPodSound.volume=0.5;// collectedPodSound.onload = () => {loadProgress += 1}
  let shootSound = new Audio('sounds/Shoot.wav'); shootSound.volume=0.5;// shootSound.onload = () => {loadProgress += 1}
  let asteroidExplosionSound = new Audio('sounds/AsteroidExplosion.wav'); asteroidExplosionSound.volume=0.5;// asteroidExplosionSound.onload = () => {loadProgress += 1}

  let collisionSound = new Audio('sounds/AsteroidCollision.wav'); collisionSound.volume=0.5;// collisionSound.onload = () => {loadProgress += 1}
  let electricitySound = new Audio('sounds/Electricity.wav'); electricitySound.volume=0.5;// electricitySound.onload = () => {loadProgress += 1}
  let explosionSound = new Audio('sounds/Explosion.wav'); explosionSound.volume=0.5;// explosionSound.onload = () => {loadProgress += 1}

  useEffect(() => {
    $("button").mouseenter(()=>{
        $(buttonHoverSound).prop('currentTime',0)
        $(buttonHoverSound).trigger('play')
    })
    $("#submitButton").click(()=>{$(buttonClickSound).trigger('play')})
    $(".difficultyButton").click(()=>{$(gameStartSound).trigger('play')})
  },[])

  // Images ////
  let bgImage = new Image(); bgImage.onload = () => {loadProgress += 1}
  bgImage.src = "images/background/background.png"

  let asteroidFieldImage = new Image(); asteroidFieldImage.onload = () => {loadProgress += 1}
  asteroidFieldImage.src = "images/background/asteroidFieldBackgroundImage3.png"

  let asteroidImage = new Image(); asteroidImage.onload = () => {loadProgress += 1}
  asteroidImage.src = "images/asteroids/asteroidSpriteSheet2.png"

  let collectibleImage = new Image(); collectibleImage.onload = () => {loadProgress += 1}
  collectibleImage.src = "images/lifepod/lifepodSpriteSheet.png"

  let bulletImage = new Image(); bulletImage.onload = () => {loadProgress += 1}
  bulletImage.src = "images/bullet.png"

  let playerImage = new Image(); playerImage.onload = () => {loadProgress += 1}
  playerImage.src = "images/spaceship/spaceShipSpriteSheet5.png"
  // Asset Code //////////////////////////////////////////////////////////////////////////////////////

  // General Code //////////////////////////////////////////////////////////////////////////////////////
  // Cross-browser support for requestAnimationFrame
  let w = window;
  requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

  //Background
  let canvas = document.getElementById("gameCanvas"); canvas.width = 900; canvas.height = 900
  let ctx = canvas.getContext("2d")

  //Game Specific
  let gameState, time, collected, difficulty, maxAsteroidSpeed

  //Objects
  let asteroidArray, collectible, player, bulletArray, asteroidField1, asteroidField2, asteroidField3, asteroidField4
  
  //Score Keeping
  let scoreArray = []
  function score (initials) {
      this.initials = initials
      this.collected = collected
      this.difficulty = difficulty
  }

  const asteroidSpeedEasy = 200
  const asteroidSpeedNormal = 400
  const asteroidSpeedHard = 600

  // GAME START / RESET
  $("#playButtonEasy").click(() => {startGame(1, 200)})
  $("#playButtonNormal").click(() => {startGame(2, 400)}) //Second Value is AsteroidMaxSpeed
  $("#playButtonHard").click(() => {startGame(3, 600)})

  function startGame (gameDifficulty, asteroidSpeed) {
      if (loadProgress === 6) {
          // $("#startScreen").css("display", "none")
          // $("#gameCanvas").css("display", "block")
      
          //Game
          difficulty = gameDifficulty
          maxAsteroidSpeed = asteroidSpeed
          time = null
          
          //Asteroid Background    
          asteroidField1 = new AsteroidField (0, 0, 0-canvas.height, 10)
          asteroidField2 = new AsteroidField (0, 1, 0, 10)
          asteroidField3 = new AsteroidField (1, 0, 0 -canvas.height, 40)
          asteroidField4 = new AsteroidField (1, 1, 0, 40)
      
          //Asteroids
          asteroidArray = new Array
          for (let i=0;i<4+gameDifficulty;i++) addAsteroid(maxAsteroidSpeed) //Creating Asteroids
      
          //LifePods
          collected = 0
          collectible = new Collectible ()
      
          //Bullet Control
          bulletArray = new Array
      
          //Player
          player = new Player()
      
          //Start Game
          gameState = true
          requestAnimationFrame(main)
      }
      else alert(`Game is still loading, please try again in a moment! Progress: ${(loadProgress/6)*100}%`)
  }


  function render (delta) {
      //General Reset & Background Drawing
      ctx.clearRect(0,0,canvas.width,canvas.height)
      ctx.drawImage(bgImage, 0, 0, 900, 900)
      $(gameMusic).trigger('play')

      //AsteroidField Drawing
      asteroidField1.update(delta / 1000)
      asteroidField1.draw()
      asteroidField2.update(delta / 1000)
      asteroidField2.draw()
      asteroidField3.update(delta / 1000)
      asteroidField3.draw()
      asteroidField4.update(delta / 1000)
      asteroidField4.draw()
      
      //Asteroid Drawing
      for (let i = 0; i < asteroidArray.length; i++) {
          asteroidArray[i].update(delta / 1000) 
          asteroidArray[i].draw()
      }
      
      //Collectible Drawing
      collectible.update(delta / 1000)
      collectible.draw()
      
      //Player Drawing
      player.update(delta / 1000)
      player.draw()

      //Bullet Control
      let remove = -1
      for (let i=0;i<bulletArray.length;i++) {
          // bulletArray[i].update(delta / 1000)
          if (bulletArray[i].update(delta / 1000)) remove = i
          bulletArray[i].draw()
      }
      if (remove > -1) bulletArray.splice(remove,1)
      
      //Score Counter Drawing
      ctx.fillStyle = "rgb(250, 250, 250)";
      ctx.font = "24px Helvetica";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("LifePods Collected: " + collected, 32, 32);
  }

  //Game Loop
  function main(now) {
      if (time == null) {
          time = now
          ctx.reset()
          requestAnimationFrame(main)
          return
      }
      const delta = now - time
      time = now

      if (delta >= 1*1000) {//16.6 Is 60fps
      
      } 
      render(delta)
      if (gameState === true) requestAnimationFrame(main)
      else {
          $(gameMusic).trigger('pause')

          $("#endScore").text(`${collected? collected : 0}`)
          $("#endDifficulty").text(`${difficultyTranslator(difficulty)}`)

          $("#gameCanvas").css("display","none")
          $("#endScreen").css("display", "block")
      }
  }

  //Game End
  $("#submitButton").click(() => {
      let initials = ($("#initialsInput").val()).trim()
      if (initials) {
          scoreArray.push(new score(initials))
    

          $("#scoreContainer").html("")
          for (let i=0;i<scoreArray.length;i++) $("#scoreContainer").append(`<p>${(scoreArray[i].initials).toUpperCase()}: ${scoreArray[i].collected} ${difficultyTranslator(scoreArray[i].difficulty)}</p>`)

      }

      $("#endScreen").css("display", "none")
      $("#startScreen").css("display", "block")
  })

  // function difficultyTranslator (difficulty) {
  //     if (difficulty === 1) return "Easy"
  //     else if (difficulty === 2) return "Normal"
  //     else if (difficulty === 3) return "Hard"
  // }

  // function scoreArraySort () {
  //     scoreArray = scoreArray.sort((p1, p2) => (p1.difficulty > p2.difficulty) ? -1 : (p1.difficulty < p2.difficulty) ? 1 : 0) //Sorting by Difficulty
  //     scoreArray = scoreArray.sort((p1, p2) => (p1.collected > p2.collected) ? -1 : (p1.collected > p2.collected) ? 1 : 0) //Sorting by Score
  // }

  return (
    <section id="mainContainer-section">
      <Starfield/>

      <div id="leftSubContainer-div">
          <h2>Objective</h2>
          <p>You're a rescue ship responding to an emergency call, navigate an asteroid field to collect as many lifepods as you can!
              Be careful though, things might get harder the better you do..</p>

          <img src={objectiveCollect}/>
          <h2>Controls</h2>

          <p>Arrow-Keys to move</p>
          <img src={arrowKeys}/>

          <p>Space to shoot</p>
          <img src={spacebar}/>
      </div>

      <div id="centerSubContainer-div">
          {/* <!-- START SCREEN --> */}
          <div id="startScreen">
              <h1>Asteroid Gauntlet</h1>
              <span>Skyler 2023</span>
              <h3>Select a difficulty to start!</h3>
              <button className="difficultyButton" id="playButtonEasy">Easy</button>
              <button className="difficultyButton" id="playButtonNormal">Normal</button>
              <button className="difficultyButton" id="playButtonHard">Hard</button>
          </div>

          {/* <!-- GAME SCREEN --> */}
          <canvas id="gameCanvas"></canvas> 
          
          {/* <!-- END SCREEN --> */}
          <div id="endScreen">
              <h1>Game Over</h1>
              <h3>-Your score was <span id="endScore"></span> on <span id="endDifficulty"></span>-</h3>
              <input type="text" id="initialsInput" placeholder="Enter your initials" maxLength="3"/>
              <div className="container">
                  <button id="submitButton">Submit</button>
              </div>
              
          </div>
      </div>

      <div id="rightSubContainer-div">
          <h2>Score</h2>
          <div id="scoreContainer"></div>
      </div>
    </section>
  )
}
