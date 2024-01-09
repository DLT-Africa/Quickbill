import { useRecoilValue } from "recoil";
import LoginCard from "../components/authentications/LoginCard";
import SignUpCard from "../components/authentications/SignUpCard";
import { Box } from "@chakra-ui/react";
import authScreenAtom from "../atoms/authAtom";
import { useEffect } from "react";
import useLogout from "../hooks/useLogout";

const AuthPage = () => {
	const authScreenState = useRecoilValue(authScreenAtom);
	const logout = useLogout();

	useEffect(() => {
		logout();
	}, []);

	return (
		<Box as="section" bg={"#fff"}>
			<> {authScreenState === "login" ? <LoginCard /> : <SignUpCard />} </>
		</Box>
	);
};

export default AuthPage;
