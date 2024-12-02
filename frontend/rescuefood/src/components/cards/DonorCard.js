import React from 'react'
import profilepic from "../images/profilepic.png"

const DonorCard = () => {
  return (
    <div className='border-2 border-black border-dashed inline-block p-1 content-center text-center mx-10 my-3'>
        <img className="w-40 rounded-lg" src={profilepic} alt='image'>
        </img>
        <h1>Name</h1>
        <h1 className='bg-orange-400 rounded-lg'>KG/Amount</h1>
        </div>
  )
}

export default DonorCard