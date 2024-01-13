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
	AbsoluteCenter,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../../atoms/authAtom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxiosInstance } from "../../../api/axios";
import userAtom from "../../atoms/userAtom";
import useShowToast from "../../hooks/useShowToast";

export default function SplitScreen() {
	const setAuthScreen = useSetRecoilState(authScreenAtom);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const setUser = useSetRecoilState(userAtom);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();
	const showToast = useShowToast();
	const [loading, setLoading] = useState(false);
	const axiosInstance = useAxiosInstance();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			return showToast("Error", "password does not correspond", "error");
		}
		setLoading(true);
		try {
			const response = await axiosInstance.post(
				"/auth/signup",
				JSON.stringify({ name, email, password, confirmPassword })
			);
			// const loggedUser = response.data.loggedInUser;
			const data = response.data;

			if (data.message) {
				showToast("Success", data.message, "success");
			}

			navigate("/confirm-email");
		} catch (error) {
			console.log(error);
			showToast("Error", error.response.data.error, "error");
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleAuth = async () => {
		window.location.href =
			"https://quickbill-2oy7.onrender.com/auth/googleauth";
	};

	return (
		<Stack
			minH={"100vh"}
			direction={{ base: "column", md: "row" }}
		>
			<Flex
				flexDir={{ base: "column-reverse", md: "column" }}
				w={{ base: "full", md: "450px" }}
				justifyContent={"center"}
			>
				<Link href="/">
					<Image src="short logo 2.png" alt="short logo" />
				</Link>

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
						py={20}
						display={{ base: "none", md: "block" }}
					/>
				</Box>
			</Flex>
			<Flex p={8} flex={1} align={"center"} justify={"center"} bg={"#f6f6f6"}>
				<Stack spacing={4} w={'full'} maxW={'md'} align={"center"}>
					<Heading
						fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
						textAlign={"center"}
					>
						Create Account
					</Heading>
					<Box>
						<Flex fontWeight={400} gap={4}>
							<Button
								bg={"#4c54ad"}
								size={{ base: "sm", md: 'lg' }}
								_hover={{ bg: "blue" }}
								leftIcon={<FcGoogle />}
								color={"white"}
								onClick={handleGoogleAuth}
							>
								Continue with Google
							</Button>
						</Flex>
						<Box
							position="relative"
							padding="5"
							fontSize={{ base: "xl", md: "2xl" }}
						>
							<AbsoluteCenter px="1"> or </AbsoluteCenter>
						</Box>
					</Box>
					<form  onSubmit={handleSubmit}>
						<Stack spacing={4}>
							<Box
								// w={{ base: "100%" }}
								maxW="500px"
								mx="auto"
							>
								<FormControl w={{base: 'l', md: '400px', lg: '500px'}} isRequired my={5}>
									<FormLabel> Name</FormLabel>
									<Input
										type="text"
										onChange={(e) => setName(e.target.value)}
										placeholder="John Doe"
										value={name}
										color={"black"}
										border={"1px solid black"}
										required
									/>
								</FormControl>

								<FormControl isRequired my={5}>
									<FormLabel>Email address</FormLabel>
									<Input
										type="email"
										onChange={(e) => setEmail(e.target.value)}
										value={email}
										placeholder="example@mail.com"
										border={"1px solid black"}
										required
									/>
								</FormControl>

								<FormControl isRequired my={5}>
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

								<FormControl isRequired my={5}>
									<FormLabel>Confirm Password</FormLabel>
									<InputGroup>
										<Input
											type={showConfirmPassword ? "text" : "password"}
											onChange={(e) => setConfirmPassword(e.target.value)}
											value={confirmPassword}
											placeholder="Confirm password"
											border={"1px solid black"}
											required
										/>
										<InputRightElement h={"full"}>
											<Button
												variant={"ghost"}
												onClick={() =>
													setShowConfirmPassword(
														(showConfirmPassword) => !showConfirmPassword
													)
												}
											>
												{showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
											</Button>
										</InputRightElement>
									</InputGroup>
								</FormControl>

								<Stack spacing={10} pt={2}>
									<Button
										loadingText="Signing you up"
										size={{ base: "lg", md: "md" }}
										bg={"blue.400"}
										color={"white"}
										_hover={{
											bg: "blue.500",
										}}
										type="submit"
										isLoading={loading}
									>
										Sign up
									</Button>
								</Stack>
							</Box>
							<Stack pt={6}>
								<Text align={"center"}>
									Already a user?{" "}
									<Link
										color={"blue.400"}
										onClick={() => setAuthScreen("login")}
									>
										Login
									</Link>
								</Text>
							</Stack>
						</Stack>
					</form>
				</Stack>
			</Flex>
		</Stack>
	);
}
