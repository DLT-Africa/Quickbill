import { Box, Button, Flex, Image, Img, Text, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HeroSec = () => {
  return (
    <>
      <Flex
        pr={20}
        pl={10}
        justifyContent={'space-between'}
        // gap={"186px"}
        w={'full'}
        fontFamily={"roboto"}
        mt={50}
      >
        <Flex flexDir={"column"} w={586} gap={5}>
          <Text fontSize={'5xl'} fontWeight={600}>
            Set your business up with modern <span className="landingPageSpan">payroll</span>, and more
          </Text>
          <Text fontSize={'2xl'} fontWeight={400} color={"#434E58"}>
            Behind every successful business is a thriving team. Hire, pay,
            insure, and support your employees with Payoll's all-in-one people
            platform.
          </Text>
          <Link to={'/auth'}>
            <Button
              bg={"#2970FF"}
              color={"#F6F6F6"}
              size={'lg'}
              h={'80px'}
              w={330}
              transition={'all 1s'}
              fontSize={'xl'}
              _hover={{
                bg: useColorModeValue("#599cff"),
              }}
            >
              Get started now
            </Button>
          </Link>
        </Flex>

        <Image src="/Moneyverse Business Balance.svg" />
      </Flex>
      <Flex w={"full"} justifyContent={"center"} alignItems={"center"} h={131} bg={'#fff'} mt={10}>
        <Flex justifyContent={'center'} alignItems={'center'} gap={150}>
          <Text fontSize={'2xl'} fontWeight={400}>Our customer says</Text>
          <Flex alignItems={'center'} gap={5}>
            <Text fontSize={'2xl'} fontWeight={700}>Excellent</Text>
            <Img src="/Review.svg"/>
          <Text fontSize={'2xl'} fontWeight={400}>436 reviews on</Text>
         <Box display={'flex'} flexDir={'row'}>
            <Image src="/star.svg"/>
            <Text fontSize={'2xl'} fontWeight={400}>Trustpilot</Text>
         </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default HeroSec;
