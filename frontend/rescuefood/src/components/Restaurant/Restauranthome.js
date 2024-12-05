import React from 'react'
import RestaurantCard from '../cards/RestaurantCard'

const Restauranthome = () => {
  return (
    <div>
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
        <div>
            form
        </div>
    </div>
  )
}

export default Restauranthome