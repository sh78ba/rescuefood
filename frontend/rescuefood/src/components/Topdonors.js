import React from 'react'
import DonorCard from './cards/DonorCard'

const Topdonors = () => {
  return (
    <div>
        <h1 className='text-3xl mt-2 text-center'>Top Restaurant Donors</h1>
        <div className='justify-around flex py-2 flex-wrap'>
        
        <div>
        <DonorCard/>
        </div>
        <div>
        <DonorCard/>
        </div>
        <div>
        <DonorCard/>
        </div>
        <div>
        <DonorCard/>
        </div>
        <div>
        <DonorCard/>
        </div>
        <div>
        <DonorCard/>
        </div>
        <div>
        <DonorCard/>
        </div>
        <div>
        <DonorCard/>
        </div>
        <div>
        <DonorCard/>
        </div>
        <div>
        <DonorCard/>
        </div>
    </div>
   <div className='text-right'>
   <button className='mr-16 bg-orange-400 px-3 rounded-lg'>More</button>
   </div>

    <h1 className='text-3xl mt-2 text-center'>Top Individual Donors</h1>
        <div className='justify-around flex py-2 flex-wrap'>
        
        <div>
        <DonorCard/>
        </div>
        <div>
        <DonorCard/>
        </div>
        <div>
        <DonorCard/>
        </div>
        <div>
        <DonorCard/>
        </div>
        <div>
        <DonorCard/>
        </div>
        <div>
        <DonorCard/>
        </div>
        <div>
        <DonorCard/>
        </div>
        <div>
        <DonorCard/>
        </div>
        <div>
        <DonorCard/>
        </div>
        <div>
        <DonorCard/>
        </div>
    </div>
    <div className='text-right'>
   <button className='mr-16 bg-orange-400 px-3 rounded-lg'>More</button>
   </div>

    </div>
  )
}

export default Topdonors