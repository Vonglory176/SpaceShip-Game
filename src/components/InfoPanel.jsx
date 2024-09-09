import React from 'react'
import objectiveCollect from '../assets/images/objectiveCollect.png'
import arrowKeys from '../assets/images/arrowKeys.png'
import spaceBar from '../assets/images/spaceBar.png'

const InfoPanel = () => {
  return (
    <div id="infoPanel" className="flex flex-col px-2 items-center rounded bg-purple-800 bg-opacity-50">
        
        {/* Objective */}
        <div className="objective flex flex-col gap-2 border-purple-400 rounded-lg p-2 w-full lg:px-0">
            {/* <h3 className='text-center text-2xl'>Objective</h3> */}
            <h3 className='text-blue-300 font-bold text-xl uppercase text-center sm:text-left lg:text-center'>Objective</h3>
            <p className=''> You're a rescue ship responding to an emergency transmission from a nearby asteroid field. Do your best to collect as many lifepods as you can but be careful, the further you venture the more difficult it'll become.</p>
            {/* <img src={objectiveCollect} className="object-contain" /> */}
        </div>

        {/* <hr className='w-full border-purple-400' /> */}
        

        {/* Instructions */}
        <div className="instructions flex flex-wrap flex-row lg:flex-col justify-around items-center gap-4 lg:gap-2 border-purple-400 rounded-lg p-2 lg:px-0 lg:pb-0 w-full">
            {/* <h3 className='text-center text-2xl'>Controls</h3> */}

            <hr className='w-full border-purple-400 ' />

            <div className="flex flex-col items-center gap-2 lg:pb-4">

                <div className="text-center">
                    <h3 className='text-blue-300 font-bold uppercase text-xl'>Move</h3>
                    {/* <p className='text-gray-300'>Arrow-Keys</p> */}
                </div>

                <img src={arrowKeys} className="object-contain max-w-[130px] min-h-[85px]" />

            </div>

            <hr className='w-full border-purple-400 hidden lg:block' />

            <div className="flex flex-col items-center mb-auto">
                <div className="text-center">
                    <h3 className='text-blue-300 font-bold uppercase text-xl'>Shoot</h3>
                    {/* <p className='text-gray-300'>Spacebar</p> */}
                </div>

                <img src={spaceBar} className="object-contain max-w-[130px] min-h-[86px]" />
                
            </div>

            <hr className='w-full border-purple-400 hidden lg:block' />

            <div className="flex flex-col items-center mb-auto">
                <div className="text-center">
                    <h3 className='text-blue-300 font-bold uppercase text-xl'>Collect</h3>
                    {/* <p className='text-gray-300'>Spacebar</p> */}
                </div>

                <img src={objectiveCollect} className="object-contain max-w-[130px] min-h-[86px]" />
                
            </div>
        </div>
    </div>
  )
}

export default InfoPanel
