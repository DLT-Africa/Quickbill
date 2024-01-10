import { Flex, Text, Box, Spinner } from "@chakra-ui/react";
import { CgSmileSad } from "react-icons/cg";
import { IoMdCheckmarkCircleOutline, IoMdHappy } from "react-icons/io";
import { MdOutlinePending } from "react-icons/md";
import BarChart from "./BarChart";
import { useEffect, useState } from "react";
import {  useAxiosInstance } from "../../../api/axios";
import { calcPayments } from "../../utils/calcInvoicePayments";
import PieChart from "./PieChart";
import { TbSum } from "react-icons/tb";
import useErrorHandler from "../../hooks/useErrorHandler";

export default function Dashboard() {
	const [allSentInvoices, setAllSentInvoices] = useState([]);
	const [allPaidInvoices, setAllPaidInvoices] = useState([]);
	const [allRejectedInvoices, setAllRejectedInvoices] = useState([]);
	const [allOverdueInvoices, setAllOverdueInvoices] = useState([]);
	const [allAwaitingPaymentInvoices, setAllAwaitingPaymentInvoices] = useState(
		[]
	);
	const [allPartiallyPaidInvoices, setAllPartiallyPaidInvoices] = useState(
		[]
	);
	const [paymentSummary, setPaymentSummary] = useState(null);
	const [isFetching, setIsFetching] = useState(true);
	const [settingUpChart, isSettingUpChart] = useState(true);
	const axiosInstance = useAxiosInstance();
	const errorHandler = useErrorHandler();

	useEffect(() => {
		const getSummary = async () => {
			const calculatedSummary = await calcPayments(allSentInvoices);

			setPaymentSummary(calculatedSummary);
			isSettingUpChart(false);
		};

		getSummary();
	}, [allSentInvoices]);

	useEffect(() => {
		const getAllSentInvoices = async () => {
			setIsFetching(true);
			try {
				const response = await axiosInstance.get("/invoices/all-sent");
				const invoicesSent = response.data;
				// console.log(response.data);

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

				//filter partially paid invoices
				const filteredPartiallyPaid = invoicesSent.filter(
					(invoice) => invoice.invoiceStatus === "Partially Paid"
				)

				setAllSentInvoices(invoicesSent);
				setAllPaidInvoices(filteredPaidInvoices);
				setAllRejectedInvoices(filteredRejectedInvoices);
				setAllOverdueInvoices(filteredOverdueInvoices);
				setAllAwaitingPaymentInvoices(filteredAwaitingPaymentInvoices);
				setAllPartiallyPaidInvoices(filteredPartiallyPaid);
			} catch (error) {
				errorHandler(error);
			} finally {
				setIsFetching(false);
			}
		};
		getAllSentInvoices();
	}, []);

	if (isFetching || settingUpChart) {
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

	if (isFetching || settingUpChart) {
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
		<Flex mt={6} pb={9} flexDir={"column"} placeItems={"center"} gap={10}>
			<Flex
				gap={9}
				p={10}
				flexWrap={"wrap"}
				color={"black"}
				justifyContent={"flex-start"}
			>
				<Flex
					// w={200}
					flexGrow={1}
					// h={150}
					bg={"white"}
					px={3}
					w={250}
					py={10}
					borderRadius={9}
					placeItems={"center"}
					gap={2}
					justifyContent={"center"}
				>
					<Flex flexDir={"column"} gap={1}>
						<Text fontSize={"xl"}>{paymentSummary?.totalReceived}</Text>
						<Text fontSize={"sm"} color={"#A09C9C"} fontWeight={700}>
							Payments Received
						</Text>
					</Flex>
					<IoMdCheckmarkCircleOutline size={50} color={"green"} />
				</Flex>
				<Flex
					flexGrow={1}
					px={3}
					w={250}
					py={10}					bg={"white"}
					borderRadius={9}
					placeItems={"center"}
					gap={2}
					justifyContent={"center"}
				>
					<Flex flexDir={"column"} gap={1}>
						<Text fontSize={"xl"}>{paymentSummary?.totalAwaitingBalance}</Text>
						<Text fontSize={"sm"} color={"#A09C9C"} fontWeight={700}>
							Pending Amount
						</Text>
					</Flex>
					<MdOutlinePending size={50} color={"#CBEE00"} />
				</Flex>{" "}
				<Flex
					flexGrow={1}
					px={3}
					w={250}
					py={10}					bg={"white"}
					borderRadius={9}
					placeItems={"center"}
					gap={2}
					justifyContent={"center"}
				>
					<Flex flexDir={"column"} gap={1}>
						<Text fontSize={"xl"}>{allSentInvoices?.length}</Text>
						<Text fontSize={"sm"} color={"#A09C9C"} fontWeight={700}>
							Total Invoices
						</Text>
					</Flex>
					<TbSum size={50} color={"#3A13FF"} />
				</Flex>
				<Flex
					flexGrow={1}
					px={3}
					w={250}
					py={10}					bg={"white"}
					borderRadius={9}
					placeItems={"center"}
					gap={2}
					justifyContent={"center"}
				>
					<Flex flexDir={"column"} gap={1}>
						<Text fontSize={"xl"}>{allPaidInvoices?.length}</Text>
						<Text fontSize={"sm"} color={"#A09C9C"} fontWeight={700}>
							Accepted Invoices
						</Text>
					</Flex>
					<IoMdHappy size={50} color={"#0BE82A"} />
				</Flex>
				<Flex
					flexGrow={{base:1, xl:0}}
					px={3}
					minW={275}
					py={10}					bg={"white"}
					borderRadius={9}
					placeItems={"center"}
					gap={2}
					justifyContent={"center"}
				>
					<Flex flexDir={"column"} gap={1}>
						<Text fontSize={"xl"}>{allRejectedInvoices?.length}</Text>
						<Text fontSize={"sm"} color={"#A09C9C"} fontWeight={700}>
							Rejected Invoices
						</Text>
					</Flex>
					<CgSmileSad size={50} color={"#FF1313"} />
				</Flex>
			</Flex>
			<Flex w={'90%'} p={1} flexDir={{base: 'column', lg: 'row'}}  justifyContent={'center'} gap={8}>
				<Box bg={"white"} w={{lg: '50%'}} p={3} borderRadius={20}>
					<BarChart invoiceData={allSentInvoices} />
				</Box>
				<Box bg={"white"} w={{lg: '50%'}}  p={3} borderRadius={20}>
					<PieChart
						paidInvoices={allPaidInvoices}
						awaitingPayment={allAwaitingPaymentInvoices}
						partiallyPaid={allPartiallyPaidInvoices}
						rejectedInvoices={allRejectedInvoices}
						overdueInvoices={allOverdueInvoices}
					/>
				</Box>
			</Flex>
		</Flex>
	);
}
