import {
  Box,
  Button,
  Flex,
  Hide,
  Image,
  Img,
  Show,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HeroSec = () => {
  return (
    <>
      <Flex
        px={{ base: 8, md: 20 }}
        justifyContent={{ md: "space-between" }}
        alignItems={"center"}
        gap={{ md: 10, lg: 5 }}
        w={"full"}
      >
        <Flex flexDir={"column"} w={586} gap={{ md: 2, lg: 1 }} justifyContent={'center'}>
          <Text
            fontSize={{ base: "3xl", md: "3xl", lg: "4xl" }}
            fontWeight={600}
          >
            Set your business up with modern{" "}
            <span className="landingPageSpan">payroll</span>, and more
          </Text>
          <Hide above="md">
            <Image
            my={6}
              objectFit={'cover'}
              display={{ md: "none" }}
              src="/Moneyverse Business Balance.svg"
            />
          </Hide>
          <Text
            fontSize={{ base: "lg", md: "lg", lg: "xl" }}
            fontWeight={400}
            color={"#434E58"}
          >
            Behind every successful business is a thriving team. Hire, pay,
            insure, and support your employees with Payoll's all-in-one people
            platform.
          </Text>
          <Link to={"/auth"}>
            <Button
              bg={"#2970FF"}
              color={"#F6F6F6"}
              mt={5}
              size={{ base: "md", md: "lg" }}
              h={{ base: "35px", md: "50px" }}
              w={{ base: 200, md: 220 }}
              transition={"all 1s"}
              fontSize={{ base: 'md', md: "xl" }}
              _hover={{
                bg: useColorModeValue("#599cff"),
              }}
            >
              Get started now
            </Button>
          </Link>
        </Flex>

        <Show above="md">
          <Image
          
            objectFit={'cover'}
            w={{ md: 320, lg: 420 }}
            src="/Moneyverse Business Balance.svg"
          />
        </Show>
      </Flex>
      <Hide below="md">
        <Flex
          w={"full"}
          flexDir={{ base: "column", md: "column" }}
          justifyContent={"center"}
          alignItems={"center"}
          h={131}
          bg={"#fff"}
          mt={10}
        >
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            direction={{ base: "column", sm: "row" }}
            wrap={{ base: "nowrap", sm: "wrap" }}
            gap={{ base: 15, md: 30, lg: 150 }}
          >
            <Text fontSize={{ base: "sm", md: "xl", lg: "2xl" }} fontWeight={400}>
              Our customer says
            </Text>
            <Flex alignItems={"center"} gap={5} direction={{ base: "row", sm: "row" }}>
              <Text
                fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                fontWeight={{ base: 500, md: 500, lg: 700 }}
              >
                Excellent
              </Text>
              <Img sizes="sm" src="/Review.svg" />
              <Text
                fontSize={{ base: "sm", md: "xl", lg: "2xl" }}
                fontWeight={{ base: 300, md: 500, lg: 700 }}
              >
                436 reviews on
              </Text>
              <Box display={"flex"} alignItems={'center'} direction={{ base: "column", sm: "row" }}>
                <Image src="/star.svg" />
                <Text
                  fontSize={{ base: "20px", md: "xl", lg: "2xl" }}
                  fontWeight={{ base: 300, md: 500, lg: 700 }}
                >
                  Trustpilot
                </Text>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Hide>
    </>
  );
};

export default HeroSec;
