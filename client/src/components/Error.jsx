import {
  Box,
  Button,
  Center,
  Flex,
  Hide,
  Image,
  Show,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <Flex overflowX={'hidden'} alignItems={"center"} justifyContent={"center"}>
        <Flex
          px={8}
          py={{ base: 8, md:10 }}
          w={{ base: "80%" }}
          bg={"#fff"}
          justifyContent={"space-between"}
          borderRadius={8}
          alignItems={"center"}
        >
          <Flex
            flexDir={"column"}
            justifyContent={"center"}
            px={{ base: 4, md: 10 }}
            gap={8}
          >
            <Show below="md">
              <Image src="/404.png" alt="404" />
            </Show>
            <Flex flexDir={"column"} alignItems={"center"}>
              <Flex flexDir={"column"}>
                <Text
                  fontWeight={700}
                  fontSize={{ base: "2xl", md: "3xl", lg: "5xl" }}
                >
                  Oops....
                </Text>
                <Text
                  fontSize={{ base: "lg", md: "2xl", lg: "3xl" }}
                  fontWeight={400}
                >
                  Page not found
                </Text>
                <Text
                  fontSize={{ base: "md", md: "lg", lg: "xl" }}
                  fontWeight={300}
                  color={"#4B4B4B"}
                >
                  This Page doesn`t exist or was removed! <br /> We suggest you
                  back to home.
                </Text>
              </Flex>
            </Flex>
            <Link to={"/"}>
              <Button
                transition={"all 1s"}
                bg={"#2970ff"}
                _hover={{
                  bg: useColorModeValue("#599cff"),
                }}
                size={{ base: "md", lg: "lg" }}
                color={"#f5f5f5"}
              >
                Back to home
              </Button>
            </Link>
          </Flex>
          <Hide below="md">
            <Image src="/404.png" w={{ md: "250px", lg: "full" }} alt="404" />
          </Hide>
        </Flex>
      </Flex>
    </>
  );
};

export default Error;
