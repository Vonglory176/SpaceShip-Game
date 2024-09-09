import { useState, useEffect } from 'react'

// Images
import bgImage from '../assets/images/background/background.png'
import asteroidFieldImage from '../assets/images/background/asteroidFieldBackgroundImage3.png'
import asteroidImage from '../assets/images/asteroids/asteroidSpriteSheet2.png'
import collectibleImage from '../assets/images/lifepod/lifepodSpriteSheet.png'
import bulletImage from '../assets/images/bullet.png'
import playerImage from '../assets/images/spaceship/spaceShipSpriteSheet5.png'

// Sounds
import gameStartSound from '../assets/sounds/GameStart.wav'
import gameMusic from '../assets/sounds/GameMusic.wav'
import gameOverSound from '../assets/sounds/GameOver.wav'
import buttonClickSound from '../assets/sounds/ButtonClick.wav'
import buttonHoverSound from '../assets/sounds/ButtonHover.wav'
import thrusterSound from '../assets/sounds/Thruster.mp3'
import collectedPodSound from '../assets/sounds/CollectedPod.wav'
import shootSound from '../assets/sounds/Shoot.wav'
import asteroidExplosionSound from '../assets/sounds/AsteroidExplosion.wav'
import collisionSound from '../assets/sounds/AsteroidCollision.wav'
import electricitySound from '../assets/sounds/Electricity.wav'
import explosionSound from '../assets/sounds/Explosion.wav'

const useLoadAssets = () => {
  const [progress, setProgress] = useState(0)
  const [assets, setAssets] = useState(null)

  useEffect(() => {
    const totalAssets = 18 // Total number of assets to load
    let loadedAssets = 0

    const updateProgress = () => {
      loadedAssets += 1
      setProgress((loadedAssets / totalAssets) * 100)
    }

    const loadAudio = (src) => {
      return new Promise((resolve) => {
        const audio = new Audio(src)
        audio.volume = 0.5
        audio.onloadeddata = () => {
          updateProgress()
          resolve(audio)
        }
      })
    }

    const loadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
          updateProgress()
          resolve(img)
        }
        img.src = src
      })
    }

    // Load all audio assets
    const audioAssets = Promise.all([
      loadAudio(gameStartSound),
      loadAudio(gameMusic),
      loadAudio(gameOverSound),
      loadAudio(buttonClickSound),
      loadAudio(buttonHoverSound),
      loadAudio(thrusterSound),
      loadAudio(collectedPodSound),
      loadAudio(shootSound),
      loadAudio(asteroidExplosionSound),
      loadAudio(collisionSound),
      loadAudio(electricitySound),
      loadAudio(explosionSound),
    ])

    // Load all image assets
    const imageAssets = Promise.all([
      loadImage(bgImage),
      loadImage(asteroidFieldImage),
      loadImage(asteroidImage),
      loadImage(collectibleImage),
      loadImage(bulletImage),
      loadImage(playerImage),
    ])

    Promise.all([audioAssets, imageAssets]).then(([loadedAudioAssets, loadedImageAssets]) => {
      setAssets({
        sounds: {
          gameStart: loadedAudioAssets[0],
          gameMusic: loadedAudioAssets[1],
          gameOver: loadedAudioAssets[2],
          buttonClick: loadedAudioAssets[3],
          buttonHover: loadedAudioAssets[4],
          thruster: loadedAudioAssets[5],
          collectedPod: loadedAudioAssets[6],
          shoot: loadedAudioAssets[7],
          asteroidExplosion: loadedAudioAssets[8],
          collision: loadedAudioAssets[9],
          electricity: loadedAudioAssets[10],
          explosion: loadedAudioAssets[11],
        },
        images: {
          background: loadedImageAssets[0],
          asteroidField: loadedImageAssets[1],
          asteroid: loadedImageAssets[2],
          collectible: loadedImageAssets[3],
          bullet: loadedImageAssets[4],
          player: loadedImageAssets[5],
        },
      })
    }).catch(error => {
      console.error(error)
    })
  }, [])

  return { progress, assets }
}

export default useLoadAssets