import { prevPathAtom } from "@/atoms/prevPathAtom";
import useLogout from "@/hooks/useLogout";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import DataTable from "./DataTable";
import { columns } from "./columns";
import { useAxiosInstance } from "../../../api/axios";
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
} from "@chakra-ui/react";

const SentInvoices = () => {
	const [allSentInvoices, setAllSentInvoices] = useState([]);
	const [allPaidInvoices, setAllPaidInvoices] = useState([]);
	const [allRejectedInvoices, setAllRejectedInvoices] = useState([]);
	const [allOverdueInvoices, setAllOverdueInvoices] = useState([]);
	const [allAwaitingPaymentInvoices, setAllAwaitingPaymentInvoices] = useState(
		[]
	);
	const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);
	// const [invoiceToDownl, setInvoiceToDownl] = useState([]);
	const [loading, setLoading] = useState(true);
	const logout = useLogout();
	const navigate = useNavigate();
	const axiosInstance = useAxiosInstance();

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
				// setInvoiceToDownl(invoicesSent);
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
			<Flex
				justifyContent={"space-between"}
				p={7}
				flexDir={"row"}
			>
				<Text
					as={"p"}
					fontSize={{ base: "2xl", md: "3xl" }}
					fontWeight={600}
					color={"black"}
				>
					Sent invoices
				</Text>
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
						<Tab fontSize={{base: 'sm', lg: 'md'}}>All ({allSentInvoices.length})</Tab>
						<Tab fontSize={{base: 'sm', lg: 'md'}}>Paid ({allPaidInvoices.length})</Tab>
						<Tab fontSize={{base: 'sm', lg: 'md'}}>Awaiting Payment ({allAwaitingPaymentInvoices.length})</Tab>
						<Tab fontSize={{base: 'sm', lg: 'md'}}>Rejected ({allRejectedInvoices.length})</Tab>
						<Tab fontSize={{base: 'sm', lg: 'md'}}>Overdue ({allOverdueInvoices.length})</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<DataTable data={allSentInvoices} columns={columns} />
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

export default SentInvoices;
