import { Box, Flex, Text, Image, Divider, Container, Stack } from "@chakra-ui/react"

const Footer = () => {
  return (
    <>
      <Flex as={'footer'} w={'full'} bg={'#C6D9FE'} justifyContent={'space-between'} px={20} py={20} >

        <Flex flexDir={'column'} gap={10} >
            <Text as={'h1'} fontSize={'2xl'} fontWeight={700}>HOW IT WORKS</Text>
            <Box>
              <Text as={'h1'} fontSize={'sm'} fontWeight={600}>Hire Employees</Text>
              <Text as={'h1'} fontSize={'sm'} fontWeight={600}>Run Global Payroll</Text>
            </Box>
        </Flex>

        <Flex flexDir={'column'} gap={10}>
        <Text as={'h1'} fontSize={'2xl'} fontWeight={700}>SOLUTIONS</Text>
        <Box>
        <Text as={'h1'} fontSize={'sm'} fontWeight={600}>
          Complience <br/> Payments <br/> For Finance Teams
        </Text>
        </Box>
        </Flex>

        <Flex flexDir={'column'} gap={10} >
        <Text as={'h1'} fontSize={'2xl'} fontWeight={700}>RESOURCES</Text>
        <Box>
          <Text as={'h1'} fontSize={'sm'} fontWeight={600}>About</Text>
        </Box>
        </Flex>

        <Flex flexDir={'column'} justifyContent={'center'} pb={50} >
          <Image src='/QuickBill.png' width={40} height={10} />
          <Flex   gap={5} pt={10}>
          <Image src='/insta.png' width={10} height={10}/>
          <Image src='/facebook.png' width={10} height={10}/>
          <Image src='/link.png' width={10} height={10}/>
          <Image src='/twitter.png'width={10} height={10} />
        </Flex>
          </Flex>
      </Flex>

       <Flex orientation="horizontal" borderBottom={'1px solid black'} w={'full'} textAlign={'center'}>
       

       </Flex>

    
       <Container
       
        as={Stack}
        maxW={'full'}
        py={4}
       px={20}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }} bg={'#C6D9FE'}>
        <Text> © Copyright 2023. All Rights Reserved.</Text>
        <Stack direction={'row'} spacing={6} >
          <Box>
          Disclaimer
          </Box>
          <Box>
          Privacy Policy
          </Box>
          <Box >
          Terms of Service
          </Box>
          <Box>
          Cookie policy
          </Box>
        </Stack>
        
      </Container>
     

    </>
  )
}

export default Footer