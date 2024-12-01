import React from 'react'


const Card = (props) => {
  return (
    <div className='w-1/6  border-2 border-green-400 text-center bg-white rounded-2xl my-4'>
        <h1 className=' text-2xl my-3'>{props.heading}</h1>
        <img src={props.imagelink} alt="card-img" className='h-20 w-full' />
        <button
  className={`text-center text-2xl my-3 px-3 py-2 rounded-lg hover:opacity-80 ${
    props.bgcolor === 'orange' ? 'bg-orange-400' : 'bg-green-400'
  }`}
>
  {props.buttonname}
</button>

    </div>
  )
}

export default Card