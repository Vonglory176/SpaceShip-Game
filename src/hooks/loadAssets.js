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

    const loadAudio = (src, volume = 0.5) => {
      return new Promise((resolve) => {
        const audio = new Audio(src)
        audio.volume = volume
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
      loadAudio(gameStartSound, 0.5),
      loadAudio(gameMusic, 0.2),
      loadAudio(gameOverSound, 0.5),
      loadAudio(buttonClickSound, 0.4),
      loadAudio(buttonHoverSound, 0.4),
      loadAudio(thrusterSound, 0.9),
      loadAudio(collectedPodSound, 0.5),
      loadAudio(shootSound, 0.5),
      loadAudio(asteroidExplosionSound, 0.5),
      loadAudio(collisionSound, 0.5),
      loadAudio(electricitySound, 0.5),
      loadAudio(explosionSound, 0.5),
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
      
      const resetAndPlaySound = (index) => {
        // try {
        //   loadedAudioAssets[index].currentTime = 0
        //   loadedAudioAssets[index].play()
        // } catch (error) {
        //   console.error("Error playing sound:", error)
        // }
        try {
          loadedAudioAssets[index].currentTime = 0
          loadedAudioAssets[index].muted = true // Mute initially
          loadedAudioAssets[index].play().then(() => {
            loadedAudioAssets[index].muted = false // Unmute after play starts
          }).catch((error) => {
            console.error("Error playing sound:", error)
          })
        } catch (error) {
          console.error("Error playing sound:", error)
        }
      }
      const playSound = (index) => loadedAudioAssets[index].play()
      const pauseSound = (index) => loadedAudioAssets[index].pause()
      
      setAssets({
        // sounds: {
        //   gameStart: loadedAudioAssets[0],
        //   gameMusic: loadedAudioAssets[1],
        //   gameOver: loadedAudioAssets[2],
        //   buttonClick: loadedAudioAssets[3],
        //   buttonHover: loadedAudioAssets[4],
        //   thruster: loadedAudioAssets[5],
        //   collectedPod: loadedAudioAssets[6],
        //   shoot: loadedAudioAssets[7],
        //   asteroidExplosion: loadedAudioAssets[8],
        //   collision: loadedAudioAssets[9],
        //   electricity: loadedAudioAssets[10],
        //   explosion: loadedAudioAssets[11],
        // },
        sounds: {
          playGameStart: () => resetAndPlaySound(0),
          playGameOver: () => resetAndPlaySound(2),

          playGameMusic: () => playSound(1),
          pauseGameMusic: () => pauseSound(1),
          
          playButtonClick: () => resetAndPlaySound(3),
          playButtonHover: () => resetAndPlaySound(4),

          playThruster: () => playSound(5),
          pauseThruster: () => pauseSound(5),

          playCollectedPod: () => resetAndPlaySound(6),
          playShoot: () => resetAndPlaySound(7),
          playAsteroidExplosion: () => resetAndPlaySound(8),
          playCollision: () => playSound(9),
          playElectricity: () => playSound(10),
          playExplosion: () => playSound(11),
          stopAllSounds: () => {
            loadedAudioAssets.forEach(audio => {
              audio.pause()
              audio.currentTime = 0
            })
          },
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