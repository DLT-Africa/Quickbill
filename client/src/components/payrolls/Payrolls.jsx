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
import allPayrollsAtom from "@/atoms/allPayrollsAtom";
import { calcPayrollData } from "@/utils/calcPayrollData";

const Payrolls = () => {
	const navigate = useNavigate();
	const [allPayrolls, setAllPayrolls] = useRecoilState(allPayrollsAtom);
	const [paidPayrolls, setPaidPayrolls] = useState([]);
	const [pendingPayrolls, setPendingPayrolls] = useState([]);
	const [voidedPayrolls, setVoidedPayrolls] = useState([]);
	const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);
	const [payrollSummary, setPayrollSummary] = useState({});
	const logout = useLogout();
	const [fetching, setFetching] = useState(true);
	const axiosInstance = useAxiosInstance();

	useEffect(() => {
		setFetching(true);
		const getPayrolls = async () => {
			try {
				const response = await axiosInstance.get("/payrolls/");
				const allPayrollsAPI = response.data;

				setAllPayrolls(allPayrollsAPI);
				console.log(allPayrollsAPI);

				// console.log(allPayrolls);
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
				setFetching(false);
			}
		};
		getPayrolls();
	}, []);

	useEffect(() => {
		const filteredPaidPayrolls = allPayrolls.filter(
			(payroll) => payroll.paymentStatus === "Paid"
		);
		const filteredPendingPayrolls = allPayrolls.filter(
			(payroll) => payroll.paymentStatus === "Awaiting Payment"
		);
		const filteredVoidedPayrolls = allPayrolls.filter(
			(payroll) => payroll.paymentStatus === "Voided"
		);

		setPaidPayrolls(filteredPaidPayrolls);
		setPendingPayrolls(filteredPendingPayrolls);
		setVoidedPayrolls(filteredVoidedPayrolls);
		const payrollSumm = calcPayrollData(allPayrolls);
		setPayrollSummary(payrollSumm);
		// console.log(payrollSumm)
		setFetching(false);
	}, [allPayrolls]);

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
		<div className="p-6">
			<Flex flexDir={"column"} gap={8}>
				<Flex mt={4} justifyContent={"space-between"}>
					<Flex flexDir={"column"}>
						<Text fontSize={36} textAlign={"left"} fontWeight={700}>
							Payroll
						</Text>
						<Text as={"p"} fontSize={"xl"} fontWeight={300}>
							Get a global overview
						</Text>
					</Flex>

					<Box>
						<Button
							transition={"all 1s"}
							bg={"#2970ff"}
							size={{ base: "sm", md: "md" }}
							_hover={{
								bg: "#599cff",
							}}
							color={"#f5f5f5"}
							onClick={() => navigate("/payrolls/create")}
						>
							One-Off Payment
						</Button>
					</Box>
				</Flex>

				<Flex gap={10}>
					<Flex
						flexDir={"column"}
						bg={"#DEEBF7"}
						py={2}
						px={6}
						borderRadius={10}
						border={"1px solid #fff"}
					>
						<Text fontSize={"2xl"} fontWeight={700}>
							{payrollSummary.totalPaid}
						</Text>
						<Text fontSize={"xl"} fontWeight={500} color={"#8E8E8E"}>
							Paid in total
						</Text>
					</Flex>
					<Flex flexDir={"column"} py={2} px={6} bg={"#fff"} borderRadius={10}>
						<Text fontSize={"2xl"} fontWeight={700}>
							{payrollSummary.totalAwaitingBalance}
						</Text>
						<Text fontSize={"xl"} fontWeight={500} color={"#8E8E8E"}>
							Left to be paid
						</Text>
					</Flex>
				</Flex>
			</Flex>

			<Box>
				<Tabs align="end">
					<TabList>
						<Tab>All ({allPayrolls.length})</Tab>
						<Tab>Paid ({paidPayrolls.length})</Tab>
						<Tab>Awaiting Payment ({pendingPayrolls.length})</Tab>
						<Tab>Voided ({voidedPayrolls.length})</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<DataTable data={allPayrolls} columns={columns} />
						</TabPanel>

						<TabPanel>
							<DataTable data={paidPayrolls} columns={columns} />
						</TabPanel>

						<TabPanel>
							<DataTable data={pendingPayrolls} columns={columns} />
						</TabPanel>

						<TabPanel>
							<DataTable data={voidedPayrolls} columns={columns} />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</div>
	);
};

export default Payrolls;
