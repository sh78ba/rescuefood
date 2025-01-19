import React from 'react'
import DashboardCards from './DashboardCards'
import RecentOrders from './RecentOrders'
import MonthlyRank from './MonthlyRank'

const ResHome = () => {
  return (
    <>
     <DashboardCards />
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart />
            <CustomerMap />
          </div> */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentOrders />
            <MonthlyRank/>
          </div>
    </>
  )
}

export default ResHome