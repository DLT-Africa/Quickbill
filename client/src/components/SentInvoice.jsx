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
import { axiosInstance } from "../../api/axios";
import useLogout from "../hooks/useLogout";
import { useRecoilState } from "recoil";
import { prevPathAtom } from "../atoms/prevPathAtom";
import { downloadCSV } from "../utils/downloadInvoiceCSV";

const SentInvoice = () => {
	const [allSentInvoices, setAllSentInvoices] = useState([]);
	const [allPaidInvoices, setAllPaidInvoices] = useState([]);
	const [allRejectedInvoices, setAllRejectedInvoices] = useState([]);
	const [allOverdueInvoices, setAllOverdueInvoices] = useState([]);
	const [allAwaitingPaymentInvoices, setAllAwaitingPaymentInvoices] = useState(
		[]
	);
	const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);
	const [invoiceToDownl, setInvoiceToDownl] = useState([]);
	const [loading, setLoading] = useState(true);
	const logout = useLogout();

	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true)
		const getAllSentInvoices = async () => {
			
			try {
				const response = await axiosInstance.get("/invoices/all-sent");
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
				setInvoiceToDownl(invoicesSent)
				setAllPaidInvoices(filteredPaidInvoices);
				setAllRejectedInvoices(filteredRejectedInvoices);
				setAllOverdueInvoices(filteredOverdueInvoices);
				setAllAwaitingPaymentInvoices(filteredAwaitingPaymentInvoices);
			} catch (error) {
				console.log(error);
				const errorData = error.response?.data;
				if (errorData?.error?.startsWith("Internal")) {
					console.log("Internal Server Error");
				} else if (errorData?.error?.startsWith("jwt" || "Unauthorized")) {
					setPrevPath(window.location.pathname);
					logout();
				} else if (error?.response?.status === 401) {
					setPrevPath(window.location.pathname);
					logout();
				}
			} finally {
				setLoading(false)
			}
		};

		setTimeout(() => {
			
			getAllSentInvoices();
		}, 500);
	}, []);

	const handleDownload = () => {
		downloadCSV(invoiceToDownl);
	};

	if (loading) {
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
				<Text as={"p"} fontSize={"4xl"} fontWeight={600} color={"black"}>
					Sent invoices
				</Text>
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
						onClick={handleDownload}
						// size={'md'}
						fontSize={36}
						// fontWeight={400}
						color={"black"}
						cursor={"pointer"}
						transition={"all 1s"}
						_hover={{color: 'blue'}}
					/>
				</Flex>
			</Flex>

			<Box px={5}>
				<Tabs align="end">
					<TabList>
						<Tab onClick={() => setInvoiceToDownl(allSentInvoices)}>
							All ({allSentInvoices.length})
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
										bg={"rgba(55, 73, 87, 0.1)"}
									>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Invoice No.
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Client
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
											Client
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
											Client
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
											Client
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
											Client
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

export default SentInvoice;
