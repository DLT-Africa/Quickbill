import {
  Button,
  Flex,
  Image,
  Link,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import authScreenAtom from "../atoms/authAtom";
import { useSetRecoilState } from "recoil";

const NavBar = () => {
  const setAuthScreen = useSetRecoilState(authScreenAtom)
  return (
    <>
      <Flex
        w={"full"}
        p={15}
        justifyContent={"space-between"}
        alignItems={"center"}
        position={'sticky'}
        zIndex={9999}
        top={0}
        bg={"#fff"}
        // h={"123px"}
      >
        <Heading size={'md'}>
          <Link href="/">
            <Image  bg={"#fff"} src="/short logo 2.png" borderRadius={8} />
          </Link>
        </Heading>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          gap={30}
          color={"#1c1c1c"}
          fontSize={'xl'}
          fontWeight={400}
          bg={'#fff'}
        >
          <Link
            _active={{
              color: "#2970ff",
              listStyle: "none"
            }}
            href="/"
          >
            Home
          </Link>
          <Link
            _active={{
              color: "#2970ff",
            }}
            href="/about"
          >
            About us
          </Link>
          <Link
            _active={{
              color: "#2970ff",
            }}
            href="/contact"
          >
            Contact
          </Link>
        </Flex>

        <Flex gap={30} bg={'#fff'}>
         <Link as={RouterLink} to={'/auth'} onClick={() => setAuthScreen("login")}>
            <Button
              size={'lg'}
              variant='ghost'
              transition={"all 1s"}
              boxShadow="xl"
              colorScheme='teal'
              _hover={{
                bg: useColorModeValue("#f8f8f8"),
              }}
              color={"#1c1c1c"}
            >
              Login
            </Button>
         </Link>
         <Link as={RouterLink} to={'/auth'} onClick={() => setAuthScreen("signup")}>
          <Button
            transition={"all 1s"}
            bg={"#2970ff"}
            _hover={{
              bg: useColorModeValue("#599cff"),
            }}
            size={'lg'}
            color={"#f5f5f5"}
          >
            Sign up
          </Button>
         </Link>
        </Flex>
      </Flex>
    </>
  );
};

export default NavBar;
