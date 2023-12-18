import { Box, Flex, Text } from "@chakra-ui/react"

const Footer = () => {
  return (
    <>
      <Flex as={'footer'} w={'full'} bg={'#C6D9FE'} justifyContent={'space-between'}>
        <Flex flexDir={'column'} gap={10}>
            <Text as={'h1'} fontSize={'2xl'}>HOW IT WORKS</Text>
            <Box>
              <Text as={'h1'} fontSize={'xl'}>HOW IT WORKS</Text>
              <Text as={'h1'} fontSize={'xl'}>HOW IT WORKS</Text>
            </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default Footer