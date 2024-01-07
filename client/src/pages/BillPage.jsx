import BillsTable from '@/components/bills/BillsTable'
import BillCon from '../components/BillCon'
import SidebarWithHeader from '../components/SidebarWithHeader'

const BillPage = () => {
  return (
   <SidebarWithHeader>
      {/* <NavBar /> */}
      <BillsTable />

      </SidebarWithHeader>
  )
}

export default BillPage