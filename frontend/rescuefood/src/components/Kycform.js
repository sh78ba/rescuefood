import React from 'react'

const Kycform = () => {
  return (
    <div>
        <h1>Kyc Form</h1>
        <form className='flex flex-col'>
            <input type='text' placeholder='Name'/>
            <input type='text' placeholder='Address'/>
            <input type='text' placeholder='GST No'/>
            <input type='text' placeholder='Valid Proof'/>
            

        </form>
    </div>
  )
}

export default Kycform