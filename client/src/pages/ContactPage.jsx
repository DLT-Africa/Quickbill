import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import NavBar from "../Components/NavBar";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import Footer from "../components/Footer"

const ContactPage = () => {
  return (
    <>
    <VStack>
      <Flex mb={"50px"}>
        <Box>
          <NavBar />
          <Image src="./public/contact.svg" />
        </Box>
      </Flex>
      <Flex display={"flex"} color={"lightgray"} gap={5} mt={"20px"}>
        <Flex display={"grid"} ml={"5%"}>
          <Box fontSize={"25px"}>Talk with us</Box>
          <Flex fontSize={"14px"}>
            Questions, comments, or suggestions? <br /> Simply fill in the form
            and we'll be in touch shortly.
          </Flex>
          <Flex gap={5}>
            <IoLocationOutline /> 2, Sheikh Zakariyah Adebayo street, PEGAMUT
            102112, Ota, Ogun State
          </Flex>
          <Flex gap={5}>
            <FiPhoneCall /> +234 8168585740
          </Flex>
          <Flex gap={5}>
            <CiMail /> Contact@quickbill.com
          </Flex>
        </Flex>
        <Box gap={5} paddingBottom={"20px"}>
          <Flex gap={5}>
            <Input
              type="text"
              placeholder="First name"
              height={"40px"}
              mb={"20px"}
            />
            <Input
              type="text"
              placeholder="Last name"
              height={"40px"}
              mb={"20px"}
            />
          </Flex>
          <Input type="text" placeholder="Email" height={"40px"} mb={"20px"} />
          <Input
            type="text"
            placeholder="phone number"
            height={"40px"}
            mb={"20px"}
          />
          <Textarea
            type="text"
            placeholder="Your message"
            height={"40px"}
            mb={"20px"}
          />
          <Button bgColor={"blue"} color={"white"} w={"120px"} paddingBottom={"20px"} paddingTop={"20px"}>
            Sign up
          </Button>
        </Box>
      </Flex>
    </VStack>
      <Footer />
      </>
  );
};

export default ContactPage;
