import {
	Box,
	Button,
	Flex,
	Text,
	useColorModeValue,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Tr,
	Td,
	Thead,
	Table,
	Th,
	Tbody,
	Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import {  useAxiosInstance } from "../../api/axios";
import useLogout from "../hooks/useLogout";
import { prevPathAtom } from "../atoms/prevPathAtom";
import { useRecoilState } from "recoil";
import PayrollRow from "./PayrollRow";
import allPayrollsAtom from "../atoms/allPayrollsAtom";
import { calcPayrollData } from "../utils/calcPayrollData";

const Payroll = () => {
	const navigate = useNavigate();
	const [allPayrolls, setAllPayrolls] = useRecoilState(allPayrollsAtom);
	const [paidPayrolls, setPaidPayrolls] = useState([]);
	const [pendingPayrolls, setPendingPayrolls] = useState([]);
	const [voidedPayrolls, setVoidedPayrolls] = useState([]);
	const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);
	const [payrollSummary, setPayrollSummary] = useState({})
	const logout = useLogout();
	const [fetching, setFetching] = useState(true)
	const axiosInstance = useAxiosInstance();

	useEffect(() => {
		const getPayrolls = async () => {
			try {
				const response = await axiosInstance.get("/payrolls/");
				const allPayrolls = response.data;

				setAllPayrolls(allPayrolls);
				console.log(allPayrolls)

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
		const payrollSumm = calcPayrollData(allPayrolls)
		setPayrollSummary(payrollSumm)
		// console.log(payrollSumm)
		setFetching(false)

	}, [allPayrolls]);

	if (fetching ) {
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
			<Box as="section" px={10}>
				<Flex flexDir={"column"} gap={10}>
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
									_hover={{
										bg: useColorModeValue("#599cff"),
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
								<Text fontSize={"3xl"} fontWeight={700}>
									{payrollSummary.totalPaid}
								</Text>
								<Text fontSize={"xl"} fontWeight={500} color={"#8E8E8E"}>
									Paid in total
								</Text>
							</Flex>
							<Flex
								flexDir={"column"}
								py={2}
								px={6}
								bg={"#fff"}
								borderRadius={10}
							>
								<Text fontSize={"3xl"} fontWeight={700}>
									{payrollSummary.totalAwaitingBalance}
								</Text>
								<Text fontSize={"xl"} fontWeight={500} color={"#8E8E8E"}>
									Left to be paid
								</Text>
							</Flex>
						</Flex>
					</Flex>

					<Box px={5}>
						<Tabs align={"end"} size={"lg"}>
							<TabList>
								<Tab>All ({allPayrolls?.length})</Tab>
								<Tab>Paid ({paidPayrolls?.length})</Tab>
								<Tab>Awaiting Payment ({pendingPayrolls?.length})</Tab>
								<Tab>Voided ({voidedPayrolls?.length})</Tab>
							</TabList>
							<TabPanels>
								<TabPanel>
									<Table variant="simple" colorScheme="gray" size={"md"}>
										<Thead>
											<Tr
												p={4}
												borderBottom={"0.5px solid rgba(0, 0, 0, 0.60)"}
												borderTop={"0.5px solid rgba(0, 0, 0, 0.60)"}
												bg={"rgba(55, 73, 87, 0.1)"}
											>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Name
												</Th>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Department
												</Th>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Job Title
												</Th>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Salary
												</Th>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Payment Date
												</Th>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Status
												</Th>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Action
												</Th>
											</Tr>
										</Thead>
										<Tbody>
											{allPayrolls?.map((singlePayroll, index) => (
												<PayrollRow key={index} singlePayroll={singlePayroll} />
											))}
										</Tbody>
									</Table>
								</TabPanel>

								<TabPanel>
									{" "}
									<Table variant="simple" colorScheme="gray" size={"md"}>
										<Thead>
											<Tr
												p={4}
												borderBottom={"0.5px solid rgba(0, 0, 0, 0.60)"}
												borderTop={"0.5px solid rgba(0, 0, 0, 0.60)"}
												bg={"rgba(55, 73, 87, 0.1)"}
											>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Name
												</Th>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Department
												</Th>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Job Title
												</Th>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Salary
												</Th>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Payment Date
												</Th>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Status
												</Th>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Action
												</Th>
											</Tr>
										</Thead>
										<Tbody>
											{paidPayrolls?.map((singlePayroll, index) => (
												<PayrollRow key={index} singlePayroll={singlePayroll} />
											))}
										</Tbody>
									</Table>
								</TabPanel>

								<TabPanel>
									{" "}
									<Table variant="simple" colorScheme="gray" size={"md"}>
										<Thead>
											<Tr
												p={4}
												borderBottom={"0.5px solid rgba(0, 0, 0, 0.60)"}
												borderTop={"0.5px solid rgba(0, 0, 0, 0.60)"}
												bg={"rgba(55, 73, 87, 0.1)"}
											>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Name
												</Th>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Department
												</Th>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Job Title
												</Th>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Salary
												</Th>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Payment Date
												</Th>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Status
												</Th>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Action
												</Th>
											</Tr>
										</Thead>
										<Tbody>
											{pendingPayrolls?.map((singlePayroll, index) => (
												<PayrollRow key={index} singlePayroll={singlePayroll} />
											))}
										</Tbody>
									</Table>
								</TabPanel>

								<TabPanel>
									{" "}
									<Table variant="simple" colorScheme="gray" size={"md"}>
										<Thead>
											<Tr
												p={4}
												borderBottom={"0.5px solid rgba(0, 0, 0, 0.60)"}
												borderTop={"0.5px solid rgba(0, 0, 0, 0.60)"}
												bg={"rgba(55, 73, 87, 0.1)"}
											>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Name
												</Th>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Department
												</Th>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Job Title
												</Th>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Salary
												</Th>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Payment Date
												</Th>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Status
												</Th>
												<Th color={"#1c1c1c"} fontSize={"l"}>
													Action
												</Th>
											</Tr>
										</Thead>
										<Tbody>
											{voidedPayrolls?.map((singlePayroll, index) => (
												<PayrollRow key={index} singlePayroll={singlePayroll} />
											))}
										</Tbody>
									</Table>
								</TabPanel>
							</TabPanels>
						</Tabs>
					</Box>
				</Flex>
			</Box>
		</>
	);
};

export default Payroll;
