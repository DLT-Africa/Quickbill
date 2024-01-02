import { useRecoilValue } from "recoil";
import LoginCard from "../components/LoginCard";
import SignUpCard from "../components/SignUpCard";
import { Box } from "@chakra-ui/react";
import authScreenAtom from "../atoms/authAtom";
import { useEffect } from "react";
import useLogout from "../hooks/useLogout";

const AuthPage = () => {
	const authScreenState = useRecoilValue(authScreenAtom);
	const logout = useLogout();

	useEffect(() => {
		// localStorage.removeItem("user-quickBill");
		// localStorage.removeItem("clients-quickBill");
		logout();
	}, []);

	return (
		<Box as="section" bg={"#fff"}>
			<> {authScreenState === "login" ? <LoginCard /> : <SignUpCard />} </>
		</Box>
	);
};

export default AuthPage;
