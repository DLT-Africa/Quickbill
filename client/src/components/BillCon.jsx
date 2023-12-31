import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Flex,
	Box,
	Text,
	Button,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Tabs,
	useColorModeValue,
} from "@chakra-ui/react";
import { GoDownload } from "react-icons/go";
import InvoicePerRow from "./InvoicePerRow";
import { useEffect } from "react";
import { axiosInstance } from "../../api/axios";

const BillCon = () => {
	const [allSentInvoices, setAllSentInvoices] = useState([]);
	const [allPaidInvoices, setAllPaidInvoices] = useState([]);
	const [allRejectedInvoices, setAllRejectedInvoices] = useState([]);
	const [allOverdueInvoices, setAllOverdueInvoices] = useState([]);
	const [allAwaitingPaymentInvoices, setAllAwaitingPaymentInvoices] = useState(
		[]
	);


	const navigate = useNavigate();

	useEffect(() => {
		const getAllSentInvoices = async () => {
			try {
				const response = await axiosInstance.get("/invoices/all-received");
				const invoicesSent = response.data;
				console.log(response.data);

				//filter all paid invoices
				const filteredPaidInvoices = invoicesSent.filter(
					(invoice) => invoice.invoiceStatus === "Paid"
				);

				//filter rejected invoices
				const filteredRejectedInvoices = invoicesSent.filter(
					(invoice) => invoice.invoiceStatus === "Rejected"
				);

				//filter overdue invoice
				const filteredOverdueInvoices = invoicesSent.filter(
					(invoice) => invoice.invoiceStatus === "Overdue"
				);

				//filter awaiting payment invoice
				const filteredAwaitingPaymentInvoices = invoicesSent.filter(
					(invoice) => invoice.invoiceStatus === "Awaiting Payment"
				);



				setAllSentInvoices(invoicesSent);
				setAllPaidInvoices(filteredPaidInvoices);
				setAllRejectedInvoices(filteredRejectedInvoices);
				setAllOverdueInvoices(filteredOverdueInvoices);
				setAllAwaitingPaymentInvoices(filteredAwaitingPaymentInvoices);
			} catch (error) {
				console.log(error);
			}
		};
		getAllSentInvoices();
	}, []);

	return (
		<>
			<Flex justifyContent={"space-between"} p={5} flexDir={"row"}>
				{/* <Text as={"p"} fontSize={"4xl"} fontWeight={600} color={"black"}>
					Sent invoices
				</Text> */}
				<Box>
						<Text as={"h1"} fontSize={"2xl"} fontWeight={700}>
							Bills
						</Text>
 						<Text as={"p"} fontSize={"xl"} fontWeight={300}>
 							Manage all the invoices you received from vendors
					</Text>
					</Box>
				<Flex gap={"5"}>
					<Button
						transition={"all 1s"}
						bg={"#2970ff"}
						_hover={{
							bg: useColorModeValue("#599cff"),
						}}
						color={"#f5f5f5"}
						onClick={() => navigate("/invoices/create")}
					>
						Create invoice
					</Button>
					<GoDownload
						// size={'md'}
						fontSize={36}
						// fontWeight={400}
						color={"black"}
						cursor={"pointer"}
					/>
				</Flex>
			</Flex>

			<Box px={5}>
				<Tabs align="end">
					<TabList>
						<Tab>All ({allSentInvoices.length})</Tab>
						<Tab>Paid ({allPaidInvoices.length})</Tab>
						<Tab>Awaiting Payment ({allAwaitingPaymentInvoices.length})</Tab>
						<Tab>Rejected ({allRejectedInvoices.length})</Tab>
						<Tab>Overdue ({allOverdueInvoices.length})</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							
							<Table variant="simple" colorScheme="gray" size={"md"} mt={5}>
								<Thead>
									<Tr
										p={2}
										borderBottom={"0.5px solid rgba(0, 0, 0, 0.60)"}
										borderTop={"0.5px solid rgba(0, 0, 0, 0.60)"}
										bg={"#F4F4F4"}
									>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Invoice No.
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Name
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Initial Amount
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Amount Due
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Due Date
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Status
										</Th>
									</Tr>
								</Thead>
								<Tbody>
									{allSentInvoices.map((singleInvoice, index) => (
			
										<InvoicePerRow key={index} singleInvoice={singleInvoice} />
									))}
								</Tbody>
							</Table>
						</TabPanel>

						<TabPanel>
							<Table variant="simple" colorScheme="gray" size={"md"} mt={5}>
								<Thead>
								<Tr
										p={2}
										borderBottom={"0.5px solid rgba(0, 0, 0, 0.60)"}
										borderTop={"0.5px solid rgba(0, 0, 0, 0.60)"}
										bg={"#F4F4F4"}
									>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Invoice No.
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Name
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Initial Amount
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Amount Due
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Due Date
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Status
										</Th>
									</Tr>
								</Thead>
								<Tbody>
									{allPaidInvoices.map((singleInvoice, index) => (
										<InvoicePerRow key={index} singleInvoice={singleInvoice} />
									))}
								</Tbody>
							</Table>
						</TabPanel>

						<TabPanel>
							<Table variant="simple" colorScheme="gray" size={"md"} mt={5}>
								<Thead>
								<Tr
										p={2}
										borderBottom={"0.5px solid rgba(0, 0, 0, 0.60)"}
										borderTop={"0.5px solid rgba(0, 0, 0, 0.60)"}
										bg={"#F4F4F4"}
									>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Invoice No.
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Name
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Initial Amount
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Amount Due
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Due Date
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Status
										</Th>
									</Tr>
								</Thead>
								<Tbody>
									{allAwaitingPaymentInvoices.map((singleInvoice, index) => (
										<InvoicePerRow key={index} singleInvoice={singleInvoice} />
									))}
								</Tbody>
							</Table>
						</TabPanel>

						<TabPanel>
							<Table variant="simple" colorScheme="gray" size={"md"} mt={5}>
								<Thead>
								<Tr
										p={2}
										borderBottom={"0.5px solid rgba(0, 0, 0, 0.60)"}
										borderTop={"0.5px solid rgba(0, 0, 0, 0.60)"}
										bg={"#F4F4F4"}
									>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Invoice No.
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Name
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Initial Amount
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Amount Due
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Due Date
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Status
										</Th>
									</Tr>
								</Thead>
								<Tbody>
									{allRejectedInvoices.map((singleInvoice, index) => (
										<InvoicePerRow key={index} singleInvoice={singleInvoice} />
									))}
								</Tbody>
							</Table>
						</TabPanel>

						<TabPanel>
							<Table variant="simple" colorScheme="gray" size={"md"} mt={5}>
								<Thead>
								<Tr
										p={2}
										borderBottom={"0.5px solid rgba(0, 0, 0, 0.60)"}
										borderTop={"0.5px solid rgba(0, 0, 0, 0.60)"}
										bg={"#F4F4F4"}
									>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Invoice No.
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Name
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Initial Amount
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Amount Due
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Due Date
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Status
										</Th>
									</Tr>
								</Thead>
								<Tbody>
									{allOverdueInvoices.map((singleInvoice, index) => (
										<InvoicePerRow key={index} singleInvoice={singleInvoice} />
									))}
								</Tbody>
							</Table>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</>
	);
};

export default BillCon;




// import {
// 	Box,
// 	Button,
// 	Flex,
// 	Image,
// 	Tab,
// 	TabList,
// 	TabPanel,
// 	TabPanels,
// 	Table,
// 	Tabs,
// 	Tbody,
// 	Td,
// 	Text,
// 	Th,
// 	Thead,
// 	Tr,
// 	useColorModeValue,
// } from "@chakra-ui/react";

// const BillCon = () => {
// 	const billsData = [
// 		{
// 			id: 1,
// 			creationDate: "15/12/2023",
// 			invoiceNumber: "INV-1",
// 			client: "Musa Muhammed",
// 			amount: 50000,
// 			status: "Awaiting",
// 		},
// 	];

// 	return (
// 		<Flex pt={10}>
// 			<Box pl={20} w={"full"} pr={70}>
// 				<Flex justifyContent={"space-between"} alignItems={"center"}>
// 					<Box>
// 						<Text as={"h1"} fontSize={"2xl"} fontWeight={700}>
// 							Bills
// 						</Text>
// 						<Text as={"p"} fontSize={"xl"} fontWeight={300}>
// 							Manage all the invoices you received from vendors
// 						</Text>
// 					</Box>
// 					<Button
// 						bg={"#2970FF"}
// 						color={"#F6F6F6"}
// 						size={"lg"}
// 						transition={"all 1s"}
// 						fontSize={"xl"}
// 						_hover={{
// 							bg: useColorModeValue("#2970FF", "#599cff"),
// 						}}
// 						float={"right"}
// 					>
// 						Batch Payment
// 					</Button>
// 				</Flex>

// 				<Flex
// 					justifyContent={"center"}
// 					alignItems={"center"}
// 					flexDir={"column"}
// 				>
// 					<Box w={"full"}>
// 						<Tabs float={"right"}>
// 							<TabList>
// 								<Tab>All (1)</Tab>
// 								<Tab>Paid (0)</Tab>
// 								<Tab>Awaiting Payment (1)</Tab>
// 								<Tab>Rejected (0)</Tab>
// 								<Tab>Overdue (0)</Tab>
// 							</TabList>
// 							<TabPanels>
// 								<TabPanel></TabPanel>

// 								<TabPanel></TabPanel>

// 								<TabPanel></TabPanel>

// 								<TabPanel></TabPanel>

// 								<TabPanel></TabPanel>
// 							</TabPanels>
// 						</Tabs>
// 					</Box>

// 					<Box p={4} float={"right"} w={"full"}>
// 						<Table variant="simple">
// 							<Thead>
// 								<Tr
// 									p={4}
// 									borderBottom={"0.5px solid rgba(0, 0, 0, 0.60)"}
// 									borderTop={"0.5px solid rgba(0, 0, 0, 0.60)"}
// 									bg={"rgba(55, 73, 87, 0.1)"}
// 								>
// 									<Th color={"#1c1c1c"} fontSize={"xl"}>
// 										Creation Date
// 									</Th>
// 									<Th color={"#1c1c1c"} fontSize={"xl"}>
// 										Invoice No.
// 									</Th>
// 									<Th color={"#1c1c1c"} fontSize={"xl"}>
// 										Client
// 									</Th>
// 									<Th color={"#1c1c1c"} fontSize={"xl"}>
// 										Amount
// 									</Th>
// 									<Th color={"#1c1c1c"} fontSize={"xl"}>
// 										Status
// 									</Th>
// 								</Tr>
// 							</Thead>
// 							<Tbody>
// 								{billsData.map((bill) => (
// 									<Tr key={bill.id} borderBottom={"none"}>
// 										<Td color={"rgba(0, 0, 0, 0.50)"}>{bill.creationDate}</Td>
// 										<Td color={"rgba(0, 0, 0, 0.50)"}>{bill.invoiceNumber}</Td>
// 										<Td color={"rgba(0, 0, 0, 0.50)"}>{bill.client}</Td>
// 										<Td color={"rgba(0, 0, 0, 0.50)"}>{bill.amount}</Td>
// 										<Td color={"rgba(229, 211, 53, 0.50)"} fontWeight={700}>
// 											{bill.status}
// 										</Td>
// 									</Tr>
// 								))}
// 							</Tbody>
// 						</Table>
// 					</Box>
// 				</Flex>
// 			</Box>
// 		</Flex>
// 	);
// };

// export default BillCon;
