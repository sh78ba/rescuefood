import React from 'react'
import logo from "./images/logo.png"
import { Link } from "react-router";

const Header = () => {
  return (
    <div className=''>
     <ul className='flex justify-around text-2xl text-white py-4'>
       <Link to="/">
       <li className=' p-1 rounded-lg cursor-pointer hover:bg-green-600 content-center'>
           <img src={logo} alt="logo" className='h-10 rounded-lg' />
        </li>
        </Link>
        <Link to="/">
        <li className=' p-1 rounded-lg cursor-pointer hover:bg-green-600 content-center'>
            Home
        </li>
        </Link>
        <Link to="/topdonors">
        <li className=' p-1 rounded-lg cursor-pointer hover:bg-green-600 content-center'>
            Top Donors
        </li>
        </Link>

        <li className=' p-1 rounded-lg cursor-pointer hover:bg-green-600 content-center'>
           Stories
        </li>
        <li className='bg-orange-500 p-1 rounded-lg hover:bg-orange-400 content-center cursor-pointer'>
          Register
        </li>
        <li className='bg-orange-500 p-1 rounded-lg hover:bg-orange-400 content-center cursor-pointer'>
            Donate Now
        </li>
     </ul>
    </div>
  )
}

export default Header