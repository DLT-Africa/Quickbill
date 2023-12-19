import { Box } from '@chakra-ui/react'
import InvoiceCon from '../components/InvoiceCon'
import NavBar from '../Components/NavBar'
import SidebarWithHeader from '../components/SidebarWithHeader'

const InvoiceMe = () => {
  return (
    <SidebarWithHeader>


      {/* <NavBar/> */}
      <InvoiceCon />

    </SidebarWithHeader>

  )
}

export default InvoiceMe