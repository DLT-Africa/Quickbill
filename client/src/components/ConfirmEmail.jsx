import React from "react";
import { Box, Flex, Text, Image, Button, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const ConfirmEmail = () => {
  return (
    <Box
      py={8}
      px={8}
      bg={"#fff"}
      borderRadius={"1px solid black"}
      h={'100vh'}
    >
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
        gap={10}
      >
        <Flex
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image src="/confirmation-removebg-preview.png" />
          <Box>
            <Text fontSize={"4xl"} color={'#2970FF'}>Confirmation email successful sent.</Text>
            <Text fontSize={"2xl"}>
              Please check your email for the verification.
            </Text>
          </Box>
        </Flex>
        <Link to={'/auth'}>
        <Button
          size={"lg"}
          transition={'all 1s'}
          fontSize={'xl'}
          _hover={{
            bg: useColorModeValue("#599cff"),
          }}
          bg={"#2970FF"}
          color={"#F6F6F6"}
        >
          BACK TO LOGIN
        </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default ConfirmEmail;
