import React from 'react'
import car from "../../images/car-removebg-preview-removebg-preview.png"
const Advertisements = () => {
  return (
    <div className='min-h-[380px] text-white flex flex-col justify-center items-center'>
      <img src={car} alt="car" className='w-[180px] h-[140px] mb-4 drop-shadow-[0_0_50px_white]' />

      <p className='text-black dark:text-white mb-4'>Hazırda elanınız yoxdur !</p>
      
      <button className="h-34 bg-green-500 rounded p-1 ">Elan yerləşdir</button>
      </div>
  )
}

export default Advertisements