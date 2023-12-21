import {
  AbsoluteCenter,
	Box,
	Button,
	Flex,
	Image,
	Input,
	Textarea,
  Text,
	VStack,
  Container,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import Footer from "../components/Footer";

const ContactPage = () => {
	return (
		<>
			<NavBar />
			<VStack  bg={'white'} >
				<Flex mb={"50px"}>
          <Box>
						<Image  src="contact-us.svg"/>

          </Box>
				</Flex>
				<Flex display={"flex"} justifyContent={'space-between'}  gap={20} mt={"20px"} px={20}>
					<Flex display={"grid"}>
						<Box fontSize={"25px"}>Talk with us</Box>
						<Flex fontSize={"14px"}>
							Questions, comments, or suggestions? <br /> Simply fill in the
							form and we'll be in touch shortly.
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
					<Box  paddingBottom={"20px"} w={'50%'}>
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
						<Input
							type="text"
							placeholder="Email"
							height={"40px"}
							mb={"20px"}
						/>
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
						<Button
							bgColor={"blue"}
							color={"white"}
							w={"120px"}
							paddingBottom={"20px"}
							paddingTop={"20px"}
						>
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
