import { Card, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

const Container = () => {
	return (
		<React.Fragment>
			<Flex
				overflowY={"hidden"}
				bg={"#EBF5FE"}
				py={70}
				px={30}
				flexDir={"column"}
				w={{ base: "full" }}
				justifyContent={"center"}
				alignItems={"center"}
				gap={10}
			>
				<Text fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} fontWeight={600}>
					Time saving, efficient, compliant, less stressful... and much more!
				</Text>
				<SimpleGrid
					templateColumns={{
						base: "1fr",
						md: "repeat(2, minmax(50px, 1fr))",
						lg: "repeat(3, minmax(50px, 1fr))",
					}}
					gap={{ base: 8, md: 15 }}
					alignItems={"center"}
					spacing={5}
					justifyContent={"center"}
				>
					<Card
						width={{ base: "100%", md: 320, lg: "full" }}
						py={4}
						px={3}
						boxShadow={"lg"}
					>
						<Text
							fontSize={{ base: "xl", md: "3xl", lg: "3xl" }}
							fontWeight={600}
							textAlign={"center"}
						>
							Accounts <span className="landingPageSpan">Payable</span>
						</Text>
						<Image src="/payable.svg" alt="Payable" />

						<Text
							fontSize={{ base: "md", md: "lg", lg: "xl" }}
							textAlign={"center"}
							fontWeight={400}
						>
							Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
							vulputate libero et velit interdum, ac aliquet odio mattis.
						</Text>
					</Card>
					<Card
						width={{ base: "100%", md: 320, lg: "full" }}
						py={4}
						px={3}
						boxShadow={"lg"}
						textAlign={"center"}
					>
						<Text
							fontSize={{ base: "xl", md: "3xl", lg: "4xl" }}
							fontWeight={600}
						>
							Send <span className="landingPageSpan">invoices</span>
						</Text>
						<Image src="/invoices.svg" alt="Send invoises" />

						<Text
							fontSize={{ base: "md", md: "lg", lg: "xl" }}
							fontWeight={400}
						>
							Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
							vulputate libero et velit interdum, ac aliquet odio mattis.
						</Text>
					</Card>
					<Card
						width={{ base: "100%", md: 320, lg: "full" }}
						py={4}
						px={3}
						boxShadow={"lg"}
						textAlign={"center"}
					>
						<Text
							fontSize={{ base: "xl", md: "3xl", lg: "3xl" }}
							fontWeight={600}
						>
							Account Receivable
						</Text>
						<Image src="/receive.svg" alt="Receive payment" />

						<Text
							fontSize={{ base: "md", md: "lg", lg: "xl" }}
							fontWeight={400}
						>
							Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
							vulputate libero et velit interdum, ac aliquet odio mattis.
						</Text>
					</Card>
					<Card
						width={{ base: "100%", md: 320, lg: "full" }}
						py={4}
						px={3}
						boxShadow={"lg"}
						textAlign={"center"}
					>
						<Text
							fontSize={{ base: "xl", md: "3xl", lg: "4xl" }}
							fontWeight={600}
						>
							Expenses
						</Text>
						<Image src="/expenses.svg" alt="expenses" />

						<Text
							fontSize={{ base: "md", md: "lg", lg: "xl" }}
							fontWeight={400}
						>
							Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
							vulputate libero et velit interdum, ac aliquet odio mattis.
						</Text>
					</Card>
				</SimpleGrid>
			</Flex>
		</React.Fragment>
	);
};

export default Container;
