import { useRecoilValue } from "recoil";
import LoginCard from "../components/LoginCard";
import SignUpCard from "../components/SignUpCard";
import { Box } from "@chakra-ui/react";
import authScreenAtom from "../atoms/authAtom";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);

  return (
    <Box as="section" bg={"#fff"}>
      <> {authScreenState === "login" ? <LoginCard /> : <SignUpCard />} </>
    </Box>
  );
};

export default AuthPage;
