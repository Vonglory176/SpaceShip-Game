import { useState, useEffect } from 'react'

const useLoadAssets = () => {
  const [progress, setProgress] = useState(0)
  const [assets, setAssets] = useState(null)

  useEffect(() => {
    const totalAssets = 14 // Total number of assets to load
    let loadedAssets = 0

    const updateProgress = () => {
      loadedAssets += 1
      setProgress((loadedAssets / totalAssets) * 100)
    }

    // Audio assets
    const gameStartSound = new Audio('sounds/GameStart.wav')
    gameStartSound.volume = 0.5
    gameStartSound.onloadeddata = updateProgress

    const gameMusic = new Audio('sounds/GameMusic.wav')
    gameMusic.volume = 0.3
    gameMusic.onloadeddata = updateProgress

    const gameOverSound = new Audio('sounds/GameOver.wav')
    gameOverSound.volume = 0.5
    gameOverSound.onloadeddata = updateProgress

    const buttonClickSound = new Audio('sounds/ButtonClick.wav')
    buttonClickSound.volume = 0.5
    buttonClickSound.onloadeddata = updateProgress

    const buttonHoverSound = new Audio('sounds/ButtonHover.wav')
    buttonHoverSound.volume = 0.5
    buttonHoverSound.onloadeddata = updateProgress

    const thrusterSound = new Audio('sounds/Thruster.mp3')
    thrusterSound.volume = 0.9
    thrusterSound.onloadeddata = updateProgress

    const collectedPodSound = new Audio('sounds/CollectedPod.wav')
    collectedPodSound.volume = 0.5
    collectedPodSound.onloadeddata = updateProgress

    const shootSound = new Audio('sounds/Shoot.wav')
    shootSound.volume = 0.5
    shootSound.onloadeddata = updateProgress

    const asteroidExplosionSound = new Audio('sounds/AsteroidExplosion.wav')
    asteroidExplosionSound.volume = 0.5
    asteroidExplosionSound.onloadeddata = updateProgress

    const collisionSound = new Audio('sounds/AsteroidCollision.wav')
    collisionSound.volume = 0.5
    collisionSound.onloadeddata = updateProgress

    const electricitySound = new Audio('sounds/Electricity.wav')
    electricitySound.volume = 0.5
    electricitySound.onloadeddata = updateProgress

    const explosionSound = new Audio('sounds/Explosion.wav')
    explosionSound.volume = 0.5
    explosionSound.onloadeddata = updateProgress

    // Image assets
    const bgImage = new Image()
    bgImage.onload = updateProgress
    bgImage.src = "images/background/background.png"

    const asteroidFieldImage = new Image()
    asteroidFieldImage.onload = updateProgress
    asteroidFieldImage.src = "images/background/asteroidFieldBackgroundImage3.png"

    const asteroidImage = new Image()
    asteroidImage.onload = updateProgress
    asteroidImage.src = "images/asteroids/asteroidSpriteSheet2.png"

    const collectibleImage = new Image()
    collectibleImage.onload = updateProgress
    collectibleImage.src = "images/lifepod/lifepodSpriteSheet.png"

    const bulletImage = new Image()
    bulletImage.onload = updateProgress
    bulletImage.src = "images/bullet.png"

    const playerImage = new Image()
    playerImage.onload = updateProgress
    playerImage.src = "images/spaceship/spaceShipSpriteSheet5.png"

    setAssets({
      gameStartSound,
      gameMusic,
      gameOverSound,
      buttonClickSound,
      buttonHoverSound,
      thrusterSound,
      collectedPodSound,
      shootSound,
      asteroidExplosionSound,
      collisionSound,
      electricitySound,
      explosionSound,
      bgImage,
      asteroidFieldImage,
      asteroidImage,
      collectibleImage,
      bulletImage,
      playerImage,
    })
  }, [])

  return { progress, assets }
}

export default useLoadAssets