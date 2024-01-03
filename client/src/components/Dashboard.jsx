import { Flex, Text, Box, Spinner } from "@chakra-ui/react";

import { CgSmileSad } from "react-icons/cg";

import { IoMdCheckmarkCircleOutline, IoMdHappy } from "react-icons/io";
import { MdOutlinePending, MdOutlinePayment } from "react-icons/md";
import SidebarWithHeader from "./SidebarWithHeader";
import BarChart from "./BarChart";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { prevPathAtom } from "../atoms/prevPathAtom";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/axios";
import { calcPayments } from "../utils/calcInvoicePayments";
import PieChart from "./PieChart";
import { TbSum } from "react-icons/tb";

import { set } from "date-fns";
import useShowToast from "../hooks/useShowToast";
import useErrorHandler from "../hooks/useErrorHandler";

export default function Dashboard() {
	const [allSentInvoices, setAllSentInvoices] = useState([]);
	const [allPaidInvoices, setAllPaidInvoices] = useState([]);
	const [allRejectedInvoices, setAllRejectedInvoices] = useState([]);
	const [allOverdueInvoices, setAllOverdueInvoices] = useState([]);
	const [allAwaitingPaymentInvoices, setAllAwaitingPaymentInvoices] = useState(
		[]
	);
	const [paymentSummary, setPaymentSummary] = useState(null);
	const [isFetching, setIsFetching] = useState(true);
	const [settingUpChart, isSettingUpChart] = useState(true);
	const errorHandler = useErrorHandler()

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
				errorHandler(error)
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
		return(<Flex
			justifyContent={"center"}
			flexDir={"column"}
			gap={2}
			alignItems={"center"}
			minH={"100vh"}
		>
			<Spinner size={"xl"} />
		</Flex>)
	}

	return (
		<Flex mt={6} flexDir={"column"} placeItems={"center"} gap={10}>
			<Flex
				gap={9}
				flexWrap={"wrap"}
				color={"black"}
				justifyContent={"space-around"}
			>
				<Flex
					w={200}
					h={150}
					bg={"white"}
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
					w={200}
					h={150}
					bg={"white"}
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
					w={200}
					h={150}
					bg={"white"}
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
					w={200}
					h={150}
					bg={"white"}
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
					w={200}
					h={150}
					bg={"white"}
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
			<Flex w={"85%"} gap={3}>
				<Box bg={"white"} p={3} w={"50%"} borderRadius={20}>
					<BarChart invoiceData={allSentInvoices} />
				</Box>
				<Box bg={"white"} p={3} w={"50%"} borderRadius={20}>
					<PieChart
						paidInvoices={allPaidInvoices}
						awaitingPayment={allAwaitingPaymentInvoices}
						rejectedInvoices={allRejectedInvoices}
						overdueInvoices={allOverdueInvoices}
					/>
				</Box>
			</Flex>
		</Flex>
	);
}
