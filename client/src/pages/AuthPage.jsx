import { useRecoilValue } from "recoil";
import LoginCard from "../components/LoginCard";
import SignUpCard from "../components/SignUpCard";
import { Box } from "@chakra-ui/react";
import authScreenAtom from "../atoms/authAtom";
import { useEffect } from "react";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
 
  useEffect(() => {
    localStorage.removeItem("user-quickBill");

  }, [])
  

  return (
    <Box as="section" bg={"#fff"}>
      <> {authScreenState === "login" ? <LoginCard /> : <SignUpCard />} </>
    </Box>
  );
};

export default AuthPage;
