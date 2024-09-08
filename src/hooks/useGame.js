import { useRef, useCallback } from 'react'
import { Player, Bullet, AsteroidField, Asteroid, Collectible } from '../classes/main'

const useGame = () => {
    const gameStateRef = useRef({
        gameState: true,
        time: null,
        collected: 0,
        difficulty: 1,
        maxAsteroidSpeed: 200,
        asteroidArray: [],
        collectible: null,
        player: null,
        bulletArray: [],
        asteroidField1: null,
        asteroidField2: null,
        asteroidField3: null,
        asteroidField4: null,

        // checkPlayerExplode: () => { return player.explode },
        // addAsteroid: (context, canvas) => { asteroidArray.push(new Asteroid(context, canvas, maxAsteroidSpeed)) }
    })


const startGame = useCallback((canvas, context, assets) => { // , 
    const { current: gameState, difficulty, maxAsteroidSpeed, asteroidArray } = gameStateRef
    // const { bgImage, gameMusic } = assets

    let bgImage = new Image(); // bgImage.onload = () => {loadProgress += 1}
    bgImage.src = "images/background/background.png"

    function addAsteroid () {gameStateRef.current.asteroidArray.push(new Asteroid(context, canvas, maxAsteroidSpeed))}
    // function checkPlayerExplode() {return gameState.player.explode}
    // const { bgImage, asteroidFieldImage, asteroidImage, collectibleImage, bulletImage, playerImage, gameMusic, gameOverSound, buttonClickSound, buttonHoverSound, thrusterSound, collectedPodSound, shootSound, asteroidExplosionSound, collisionSound, electricitySound, explosionSound } = assets

    // Initialize game objects here
    gameState.asteroidField1 = new AsteroidField(0, 0, 0 - context.canvas.height, 10, context, canvas, gameStateRef)
    gameState.asteroidField2 = new AsteroidField(0, 1, 0, 10, context, canvas, gameStateRef)
    gameState.asteroidField3 = new AsteroidField(1, 0, 0 - context.canvas.height, 40, context, canvas, gameStateRef)
    gameState.asteroidField4 = new AsteroidField(1, 1, 0, 40, context, canvas, gameStateRef)
    gameState.collectible = new Collectible(context, canvas, gameStateRef, addAsteroid)
    gameState.player = new Player(context, canvas, gameStateRef)
    for (let i = 0; i < 4 + gameState.difficulty; i++) addAsteroid() // gameState.addAsteroid(context, canvas)

    const render = (delta) => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height)
      context.drawImage(bgImage, 0, 0, 900, 900)
    //   $(gameMusic).trigger('play')

      gameState.asteroidField1.update(delta / 1000)
      gameState.asteroidField1.draw()
      gameState.asteroidField2.update(delta / 1000)
      gameState.asteroidField2.draw()
      gameState.asteroidField3.update(delta / 1000)
      gameState.asteroidField3.draw()
      gameState.asteroidField4.update(delta / 1000)
      gameState.asteroidField4.draw()

      for (let i = 0; i < gameState.asteroidArray.length; i++) {
        gameState.asteroidArray[i].update(delta / 1000)
        gameState.asteroidArray[i].draw()
      }

      gameState.collectible.update(delta / 1000)
      gameState.collectible.draw()

      gameState.player.update(delta / 1000)
      gameState.player.draw()

      let remove = -1
      for (let i = 0; i < gameState.bulletArray.length; i++) {
        if (gameState.bulletArray[i].update(delta / 1000)) remove = i
        gameState.bulletArray[i].draw()
      }
      if (remove > -1) gameState.bulletArray.splice(remove, 1)

      context.fillStyle = "rgb(250, 250, 250)"
      context.font = "24px Helvetica"
      context.textAlign = "left"
      context.textBaseline = "top"
      context.fillText("LifePods Collected: " + gameState.collected, 32, 32)
    }

    const main = (now) => {
      if (gameState.time == null) {
        gameState.time = now
        context.reset()
        requestAnimationFrame(main)
        return
      }
      const delta = now - gameState.time
      gameState.time = now

      render(delta)
      if (gameState.gameState === true) requestAnimationFrame(main)
      else {
        // $(gameMusic).trigger('pause')
        // Handle game over logic here
      }
    }

    requestAnimationFrame(main)
  }, [])

  return { startGame }
}

export default useGame