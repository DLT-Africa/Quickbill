import NavBar from '../Components/NavBar'
import HeroSec from '../Components/HeroSec'
import { Box } from '@chakra-ui/react'
import PayrollCon from '../Components/PayrollCon'
import Container from '../Components/Container'
import Faq from '../Components/Faq'
import Footer from '../Components/Footer'

const HomePage = () => {
  return (
    <Box bg={'#eeeeee'}>
      <NavBar />
      <HeroSec />
      <PayrollCon />
      <Container />
      <Faq />
      <Footer />
    </Box>
  )
}

export default HomePage