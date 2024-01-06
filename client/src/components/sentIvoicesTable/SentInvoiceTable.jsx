import { prevPathAtom } from "@/atoms/prevPathAtom";
import useLogout from "@/hooks/useLogout";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import DataTable from "./DataTable";
import { columns } from "./columns";
import { axiosInstance } from "../../../api/axios";
import SidebarWithHeader from "../SidebarWithHeader";
import { Box, Button, Flex, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue } from "@chakra-ui/react";

const SentInvoiceTable = () => {
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
		setLoading(true);
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
				setInvoiceToDownl(invoicesSent);
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
				setLoading(false);
			}
		};

		getAllSentInvoices();
	}, []);

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
		);
	}

	return (
		<>
				<Flex justifyContent={"space-between"} p={{base: 0, sm: 2, md: 4}} flexDir={"row"}>
					<Text as={"p"} fontSize={"3xl"} fontWeight={600} color={"black"}>
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
						
					</Flex>
				</Flex>

				<Box px={{sm: 2, md: 4}}>
					<Tabs align="end">
						<TabList>
							<Tab onClick={() => setInvoiceToDownl(allSentInvoices)}>
								All ({allSentInvoices.length})
							</Tab>
							<Tab onClick={() => setInvoiceToDownl(allPaidInvoices)}>
								Paid ({allPaidInvoices.length})
							</Tab>
							<Tab
								onClick={() => setInvoiceToDownl(allAwaitingPaymentInvoices)}
							>
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
								<DataTable data={allSentInvoices} columns={columns} />
							</TabPanel>

							<TabPanel>
								<DataTable data={allPaidInvoices} columns={columns} />
							</TabPanel>

							<TabPanel>
								<DataTable
									data={allAwaitingPaymentInvoices}
									columns={columns}
								/>
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

export default SentInvoiceTable;
