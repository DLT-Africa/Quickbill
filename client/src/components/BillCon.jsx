import {
	Box,
	Button,
	Flex,
	Image,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Table,
	Tabs,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useColorModeValue,
} from "@chakra-ui/react";

const BillCon = () => {
	const billsData = [
		{
			id: 1,
			creationDate: "15/12/2023",
			invoiceNumber: "INV-1",
			client: "Musa Muhammed",
			amount: 50000,
			status: "Awaiting",
		},
	];

	return (
		<Flex pt={10}>
			<Box pl={20} w={"full"} pr={70}>
				<Flex justifyContent={"space-between"} alignItems={"center"}>
					<Box>
						<Text as={"h1"} fontSize={"2xl"} fontWeight={700}>
							Bills
						</Text>
						<Text as={"p"} fontSize={"xl"} fontWeight={300}>
							Manage all the invoices you received from vendors
						</Text>
					</Box>
					<Button
						bg={"#2970FF"}
						color={"#F6F6F6"}
						size={"lg"}
						transition={"all 1s"}
						fontSize={"xl"}
						_hover={{
							bg: useColorModeValue("#2970FF", "#599cff"),
						}}
						float={"right"}
					>
						Batch Payment
					</Button>
				</Flex>

				<Flex
					justifyContent={"center"}
					alignItems={"center"}
					flexDir={"column"}
				>
					<Box w={"full"}>
						<Tabs float={"right"}>
							<TabList>
								<Tab>All (1)</Tab>
								<Tab>Paid (0)</Tab>
								<Tab>Awaiting Payment (1)</Tab>
								<Tab>Rejected (0)</Tab>
								<Tab>Overdue (0)</Tab>
							</TabList>
							<TabPanels>
								<TabPanel></TabPanel>

								<TabPanel></TabPanel>

								<TabPanel></TabPanel>

								<TabPanel></TabPanel>

								<TabPanel></TabPanel>
							</TabPanels>
						</Tabs>
					</Box>

					<Box p={4} float={"right"} w={"full"}>
						<Table variant="simple">
							<Thead>
								<Tr
									p={4}
									borderBottom={"0.5px solid rgba(0, 0, 0, 0.60)"}
									borderTop={"0.5px solid rgba(0, 0, 0, 0.60)"}
									bg={"rgba(55, 73, 87, 0.1)"}
								>
									<Th color={"#1c1c1c"} fontSize={"xl"}>
										Creation Date
									</Th>
									<Th color={"#1c1c1c"} fontSize={"xl"}>
										Invoice No.
									</Th>
									<Th color={"#1c1c1c"} fontSize={"xl"}>
										Client
									</Th>
									<Th color={"#1c1c1c"} fontSize={"xl"}>
										Amount
									</Th>
									<Th color={"#1c1c1c"} fontSize={"xl"}>
										Status
									</Th>
								</Tr>
							</Thead>
							<Tbody>
								{billsData.map((bill) => (
									<Tr key={bill.id} borderBottom={"none"}>
										<Td color={"rgba(0, 0, 0, 0.50)"}>{bill.creationDate}</Td>
										<Td color={"rgba(0, 0, 0, 0.50)"}>{bill.invoiceNumber}</Td>
										<Td color={"rgba(0, 0, 0, 0.50)"}>{bill.client}</Td>
										<Td color={"rgba(0, 0, 0, 0.50)"}>{bill.amount}</Td>
										<Td color={"rgba(229, 211, 53, 0.50)"} fontWeight={700}>
											{bill.status}
										</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</Box>
				</Flex>
			</Box>
		</Flex>
	);
};

export default BillCon;
