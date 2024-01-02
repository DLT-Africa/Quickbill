import {
  Box,
  Flex,
  Center,
  Stack,
  Text,
  Button,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

const ActivatePage = () => {
  return (
    <>

      <Flex bg={"#EBF5FE"} flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}>

        <IconButton
          isRound={true}
          variant='solid'
          // colorScheme='blue'
          bg={'#3D843C'}
          color={'#fff'}
          aria-label='Done'
          fontSize='20px'
          icon={<CheckIcon />}
          mt={20}
        />

        <Text as={"h1"} fontWeight={800} mt={5} fontSize={'2xl'}
         > Your Email has been Verified</Text>
      </Flex>

      <Center py={6}>
        <Box
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}>
          <Stack
            textAlign={'center'}
            p={8}
            color={'#3D843C'}
            align={'center'}>
            <Text
              fontSize={'3xl'}
              fontWeight={800}
              p={2}
              px={3}
              color={'black.500'}
              >
              Activated
            </Text>
          </Stack>

          <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10} >
            <Text fontSize={'lg'}>
              Your email has been verified. You can continue by Login
            </Text>

            <Link to={'/auth'}>
              <Button
                mt={10}
                size={'lg'}
                w={'full'}
                bg={'blue.400'}
                color={'white'}
                rounded={'xl'}
                boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }} >
                Back to login
              </Button>
            </Link>
          </Box>
        </Box>
      </Center>

    </>
  )
}

export default ActivatePage