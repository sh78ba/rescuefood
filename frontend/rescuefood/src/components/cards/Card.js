import React from 'react';
import { useNavigate } from 'react-router';

const Card = (props) => {
  const navigate=useNavigate();
  return (
    <div className='w-11/12 sm:w-1/3 lg:w-1/6 border-2  text-center  rounded-2xl shadow-lg my-4 transition-transform transform hover:scale-105'>
      <h1 className='text-2xl font-semibold text-black my-3'>{props.heading}</h1>
      <img 
        src={props.imagelink} 
        alt="card-img" 
        className='h-40 w-full object-cover rounded-t-lg shadow-md'
      />
      <button onClick={()=>{navigate(props.link)}}
        className="mt-3 mb-6 text-2xl px-6 py-2 rounded-full text-black focus:outline-none transform transition duration-300 bg-blue-600 hover:bg-blue-500"
      >
        {props.buttonname}
      </button>
    </div>
  );
};

export default Card;
