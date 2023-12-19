import { Box } from '@chakra-ui/react'
import BillCon from '../components/BillCon'
import NavBar from '../Components/NavBar'
import SidebarWithHeader from '../components/SidebarWithHeader'

const BillPage = () => {
  return (
   <SidebarWithHeader>
      {/* <NavBar /> */}
      <BillCon />

      </SidebarWithHeader>
  )
}

export default BillPage