import {
	Box,
	Button,
	Flex,
	Image,
	Input,
	Textarea,
	VStack,
	useColorModeValue,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import Footer from "../components/Footer";

const ContactPage = () => {
	return (
		<>
			<NavBar  position={"sticky"} zIndex={9999} top={0}  />
			<VStack bg={"white"}>
				<Flex mb={{ base: 2, md: 20, lg: "50px" }}>
					<Box>
						<Image src="contact-us.svg" />
					</Box>
				</Flex>
				<Flex
					display={"flex"}
					direction={{ base: "column", md: "row" }}
					justifyContent={"space-between"}
					gap={{ base: 8, md: 18 }}
					mt={{ base: 5, md: 8, lg: "15px" }}
					px={20}
				>
					<Box display={"grid"} gridGap={2}>
						<Box fontSize={{ base: "xl", md: "3xl", lg: "4xl" }}>
							Talk with us
						</Box>
						<Flex fontSize={{ base: "md", md: "lg", lg: "xl" }}>
							Questions, comments, or suggestions? <br /> Simply fill in the
							form and we'll be in touch shortly.
						</Flex>
						<Flex
							fontSize={{ base: "sm", md: "md", lg: "lg" }}
							flexDir={"column"}
							gap={{ base: 2, md: 4 }}
						>
							<Flex gap={4}>
								<IoLocationOutline /> 2, Sheikh Zakariyah Adebayo street,
								PEGAMUT 102112, Ota, Ogun State
							</Flex>
							<Flex gap={4}>
								<FiPhoneCall /> +234 8168585740
							</Flex>
							<Flex gap={4}>
								<CiMail /> Contact@quickbill.com
							</Flex>
						</Flex>
					</Box>
					<Box
						paddingBottom={{ base: 10, md: 15, lg: 20 }}
						w={{ base: "100%", md: "50%", lg: "60%" }}
					>
						<Flex gap={5}>
							<Input
								_placeholder={{
									fontSize: "md",
								}}
								type="text"
								placeholder="First name"
								size={{ base: "md", md: "lg" }}
								mb={"20px"}
							/>
							<Input
								type="text"
								_placeholder={{
									fontSize: "md",
								}}
								size={{ base: "md", md: "lg" }}
								placeholder="Last name"
								mb={"20px"}
							/>
						</Flex>
						<Input
							size={{ base: "md", md: "lg" }}
							_placeholder={{
								fontSize: "md",
							}}
							type="text"
							placeholder="Email"
							mb={"20px"}
						/>
						<Input
							type="text"
							size={{ base: "md", md: "lg" }}
							_placeholder={{
								fontSize: "md",
							}}
							placeholder="phone number"
							mb={"20px"}
						/>
						<Textarea
							type="text"
							_placeholder={{
								fontSize: "md",
							}}
							placeholder="Your message"
							mb={"20px"}
						/>
						<Button
							transition={"all 1s"}
							bg={"#2970ff"}
							type="submit"
							_hover={{
								bg: useColorModeValue("#599cff"),
							}}
							size={{
								base: 'md', md: "lg"
							}}
							color={"#f5f5f5"}
						>
							Send Message
						</Button>
					</Box>
				</Flex>
			</VStack >
			<Footer />
		</>
	);
};

export default ContactPage;
