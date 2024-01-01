import React from 'react'
import {
    Box,
    Flex,
    Center,
    Text,
    Stack,
    List,
    ListItem,
    ListIcon,
    Button,
    IconButton,
    useColorModeValue,
  } from '@chakra-ui/react'
  import { CheckIcon } from '@chakra-ui/icons'
 


const AccountConfirmation = () => {
  return (
    <>

    <Flex  bg={"#EBF5FE"} flexDirection={"column"}
    justifyContent={"center"}
    alignItems={"center"}>

<IconButton
  isRound={true}
  variant='solid'
  colorScheme='blue'
  aria-label='Done'
  fontSize='20px'
  icon={<CheckIcon />}
  mt={20}
/>
        
    <Text as={"h1"} fontWeight={800} mt={5} 
   > Your Account has been </Text>
    <Text as={"h1"} fontWeight={800} 
   > succesfully created </Text>
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
          p={6}
          color={useColorModeValue('gray.800', 'white')}
          align={'center'}>
          <Text
            fontSize={'sm'}
            fontWeight={500}
            bg={useColorModeValue('blue.50', 'green.900')}
            p={2}
            px={3}
            color={'blue.500'}
            rounded={'full'}>
            Check your e-mail inbox now...
          </Text>
        </Stack>

        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
         <Text>
            We've sent a verification link to your email address. 
            Please check your email inbox or spam folder and verify your email address within 10 minutes. 
         </Text>

          <Button
            mt={10}
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
        </Box>
      </Box>
    </Center>

</>
  )
}

export default AccountConfirmation