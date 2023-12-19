import { Box } from '@chakra-ui/react'
import BillSec from '../components/BillSec'
import NavBar from '../Components/NavBar'

const BillPage = () => {
  return (
    <Box as={'section'} bg={'#eee'}>
      <NavBar />
      <BillSec />
    </Box>
  )
}

export default BillPage