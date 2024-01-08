import React from 'react'
import SidebarWithHeader from '../components/SidebarWithHeader'
// import Payroll from '../components/Payroll'
import Payrolls from '@/components/payrolls/Payrolls'

const PayrollPage = () => {
  return (
    <SidebarWithHeader>
          <Payrolls />
    </SidebarWithHeader>
  )
}

export default PayrollPage