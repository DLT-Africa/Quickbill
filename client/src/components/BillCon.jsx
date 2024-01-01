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
				<Text fontSize={36} textAlign={"left"} fontWeight={700}>
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
