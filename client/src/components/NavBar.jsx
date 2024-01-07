import React from "react";
import {
  Link,
  Box,
  Flex,
  Text,
  Button,
  Image,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer
      {...props}
      w={"full"}
      p={15}
      justifyContent={"space-between"}
      alignItems={"center"}
     
      bg={"#fff"}
    >
      <Image bg={"#fff"} src="/short logo 2.png" borderRadius={8} />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="black"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="black"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = ({ isOpen }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
      font-size= {{ base: "14px", md: "16px", lg: "18px" }}

    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
       

      >
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/about">About-us </MenuItem>
        <MenuItem to="/contact">Contact </MenuItem>
        <MenuItem to="/login">
          <Link
            as={RouterLink}
            onClick={() => setAuthScreen("login")}
            to={"/auth"}
          >
            <Button
              size={"lg"}
              variant="ghost"
              transition={"all 1s"}
              boxShadow="xl"
              colorScheme="teal"
              _hover={{
                bg: useColorModeValue("#f8f8f8"),
              }}
              color={"#1c1c1c"}
            >
              Login
            </Button>
          </Link>
        </MenuItem>

        <MenuItem to="/signup" isLast>
          <Link
            as={RouterLink}
            onClick={() => setAuthScreen("signup")}
            to={"/auth"}
          >
            <Button
              transition={"all 1s"}
              bg={"#2970ff"}
              _hover={{
                bg: useColorModeValue("#599cff"),
              }}
              size={"lg"}
              color={"#f5f5f5"}
            >
              Sign up
            </Button>
          </Link>
        </MenuItem>
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      justifyContent={"center"}
      alignItems={"center"}
      gap={30}
      
      color={"#1c1c1c"}
      fontSize={"xl"}
      fontWeight={400}
      bg={"#fff"}
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBar;
