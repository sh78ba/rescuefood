import React from 'react'
import RestaurantCard from '../cards/RestaurantCard'

const Restauranthome = () => {
  return (
    <div className='p-3  content-center text-center'>
        <div className='justify-around flex mt-5 flex-wrap flex-col  sm:flex-row content-center'>
           <div className='my-2' >
           <RestaurantCard/>
           </div>

           <div className='my-2' >
           <RestaurantCard/>
           </div>

           <div className='my-2' >
           <RestaurantCard/>
           </div>
           <div className='my-2' >
           <RestaurantCard/>
           </div>
          
        </div>
        <div className='mt-5  text-center  flex justify-around  flex-col sm:flex-row content-center mx'>
           <div className='border-2 border-black  flex flex-col content-center p-3  rounded-lg text-2xl my-2'>
           <input className='outline-none mt-3 p-2 rounded-lg' type='text' placeholder='Enter foods separated by comma'/>
           <input className='outline-none mt-3 p-2 rounded-lg' type='text' placeholder='Amount in Kg'/>
           <button className='mt-3 bg-orange-400 px-3 py-2 rounded-lg inline-block'>Request Order</button>
           </div>

           <div className='  border-2 border-black rounded-lg my-2 p-3 '>
            <h1 className='text-2xl'>Order History</h1>
            <div className=''>
               <div className='flex  justify-between px-2 mt-2 '>
               <p className='md:mx-3'>Name....dndh.</p>
                <p className='md:mx-3'>5 kg</p>
                <p className='md:mx-3'>12/12/2024</p>
                <button className='bg-orange-400 rounded-lg px-2 md:mx-3'>Track</button>
               </div>
               <div className='flex  justify-between px-2 mt-2 '>
               <p className='md:mx-3' >Name....dndh.</p>
                <p className='md:mx-3'>7 kg</p>
                <p className='md:mx-3'>01/11/2024</p>
                <button className='bg-orange-400 rounded-lg px-2 md:mx-3'>Delivered</button>
               </div>
            </div>
           </div>
          
        </div>
    </div>
  )
}

export default Restauranthome