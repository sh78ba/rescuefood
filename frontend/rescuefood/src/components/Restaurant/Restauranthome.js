import React from 'react'
import RestaurantCard from '../cards/RestaurantCard'

const Restauranthome = () => {
  return (
    <div className='p-3'>
        <div className='justify-around flex mt-5'>
           <div>
           <RestaurantCard/>
           </div>

           <div>
           <RestaurantCard/>
           </div>

           <div>
           <RestaurantCard/>
           </div>
           <div>
           <RestaurantCard/>
           </div>
          
        </div>
        <div className='mt-5  text-center  flex justify-around  '>
           <div className='border-2 border-black  flex flex-col content-center p-3 w-1/3 rounded-lg text-2xl'>
           <input className='outline-none mt-3 p-2 rounded-lg' type='text' placeholder='Enter foods separated by comma'/>
           <input className='outline-none mt-3 p-2 rounded-lg' type='text' placeholder='Amount in Kg'/>
           <button className='mt-3 bg-orange-400 px-3 py-2 rounded-lg inline-block'>Request Order</button>
           </div>

           <div className=' w-1/3 border-2 border-black rounded-lg'>
            <h1 className='text-2xl'>Order History</h1>
            <div className=''>
               <div className='flex w-full justify-between px-2 mt-2'>
               <p >Name....dndh.</p>
                <p>5 kg</p>
                <p>12/12/2024</p>
                <button className='bg-orange-400 rounded-lg px-2 '>Track</button>
               </div>
               <div className='flex w-full justify-between px-2 mt-2'>
               <p >Name....dndh.</p>
                <p>7 kg</p>
                <p>01/11/2024</p>
                <button className='bg-orange-400 rounded-lg px-2 '>Delivered</button>
               </div>
            </div>
           </div>
          
        </div>
    </div>
  )
}

export default Restauranthome