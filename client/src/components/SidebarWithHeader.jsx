import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { ImArrowDownLeft2, ImArrowUpRight2 } from "react-icons/im";

import { MdHome } from "react-icons/md";

const SidebarContent = ({ onClose, ...rest }) => {
  const integrations = useDisclosure();

  return (
    <Box
      transition="3s ease"
      bg={"#ECF1F6"}
      boxShadow="1px 0px 2px 1px rgba(0,0,0,0.6)"
      zIndex={99}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      color={"#374957"} ///////////////////////////////////////////////////For the sidebar
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      <NavItem
        as={NavLink}
        to={"/dashboard"}
        style={({ isActive }) => ({
          color: isActive ? "rgb(41, 112, 255)" : "",
        })}
        icon={MdHome}
      >
        Dashboard
      </NavItem>

      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Flex
              align="center"
              p="4"
              // mx="4"
              borderRadius="lg"
              role="group"
              cursor="pointer"
            >
              <Icon mr="4" fontSize="16" as={ImArrowDownLeft2} />
              Get Paid
            </Flex>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <NavItem
              as={NavLink}
              to={"/create-invoice"}
              style={({ isActive }) => ({
                color: isActive ? "rgb(41, 112, 255)" : "",
              })}
              pl="12"
              py="2"
            >
              Create Invoice
            </NavItem>
            <NavItem
              as={NavLink}
              to={"/sent-invoices"}
              style={({ isActive }) => ({
                color: isActive ? "rgb(41, 112, 255)" : "",
              })}
              pl="12"
              py="2"
            >
              Sent Invoices
            </NavItem>
            <NavItem
              as={NavLink}
              to={"/clients"}
              style={({ isActive }) => ({
                color: isActive ? "rgb(41, 112, 255)" : "",
              })}
              pl="12"
              py="2"
            >
              Clients
            </NavItem>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Flex
              align="center"
              p="4"
              // mx="4"
              borderRadius="lg"
              role="group"
              cursor="pointer"
            >
              <Icon mr="4" fontSize="16" as={ImArrowUpRight2} />
              Pay
            </Flex>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <NavItem
              as={NavLink}
              to={"/bills"}
              style={({ isActive }) => ({
                color: isActive ? "rgb(41, 112, 255)" : "",
              })}
              pl="12"
              py="2"
            >
              Bills
            </NavItem>
            <NavItem as={NavLink} to={"/payroll"} pl="12" py="2">
              Payroll
            </NavItem>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <NavItem
        as={NavLink}
        to={"/invoice-me"}
        style={({ isActive }) => ({
          color: isActive ? "rgb(41, 112, 255)" : "",
        })}
        icon={AiFillGift}
      >
        InvoiceMe
      </NavItem>
      <NavItem
        as={NavLink}
        to={"/employees"}
        style={({ isActive }) => ({
          color: isActive ? "rgb(41, 112, 255)" : "",
        })}
        icon={BsGearFill}
      >
        Employees
      </NavItem>
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
    // as="a"
    // href="#"
    // style={{ textDecoration: "none" }}
    // _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      pos={"sticky"}
      top={0}
      zIndex={9}
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={"#ECF1F6"}
      boxShadow="base"
      // borderBottomWidth="1px"
      // borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          color="gray.600"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm" color="gray.600">
                    Justina Clark
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      minH="100vh"
      bg={"#F8F8F8"} ///////////////////////////////////////////////////////////For the whole box
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
