import { prevPathAtom } from "@/atoms/prevPathAtom";
import useLogout from "@/hooks/useLogout";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import DataTable from "./DataTable";
import { columns } from "./columns";
import { useAxiosInstance } from "../../../api/axios";
import SidebarWithHeader from "../SidebarWithHeader";
import {
	Box,
	Button,
	Flex,
	Spinner,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import useErrorHandler from "@/hooks/useErrorHandler";

const BillsTable = () => {
	const [allReceivedInvoices, setAllReceivedInvoices] = useState([]);
	const [allPaidInvoices, setAllPaidInvoices] = useState([]);
	const [allRejectedInvoices, setAllRejectedInvoices] = useState([]);
	const [allOverdueInvoices, setAllOverdueInvoices] = useState([]);
	const [allAwaitingPaymentInvoices, setAllAwaitingPaymentInvoices] = useState(
		[]
	);
	const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);
	const [invoiceToDownl, setInvoiceToDownl] = useState([]);
	const [fetching, setFetching] = useState(true);
	const errorHandler = useErrorHandler();
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
				setFetching(false);
			}
		};
		getAllReceivedInvoices();
	}, []);

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
		);
	}

	return (
		<>
			<Flex justifyContent={"space-between"} p={8} flexDir={"row"}>
				<Box>
					<Text
						fontSize={{ base: "2xl", md: "3xl" }}
						textAlign={"left"}
						fontWeight={700}
					>
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
						size={{ base: "sm", md: "md" }}
						_hover={{
							bg: "#599cff",
						}}
						color={"#f5f5f5"}
						onClick={() => navigate("/invoices/create")}
					>
						Create invoice
					</Button>
				</Flex>
			</Flex>

			<Box px={{ sm: 2, md: 4 }}>
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
							<DataTable data={allReceivedInvoices} columns={columns} />
						</TabPanel>

						<TabPanel>
							<DataTable data={allPaidInvoices} columns={columns} />
						</TabPanel>

						<TabPanel>
							<DataTable data={allAwaitingPaymentInvoices} columns={columns} />
						</TabPanel>

						<TabPanel>
							<DataTable data={allRejectedInvoices} columns={columns} />
						</TabPanel>

						<TabPanel>
							<DataTable data={allOverdueInvoices} columns={columns} />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</>
	);
};

export default BillsTable;
