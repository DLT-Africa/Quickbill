import NavBar from '../components/NavBar'
import HeroSec from '../components/HeroSec'
import { Box } from '@chakra-ui/react'
import PayrollCon from '../components/PayrollCon'
import Container from '../components/Container'
import Faq from '../components/Faq'
import Footer from '../components/Footer'

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
