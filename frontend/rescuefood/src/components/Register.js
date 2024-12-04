import React from 'react'
import { Link } from 'react-router'

const Register = () => {
  return (
   
    <div className='flex flex-col  my-40 mx-auto w-5/6 md:w-1/3 border-2 border-green-500 p-5 text-center ' >
      <ul>
     <Link to="/register/restaurant"> <li className='bg-orange-400 px-3 py-2 my-1 rounded-lg  hover:text-white cursor-pointer'>
            Restaurant
        </li>
        </Link>
        <li className='bg-orange-400 px-3 py-2 my-1 rounded-lg  hover:text-white cursor-pointer' >
            Volunteer
        </li>
        <li className='bg-orange-400 px-3 py-2 my-1 rounded-lg  hover:text-white cursor-pointer' >
            Individual
        </li>
      </ul>
    </div>
  
  )
}

export default Register