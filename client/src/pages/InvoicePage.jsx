import { Box } from '@chakra-ui/react'
import InvoiceCon from '../components/InvoiceCon'
import NavBar from '../Components/NavBar'

const InvoicePage = () => {
  return (
    <Box as='section' bg={'#eee'}>
      <NavBar/>
      <InvoiceCon />
    </Box>
  )
}

export default InvoicePage