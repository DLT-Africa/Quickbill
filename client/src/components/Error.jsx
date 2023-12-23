import { Box, Button, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <Box px={20} py={10} h={"100vh"}>
      <Flex
        px={8}
        bg={"#fff"}
        justifyContent={"space-between"}
        borderRadius={8}
        alignItems={"center"}
      >
        <Flex flexDir={"column"} justifyContent={"center"} px={10} gap={8}>
          <Flex flexDir={"column"} alignItems={"center"}>
            <Flex flexDir={"column"}>
              <Text fontWeight={700} fontSize={"5xl"}>
                Oops....
              </Text>
              <Text fontSize={"3xl"} fontWeight={400}>
                Page not found
              </Text>
              <Text fontSize={"xl"} fontWeight={300} color={"#4B4B4B"}>
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
              size={'lg'}
              color={"#f5f5f5"}
            >
              Back to home
            </Button>
          </Link>
        </Flex>
        <Image src="/404.png" alt="404" />
      </Flex>
    </Box>
  );
};

export default Error;
