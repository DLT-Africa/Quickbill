import { useNavigate } from "react-router-dom";
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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useRecoilState, useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import { useState } from "react";
import { axiosInstance } from "../../api/axios";
import userAtom from "../atoms/userAtom";
import { prevPathAtom } from "../atoms/prevPathAtom";

export default function SplitScreen() {
	const setAuthScreen = useSetRecoilState(authScreenAtom);
	const [showPassword, setShowPassword] = useState(false);
	const setUser = useSetRecoilState(userAtom);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axiosInstance.post(
				"/auth/signin",
				JSON.stringify({ email, password })
			);
			const loggedUser = response.data.loggedInUser;
			localStorage.setItem("user-quickBill", JSON.stringify(loggedUser));
			setUser(loggedUser);

			// Redirect to the originally requested route (or a default route)
			if (prevPath) {
				setPrevPath(null); // Clear the stored path
				navigate(prevPath);
			} else {
				navigate("/dashboard");
			}
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
						<FormControl isRequired>
							<FormLabel>Email address</FormLabel>
							<Input
								type="email"
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								placeholder="example@mail.com"
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
									placeholder="Enter password"
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
								// isDisabled={(!email, !password ? true : false)}
							>
								Sign In
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
