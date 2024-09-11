import { useRef, useCallback } from 'react'
// import { Player, Bullet, AsteroidField, Asteroid, Collectible } from '../classes/main'
import Player from '../classes/player'
// import Bullet from '../classes/bullet'
import AsteroidField from '../classes/asteroidField'
import Asteroid from '../classes/asteroid'
import Collectible from '../classes/collectible'

const useGame = () => {
    const gameStateRef = useRef({})    

    const resetGameState = (difficulty) => {
        gameStateRef.current = {
            gameState: true,
            // time: null,
            collected: 0,
            difficulty: difficulty || 1,
            maxAsteroidSpeed: difficulty * 200,
            asteroidArray: [],
            collectible: null,
            player: null,
            bulletArray: [],
            asteroidField1: null,
            asteroidField2: null,
            asteroidField3: null,
            asteroidField4: null,
        }
    }

    const startGame = useCallback(async (canvas, ctx, assets, gameDifficulty, getScore) => {

        resetGameState(gameDifficulty)

        // let { current: gameState, difficulty, maxAsteroidSpeed, asteroidArray, asteroidField1, asteroidField2, asteroidField3, asteroidField4, collectible, player, bulletArray, time, collected } = gameStateRef
        const { images, sounds } = assets
        const {background, asteroidField, asteroid, collectible, bullet, player} = images
        const {playGameStart, playGameMusic, pauseGameMusic, playGameOver, playButtonClick, playButtonHover, playThruster, pauseThruster, playCollectedPod, playShoot, playAsteroidExplosion, playCollision, playElectricity, playExplosion, stopAllSounds} = sounds
        // const {gameMusic, gameOver, buttonClick, buttonHover, thruster, collectedPod, shoot, asteroidExplosion, collision, electricity, explosion} = sounds
    
        const addAsteroid = () => {
            gameStateRef.current.asteroidArray.push(new Asteroid(ctx, canvas, gameStateRef.current.maxAsteroidSpeed, gameStateRef.current, asteroid, playAsteroidExplosion))
        }
        
        function collectibleCollision(){ //Include negation for player?
            // let { player, collectible, collected } = this.gameStateRef
            if(
                gameStateRef.current.player.x + gameStateRef.current.player.width/2 >= gameStateRef.current.collectible.x &&
                gameStateRef.current.player.x <= gameStateRef.current.collectible.x + (gameStateRef.current.collectible.size) &&
                gameStateRef.current.player.y + gameStateRef.current.player.height/2 >= gameStateRef.current.collectible.y &&
                gameStateRef.current.player.y <= gameStateRef.current.collectible.y + (gameStateRef.current.collectible.size)&&
                !gameStateRef.current.player.explode
            ) {
                playCollectedPod()

                addAsteroid() // this.ctx, this.canvas
                gameStateRef.current.collected++
                return true
            }    
        }
        function collectibleShot(){
            // let { collectible, bulletArray, collected } = this.gameStateRef
            for (let i=0;i<gameStateRef.current.bulletArray.length;i++){
                if(
                    gameStateRef.current.bulletArray[i].x + gameStateRef.current.bulletArray[i].width/2 >= gameStateRef.current.collectible.x &&
                    gameStateRef.current.bulletArray[i].x <= gameStateRef.current.collectible.x + (gameStateRef.current.collectible.size) &&
                    gameStateRef.current.bulletArray[i].y + gameStateRef.current.bulletArray[i].height/2 >= gameStateRef.current.collectible.y &&
                    gameStateRef.current.bulletArray[i].y <= gameStateRef.current.collectible.y + (gameStateRef.current.collectible.size) && 
                    gameStateRef.current.bulletArray[i].width > 0
                ) {
                    playAsteroidExplosion()

                    gameStateRef.current.bulletArray[i].width = 0
                    gameStateRef.current.collectible.explode = true
                    gameStateRef.current.collectible.frameY = 1
                    gameStateRef.current.collectible.frameX = 0
                    gameStateRef.current.collectible.width = gameStateRef.current.collectible.height = 72
                    gameStateRef.current.collectible.tally = 0
                    gameStateRef.current.collected--
                }
            }
        }

        let time = null

        // Initialize game objects here
        gameStateRef.current.asteroidField1 = new AsteroidField(0, 0, 0 - ctx.canvas.height, 10, ctx, canvas, gameStateRef.current, asteroidField)
        gameStateRef.current.asteroidField2 = new AsteroidField(0, 1, 0, 10, ctx, canvas, gameStateRef.current, asteroidField)
        gameStateRef.current.asteroidField3 = new AsteroidField(1, 0, 0 - ctx.canvas.height, 40, ctx, canvas, gameStateRef.current, asteroidField)
        gameStateRef.current.asteroidField4 = new AsteroidField(1, 1, 0, 40, ctx, canvas, gameStateRef.current, asteroidField)
        gameStateRef.current.collectible = new Collectible(ctx, canvas, gameStateRef.current, addAsteroid, collectible, collectibleCollision, collectibleShot)
        gameStateRef.current.player = new Player(ctx, canvas, gameStateRef.current, player, bullet, playThruster, pauseThruster, playShoot, playCollision, playElectricity, playExplosion, playGameOver, pauseGameMusic)
        for (let i = 0; i < 4 + gameStateRef.current.difficulty; i++) addAsteroid() // addAsteroid(ctx, canvas)

        playGameStart()
        
        const render = (delta) => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            ctx.drawImage(background, 0, 0, 900, 900)

            playGameMusic()

            gameStateRef.current.asteroidField1.update(delta / 1000)
            gameStateRef.current.asteroidField1.draw()
            gameStateRef.current.asteroidField2.update(delta / 1000)
            gameStateRef.current.asteroidField2.draw()
            gameStateRef.current.asteroidField3.update(delta / 1000)
            gameStateRef.current.asteroidField3.draw()
            gameStateRef.current.asteroidField4.update(delta / 1000)
            gameStateRef.current.asteroidField4.draw()

            for (let i = 0; i < gameStateRef.current.asteroidArray.length; i++) {
                gameStateRef.current.asteroidArray[i].update(delta / 1000)
                gameStateRef.current.asteroidArray[i].draw()
            }

            gameStateRef.current.collectible.update(delta / 1000)
            gameStateRef.current.collectible.draw()

            gameStateRef.current.player.update(delta / 1000)
            gameStateRef.current.player.draw()

            let remove = -1
            for (let i = 0; i < gameStateRef.current.bulletArray.length; i++) {
                if (gameStateRef.current.bulletArray[i].update(delta / 1000)) remove = i
                gameStateRef.current.bulletArray[i].draw()
            }
            if (remove > -1) gameStateRef.current.bulletArray.splice(remove, 1)

            ctx.fillStyle = "rgb(250, 250, 250)"
            ctx.font = "24px Helvetica"
            ctx.textAlign = "left"
            ctx.textBaseline = "top"
            ctx.fillText("LifePods Collected: " + gameStateRef.current.collected, 32, 32)
        }

        let timeScale = 0.7

        const main = (now) => {
            // console.log(gameStateRef.current.time, now)
            if (time == null) {
                console.log("HERE")
                time = now
                ctx.reset()
                requestAnimationFrame(main)
                return
            }
            const delta = (now - time) * timeScale
            // console.log(delta, now, time)
            
            // Limit to 60fps (1000ms / 60fps = ~16.67ms per frame)
            if (delta >= 1000 / 60) {
                // console.log("HERE")
                render(delta)
                time = now
            }
                
            if (gameStateRef.current.gameState === true) requestAnimationFrame(main)
            else {
                // stopAllSounds()
                // pauseGameMusic()
                
                console.log(gameStateRef.current.gameState)
                getScore(gameStateRef.current.collected)
                playGameOver()
            }
        }

    requestAnimationFrame(main)
  }, [])

  return { startGame }
}

export default useGame