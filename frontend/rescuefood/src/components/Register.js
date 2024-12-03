import React from 'react'

const Register = () => {
  return (
   
    <div className='flex flex-col  my-40 mx-auto w-5/6 md:w-1/3 border-2 border-green-500 p-5 ' >
        <button className='bg-orange-400 px-3 py-2 my-1 rounded-lg  hover:text-white'>
            Restaurant
        </button>
        <button className='bg-orange-400 px-3 py-2 my-1 rounded-lg  hover:text-white' >
            Volunteer
        </button>
        <button className='bg-orange-400 px-3 py-2 my-1 rounded-lg  hover:text-white' >
            Individual
        </button>
    </div>
  
  )
}

export default Register