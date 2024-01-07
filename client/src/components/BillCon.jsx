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
	Spinner,
} from "@chakra-ui/react";
import { GoDownload } from "react-icons/go";
import InvoicePerRow from "./InvoicePerRow";
import { useEffect } from "react";
import {  useAxiosInstance } from "../../api/axios";
import { prevPathAtom } from "../atoms/prevPathAtom";
import { useRecoilState } from "recoil";
import useLogout from "../hooks/useLogout";
import { downloadCSV } from "../utils/downloadInvoiceCSV";
import useErrorHandler from "../hooks/useErrorHandler";

const BillCon = () => {
	const [allReceivedInvoices, setAllReceivedInvoices] = useState([]);
	const [allPaidInvoices, setAllPaidInvoices] = useState([]);
	const [allRejectedInvoices, setAllRejectedInvoices] = useState([]);
	const [allOverdueInvoices, setAllOverdueInvoices] = useState([]);
	const [allAwaitingPaymentInvoices, setAllAwaitingPaymentInvoices] = useState(
		[]
	);
	const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);
	const [invoiceToDownl, setInvoiceToDownl] = useState([]);
	const [fetching, setFetching] = useState(true)
	const errorHandler = useErrorHandler()
	const axiosInstance = useAxiosInstance();


	const logout = useLogout();

	const navigate = useNavigate();

	useEffect(() => {
		const getAllReceivedInvoices = async () => {
			try {
				const response = await axiosInstance.get("/invoices/all-received");
				const invoicesReceived = response.data;
				console.log(response.data);

				//filter all paid invoices
				const filteredPaidInvoices = invoicesReceived.filter(
					(invoice) => invoice.invoiceStatus === "Paid"
				);

				//filter rejected invoices
				const filteredRejectedInvoices = invoicesReceived.filter(
					(invoice) => invoice.invoiceStatus === "Rejected"
				);

				//filter overdue invoice
				const filteredOverdueInvoices = invoicesReceived.filter(
					(invoice) => invoice.invoiceStatus === "Overdue"
				);

				//filter awaiting payment invoice
				const filteredAwaitingPaymentInvoices = invoicesReceived.filter(
					(invoice) => invoice.invoiceStatus === "Awaiting Payment"
				);

				setInvoiceToDownl(invoicesReceived);
				setAllReceivedInvoices(invoicesReceived);
				setAllPaidInvoices(filteredPaidInvoices);
				setAllRejectedInvoices(filteredRejectedInvoices);
				setAllOverdueInvoices(filteredOverdueInvoices);
				setAllAwaitingPaymentInvoices(filteredAwaitingPaymentInvoices);
			} catch (error) {
				console.log(error);
					errorHandler(error);
			} finally {
				setFetching(false)
			}
		};
		getAllReceivedInvoices();
	}, []);

	const handleDownload = () => {
		downloadCSV(invoiceToDownl);
	};

	if (fetching) {
		return (
			<Flex
				justifyContent={"center"}
				flexDir={"column"}
				gap={2}
				alignItems={"center"}
				minH={"100vh"}
			>
				<Spinner size={"xl"} />
			</Flex>
		);}

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
						onClick={handleDownload}
						color={"black"}
						cursor={"pointer"}
					/>
				</Flex>
			</Flex>

			<Box px={5}>
				<Tabs align="end">
					<TabList>
						<Tab onClick={() => setInvoiceToDownl(allReceivedInvoices)}>
							All ({allReceivedInvoices.length})
						</Tab>
						<Tab onClick={() => setInvoiceToDownl(allPaidInvoices)}>
							Paid ({allPaidInvoices.length})
						</Tab>
						<Tab onClick={() => setInvoiceToDownl(allAwaitingPaymentInvoices)}>
							Awaiting Payment ({allAwaitingPaymentInvoices.length})
						</Tab>
						<Tab onClick={() => setInvoiceToDownl(allRejectedInvoices)}>
							Rejected ({allRejectedInvoices.length})
						</Tab>
						<Tab onClick={() => setInvoiceToDownl(allOverdueInvoices)}>
							Overdue ({allOverdueInvoices.length})
						</Tab>
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
									{allReceivedInvoices.map((singleInvoice, index) => (
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
