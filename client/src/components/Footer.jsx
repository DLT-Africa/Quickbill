import { Box, Flex, Text, Image } from "@chakra-ui/react"

const Footer = () => {
  return (
    <>
      <Flex as={'footer'} w={'full'} bg={'#C6D9FE'} justifyContent={'space-between'} px={20} py={20} >

        <Flex flexDir={'column'} gap={10} borderBottom={'1px'}>
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
    </>
  )
}

export default Footer