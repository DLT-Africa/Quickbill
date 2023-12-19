import { Box } from '@chakra-ui/react'
import BillCon from '../components/BillCon'
import NavBar from '../Components/NavBar'

const BillPage = () => {
  return (
    <Box as={'section'} bg={'#eee'}>
      <NavBar />
      <BillCon />
    </Box>
  )
}

export default BillPage