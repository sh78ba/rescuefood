import React, {useState } from 'react'

const LoginSignup = (props) => {

    const [isloginform,setisloginform]=useState("true");
  
    const toggleLoginform=()=>{
        setisloginform(!isloginform);
    }

  return (
    <div>
        <div className='w-1/3 content-center mx-auto  border-2 border-green-700 mt-5 rounded-lg '>
<div className='my-3'>
    <h1 className='text-3xl text-center'>{props.heading}</h1>
</div>
<div className='mt-3 bg-white p-4 rounded-lg'>
    <div className='flex flex-col p-2'>
   
        <input className='my-3 px-3 py-2 outline-none rounded-lg border-2' type='email' placeholder='email'></input>
        <input className='my-3 px-3 py-2 outline-none rounded-lg border-2' type='password' placeholder='password'></input> 

        {!isloginform&&<input className='my-3 px-3 py-2 outline-none rounded-lg border-2' type='password' placeholder='confirm password'></input>}
        
    </div>
    <div>
        <p className='text-sm text-green-500'>{isloginform&&"Forgot Password ?"} </p>
    </div>
    <div className='text-center mt-2'>
        <button className='text-white bg-green-500 px-4 py-2 w-3/4 rounded-lg'>{isloginform?"Login":"SignUp"}</button>
    </div>
    <div className='mt-2'>
        <p className='text-sm text-black'>{isloginform?"Not a member ?":"Already a member" }<span className='text-green-500 cursor-pointer' onClick={toggleLoginform}>{isloginform?"SignUp Now":"SignIn Now"}</span></p>
    </div>
</div>
</div>
    </div>
  )
}

export default LoginSignup