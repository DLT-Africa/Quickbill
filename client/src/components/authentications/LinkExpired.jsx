import React from "react";
import {
  Box,
  Flex,
  Center,
  Text,
  Stack,
  Button,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const LinkExpired = () => {
  const navigate = useNavigate();
  return (
    <>
      <Flex
        bg={"red.100"}
        flexDirection={"column"}
        justifyContent={"center"}
        py={{ base: 5, md: 10, lg: 20 }}
        px={{ base: 2, md: 5, lg: 8 }}
        alignItems={"center"}
      >
        <IconButton
          isRound={true}
          variant="solid"
          colorScheme="red"
          aria-label="Done"
          fontSize="20px"
          icon={<CloseIcon />}
        />

        <Text
          as={"h1"}
          fontWeight={{ base: 400, md: 600, lg: 800 }}
          fontSize={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl" }}
          mt={5}
          color={"red.400"}
        >
          {" "}
          Authentication failed! Your activation link may have expired. Please{" "}
        </Text>
        <Text
          as={"h1"}
          fontWeight={{ base: 400, md: 600, lg: 800 }}
          fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
          color={"red.400"}
        >
          {" "}
          signup with your details again.{" "}
        </Text>
      </Flex>

      <Center py={6}>
        <Box
          maxW={{ base: "80%", sm: "25rem", md: "35rem" }}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Stack
            textAlign={"center"}
            p={6}
            color={useColorModeValue("gray.800", "white")}
            align={"center"}
          >
            <Text
              fontSize={{ base: "sm", md: "md", lg: "xl" }}
              fontWeight={800}
              bg={useColorModeValue("blue.50", "green.900")}
              p={2}
              px={3}
              color={"black.500"}
              rounded={"full"}
            >
              Activation Link Expired
            </Text>
          </Stack>

          <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
            <Text fontSize={{ base: "md", md: "xl", lg: "2xl" }}>
              Activation link access expires after 10 minutes and can only be
              used once
            </Text>

            <Button
              mt={10}
              w={"full"}
              bg={"blue.400"}
              color={"white"}
              fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
              rounded={"xl"}
              onClick={() => navigate("/auth")}
              boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
              _hover={{
                bg: "blue.500",
              }}
              _focus={{
                bg: "blue.500",
              }}
            >
              Back to login
            </Button>
          </Box>
        </Box>
      </Center>
    </>
  );
};

export default LinkExpired;
