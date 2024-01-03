import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
	Box,
	Flex,
	Text,
	Image,
	Button,
	useColorModeValue,
	Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../api/axios";
import axios from "axios";

const ConfirmEmail = () => {
	const [confirmed, setConfirmed] = useState(false);
	const [loading, setLoading] = useState(true);
	const { token } = useParams();
	const navigate = useNavigate();

	console.log("I am rendering confirm email");

	useEffect(() => {
		console.log("I am rendering useEffect", "loading:" + loading);
		const source = axios.CancelToken.source();

		const getConfirmation = async () => {
			console.log("I am rendering  getConfirmation function");
			try {
				const response = await axiosInstance.get(
					`/auth/activate-account/${token}`,
					{ cancelToken: source.token }
				);
				setConfirmed(true);
			} catch (error) {
				console.log(error);
				navigate("/link-expired");
				// setLoading(false);
			} finally {
				setLoading(false);
			}
		};

		if (loading && !confirmed) getConfirmation();

		return () => {
			source.cancel();
		};
	}, [loading]);

	if (!confirmed && loading) {
		return (
			<Flex
				justifyContent={"center"}
				flexDir={"column"}
				gap={2}
				alignItems={"center"}
				minH={"100vh"}
			>
				<Spinner size={"xl"} />
				<Text>Verifying Your Account</Text>
			</Flex>
		);
	}

	return (
		<Box py={8} px={8} bg={"#fff"} borderRadius={"1px solid black"} h={"100vh"}>
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
						<Text fontSize={"4xl"} color={"#2970FF"}>
							Confirmation email successful sent.
						</Text>
						<Text fontSize={"2xl"}>
							Please check your email for the verification.
						</Text>
					</Box>
				</Flex>
				<Link to={"/auth"}>
					<Button
						size={"lg"}
						transition={"all 1s"}
						fontSize={"xl"}
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
