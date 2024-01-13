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
import authScreenAtom from "../../atoms/authAtom";
import { useState } from "react";
// import { axiosInstance } from "../../api/axios";
import userAtom from "../../atoms/userAtom";
import { prevPathAtom } from "../../atoms/prevPathAtom";
import useShowToast from "../../hooks/useShowToast";
import { useAxiosInstance } from "/api/axios";
import tokenAtom from "@/atoms/tokenAtom";

export default function SplitScreen() {
	const setAuthScreen = useSetRecoilState(authScreenAtom);
	const [showPassword, setShowPassword] = useState(false);
	const setUser = useSetRecoilState(userAtom);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);
	const [loading, setLoading] = useState(false);
	const [token, setToken] = useRecoilState(tokenAtom);
	const axiosInstance = useAxiosInstance();
	const showToast = useShowToast();

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		try {
			const response = await axiosInstance.post(
				"/auth/signin",
				JSON.stringify({ email, password })
			);
			console.log(response.data.loggedInUser);
			const loggedUser = response.data.loggedInUser;
			const token = response.data.token;

			localStorage.setItem("user-quickBill", JSON.stringify(loggedUser));
			localStorage.setItem("token", token);

			setToken(token);
			setUser(loggedUser);

			const localStoragePrevPath = localStorage?.getItem("localPrevPath");
			// Redirect to the originally requested route (or a default route)
			if (localStoragePrevPath) {
				localStorage.removeItem("localPrevPath");
				navigate(localStoragePrevPath);
			} else if (prevPath) {
				setPrevPath(null); // Clear the stored path
				navigate(prevPath);
			} else {
				navigate("/dashboard");
			}
		} catch (error) {
			if (error?.response?.status === 404) {
				showToast(
					"Error",
					"This user registered with Google authentication, continue with google and create password",
					"error"
				);
			}
			console.log(error.response);
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleAuth = async () => {
		// try {
		// 	const response = await axiosInstance.get("/auth/googleauth");
		// 	const data = response.data;
		// 	navigate('/auth/google-verify')
		// } catch (error) {
		// 	console.log(error)
		// }

		window.location.href =
			"https://quickbill-2oy7.onrender.com/auth/googleauth/callback";
	};

	return (
		<Stack
			minH={"100vh"}
			overflowX={"hidden"}
			direction={{ base: "column", md: "row" }}
			className="loginSignup"
		>
			<Flex
				flexDir={{ base: "column-reverse", md: "column" }}
				w={{ base: "full", md: "450px" }}
			>
				<Box >
					<Image
						onClick={() => navigate("/")}
						src="short logo 2.png"
						alt="short logo"
					/>
				</Box>
				<Box>
					<Text
						as={"h2"}
						fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
						fontWeight={{ base: "3xl", md: "4xl", lg: "5xl" }}
						color="black"
						py={3}
						px={{ base: 4, md: 18 }}
						display={{ base: "none", md: "block" }}
					>
						Boost Efficiency, Seamlessly & Manage Finances: Your Go-To Solution
						For Invoicing And Payroll
					</Text>

					<Image
						alt={"Login Image"}
						objectFit={"cover"}
						src={"/Desktop - 4.svg"}
						py={{ base: 4, md: 20 }}
						display={{ base: "none", md: "block" }}
					/>
				</Box>
			</Flex>
			<Flex p={8} flex={1} align={"center"} justify={"center"} bg={"#f6f6f6"}>
				<Stack
					spacing={4}
					w={{ base: "full", md: "md" }}
					maxW={"md"}
					align={"center"}
				>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Login
					</Heading>
					<Box>
						<Flex fontWeight={"3000"} gap={4}>
							<Button
								bg={"#4c54ad"}
								_hover={{ bg: "blue" }}
								size={{ base: "sm", md: 'lg' }}

								leftIcon={<FcGoogle />}
								color={"white"}
								onClick={handleGoogleAuth}
							>
								{" "}
								Continue with Google
							</Button>
						</Flex>
						<Box position="relative" padding="10" fontSize={"2xl"}>
							<AbsoluteCenter px="1"> or </AbsoluteCenter>
						</Box>
					</Box>

					<Stack spacing={4}>
						<form onSubmit={handleSubmit}>
							<Box
								w={{ base: "100%", md: "80%", lg: "100%" }}
								maxW="500px"
								mx="auto"
							>
								<FormControl
									isRequired
									w={{base: 'l', md: '400px', lg: '500px'}} 
									maxW="500px"
									mx="auto"
									my={5}
								>
									<FormLabel >Email address</FormLabel>
									<Input
										type="email"
										onChange={(e) => setEmail(e.target.value)}
										value={email}
										placeholder="example@mail.com"
										border={"1px solid black"}
										required
									/>
								</FormControl>

								<FormControl
									isRequired
									w={{base: 'l', md: '400px', lg: '500px'}} 
									maxW="500px"
									mx="auto"
									my={5}
								>
									<FormLabel>Password</FormLabel>
									<InputGroup>
										<Input
											type={showPassword ? "text" : "password"}
											onChange={(e) => setPassword(e.target.value)}
											value={password}
											placeholder="Enter password"
											border={"1px solid black"}
											required
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

								{/* <Stack spacing={10} pt={2}> */}
									<Button
										loadingText="Signing in"
										w={{base: 'full', md: '400px', lg: '500px'}} 

										// size={{ base: "lg", md: "md" }}
										bg={"blue.400"}
										color={"white"}
										_hover={{
											bg: "blue.500",
										}}
										type="submit"
										isLoading={loading}
										// w={'full'}
										// w={{ base: "400%", md: "80%", lg: "100%" }}
										// maxW={{ base: "300px", md: "500px" }}
										mx="auto"
									>
										Sign In
									</Button>
								{/* </Stack> */}
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
							</Box>
						</form>
					</Stack>
				</Stack>
			</Flex>
		</Stack>
	);
}
