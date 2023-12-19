"use client";

import {
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Link,
  Box,
  IconButton,
  Divider,
  AbsoluteCenter,
  InputGroup,
  InputRightElement,
  
} from "@chakra-ui/react";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";

export default function SplitScreen() {
    const setAuthScreen = useSetRecoilState(authScreenAtom);
   
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }} className="loginSignup">
      <Flex flexDir="column" w={"450px"}>
        <Link>
          <Box>
            <Image src="short logo 2.png" alt="short logo" />
          </Box>
        </Link>

        <Box>
          <Text
            as={"h2"}
            fontSize="2xl"
            fontWeight={"4xl"}
            color="black"
            py={3}
            px={18}
          >
            Boost Efficiency, Seamlessly & Manage Finances: Your Go-To Solution
            For Invoicing And Payroll
          </Text>

          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            src={"/Desktop - 4.svg"}
            py={20}
          />
        </Box>
      </Flex>

      <Flex p={8} flex={1} align={"center"} justify={"center"} bg={"#f6f6f6"}>
        <Stack spacing={4} w={"full"} maxW={"md"} align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Login
          </Heading>
          <Box>
            <Flex fontWeight={"3000"} gap={4}>
              <IconButton icon={<FaFacebook size={"md"} />} />
              <IconButton icon={<FcGoogle size={"md"} />} />
              <IconButton icon={<FaApple size={"md"} />} />
            </Flex>
            <Box position="relative" padding="10" fontSize={"2xl"}>
              <Divider background={"black"} height={"2px"} width={"4rem"} />
              <AbsoluteCenter px="1" background={"#ecf1f6"}>
                {" "}
                or{" "}
              </AbsoluteCenter>
            </Box>
          </Box>

          <Stack spacing={4} w={500}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" border={"1px solid black"} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type="password" border={"1px solid black"} />
                <InputRightElement h={"full"}>
                  <Button variant={"ghost"}></Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
            <Text align={"center"}>
                Don&apos;t have an account?{" "}
                <Link
                  color={"blue.400"}
                  onClick={() => setAuthScreen("signup")}
                >
                  Sign Up
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}
