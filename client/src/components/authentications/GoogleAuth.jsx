import React, { useEffect, useState } from "react";
import { useAxiosInstance } from "../../../api/axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import useShowToast from "../../hooks/useShowToast";
import { useRecoilState } from "recoil";
import { prevPathAtom } from "../../atoms/prevPathAtom";
import userAtom from "../../atoms/userAtom";
import tokenAtom from "@/atoms/tokenAtom";

const GoogleAuth = () => {
	const navigate = useNavigate();
	const showToast = useShowToast();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const receivedToken = queryParams.get("token");
	const [user, setUser] = useRecoilState(userAtom);
	const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);
	const axiosInstance = useAxiosInstance();
	const [token, setToken] = useRecoilState(tokenAtom);
	
	setToken(receivedToken);
	
	localStorage.setItem("token", receivedToken);

	useEffect(() => {
		const verifyDetails = async () => {
			try {
				const response = await axiosInstance.get(`/account/profile`);
				const loggedUser = response.data;

				localStorage.setItem("user-quickBill", JSON.stringify(loggedUser));
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
				if (error?.response?.status === 404 || 401) {
					showToast("Error", "Authentication failed", "error");
				}
				navigate("/auth");
				console.log(error.response);
			}
		};

		if (token) {
			verifyDetails();
		} // console.log(`Encoded email: ${encodedEmail}`)
	}, [token]);

	return (
		<Flex
			justifyContent={"center"}
			flexDir={"column"}
			gap={2}
			alignItems={"center"}
			minH={"100vh"}
		>
			<Spinner size={"xl"} />
			<Text>Authenticating...</Text>
		</Flex>
	);
};

export default GoogleAuth;
