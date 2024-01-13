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
import { CheckIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const AccountConfirmation = () => {
  const navigate = useNavigate();
  return (
    <>
      <Flex
        bg={"#EBF5FE"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <IconButton
          isRound={true}
          variant="solid"
          colorScheme="blue"
          aria-label="Done"
          fontSize="20px"
          icon={<CheckIcon />}
          mt={{ base: 8, md: 20 }}
        />

        <Text
          as={"h1"}
          fontSize={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl" }}
          fontWeight={{ base: 500, md: 800 }}
          mt={{ base: 2, md: 5 }}
        >
          {" "}
          Your Account has been{" "}
        </Text>
        <Text
          as={"h1"}
          fontSize={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl" }}
          fontWeight={{ base: 500, md: 800 }}
        >
          {" "}
          successfully created{" "}
        </Text>
      </Flex>

      <Center py={6}>
        <Box
          maxW={{ base: "80%", sm: "25rem", md: "35rem" }}
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
              fontSize={{ base: "xs", md: "sm", lg: "md" }}
              fontWeight={{ base: 300, md: 500 }}
              bg={useColorModeValue("blue.50", "green.900")}
              p={2}
              px={3}
              color={"blue.500"}
              rounded={"full"}
            >
              Check your e-mail inbox now...
            </Text>
          </Stack>

          <Box
            bg={useColorModeValue("gray.50", "gray.900")}
            textAlign={"center"}
            fontSize={{ base: "md", md: "xl", lg: "2xl" }}
            px={6}
            py={{ base: 5, md: 10 }}
          >
            <Text>
              We've sent a verification link to your email address. Please check
              your email inbox or spam folder and verify your email address
              within 10 minutes.
            </Text>

            <Button
              mt={10}
              w={"full"}
              bg={"blue.400"}
              color={"white"}
              rounded={"md"}
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

export default AccountConfirmation;
