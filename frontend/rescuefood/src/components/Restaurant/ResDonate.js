import React from 'react'

const ResDonate = () => {
  return (
    <>
         {/* Donation Request Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg my-8">
        <h2 className="text-2xl font-semibold mb-4">Request Donation</h2>
        <div className="space-y-4">
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500"
            placeholder="Enter foods separated by commas"
           // value={foods}
            //onChange={(e) => setFoods(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500"
            placeholder="Amount in Kg"
            //value={weight}
            //onChange={(e) => setWeight(e.target.value)}
          />
          <button
           // onClick={handleRequestOrder}
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Request Order
          </button>
        </div>
      </div>
      </>
  )
}

export default ResDonate