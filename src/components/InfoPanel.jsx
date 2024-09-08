import React from 'react'
import objectiveCollect from '../assets/images/objectiveCollect.png'
import arrowKeys from '../assets/images/arrowKeys.png'
import spaceBar from '../assets/images/spaceBar.png'

const InfoPanel = () => {
  return (
    <div id="infoPanel" className="flex-col justify-center p-2 items-center arounded bg-purple-800 bg-opacity-50 hidden md:flex">
        <h2>Objective</h2>
        <p>You're a rescue ship responding to an emergency call, navigate an asteroid field to collect as many lifepods as you can!
            Be careful though, things might get harder the better you do..</p>
        <img src={objectiveCollect} className="img-fluid" />
        <h2>Controls</h2>
        <p>Arrow-Keys to move</p>
        <img src={arrowKeys} className="img-fluid" />
        <p>Space to shoot</p>
        <img src={spaceBar} className="img-fluid" />
    </div>
  )
}

export default InfoPanel
