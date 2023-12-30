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
  HStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/axios";
import userAtom from "../atoms/userAtom";

export default function SplitScreen() {
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const setUser = useSetRecoilState(userAtom);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/auth/signup",
        JSON.stringify({ name, email, password })
      );
      const loggedUser = response.data.loggedInUser;
      localStorage.setItem("user-quickBill", JSON.stringify(loggedUser));
      setUser(loggedUser);

      //  navigate(state?.from || "/dashboard");
      // Redirect to the originally requested route (or a default route)

      navigate("/confirm-email");
    } catch (error) {
      console.log(error);
    }
    // if (user === "" || pwd === "") {
    //    setErrMsg("User and pwd are required");
    //    return;
    // }
  };

  return (
    <Stack
      minH={"100vh"}
      direction={{ base: "column", md: "row" }}
      className="loginSignup"
    >
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
            Create Account
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
          <Stack spacing={4}>
            <HStack w={500}>
              <Box>
                <FormControl isRequired>
                  <FormLabel> Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    value={name}
                    color={"black"}
                    border={"1px solid black"}
                    w={500}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                value={email}
                border={"1px solid black"}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Enter your password"
                  border={"1px solid black"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
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
                onClick={handleSubmit}
                isDisabled={(!name, !email, !password ? true : false)}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link color={"blue.400"} onClick={() => setAuthScreen("login")}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}
