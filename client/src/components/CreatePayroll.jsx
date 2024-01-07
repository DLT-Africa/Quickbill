import React, { useCallback, useEffect, useState } from "react";
import ReactSelect from "react-select";
import {
	Box,
	Flex,
	Text,
	Button,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	Th,
	Icon,
} from "@chakra-ui/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {  useAxiosInstance } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import addClientModalOpenAtom from "../atoms/addClientModalOpenAtom";
import { MdOutlineCancel } from "react-icons/md";
import useShowToast from "../hooks/useShowToast";
import { format } from "date-fns";
import AddEmployeeModal from "./AddEmployeeModal";
import allEmployeesAtom from "../atoms/allEmployeesAtom";
import { prevPathAtom } from "../atoms/prevPathAtom";
import useLogout from "../hooks/useLogout";
import allPayrollsAtom from "../atoms/allPayrollsAtom";

const todayDate = new Date();

function CreatePayroll() {
	const [employees, setEmployees] = useRecoilState(allEmployeesAtom);
	const [currentPayrollNumber, setcurrentPayrollNumber] = useState("");
	const [employeeSelectOption, setEmployeesSelectOptions] = useState("");
	const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null);
	const [isSelectedEmployee, setIsSelectedEmployee] = useState(false);
	const [payrollNote, setPayrollNote] = useState();
	const [bankName, setBankName] = useState("");
	const [accountName, setAccountName] = useState("");
	const [accountNumber, setAccountNumber] = useState("");
	const [salary, setSalary] = useState("");
	const [selectedCurrency, setSelectedCurrency] = useState("USD");
	const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);
	const [allPayrolls, setAllPayrolls] = useRecoilState(allPayrollsAtom);
	const logout = useLogout();
	const setAddClientModalOpen = useSetRecoilState(addClientModalOpenAtom);
	const showToast = useShowToast();
	const [loading, setLoading] = useState(false);
	const [loadingPayLater, setLoadingPayLater] = useState(false);
	const axiosInstance = useAxiosInstance();
	// const [inviteModalOpen, setInviteModalOpen] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const getInvoiceNo = async () => {
			try {
				const response = await axiosInstance.get("/payrolls");
				const data = response.data;
				// console.log(data);
				const totalPayrolls = data.length;
				const newInvNo = totalPayrolls + 1;
				const formattedPayrollNumber = newInvNo.toString().padStart(3, "0");
				setcurrentPayrollNumber(formattedPayrollNumber);
				// setInvoice({ ...invoice, invoiceNumber: formattedInvoiceNumber });
			} catch (error) {
				console.log(error.response);
				const errorData = error.response?.data;
				if (errorData?.error?.startsWith("Internal")) {
					console.log("Internal Server Error");
				} else if (errorData?.error?.startsWith("jwt" || "Unauthorized")) {
					setPrevPath(window?.location?.pathname);
					logout();
				} else if (error?.response?.status === 401) {
					setPrevPath(window.location.pathname);
					logout();
				}
			}
		};

		getInvoiceNo();
	}, []);

	useEffect(() => {
		const setOptions = () => {
			const options = employees?.map((employee) => {
				return { value: employee._id, label: employee.name };
			});

			setEmployeesSelectOptions(options);
		};
		setOptions();
	}, [employees]);

	useEffect(() => {
		const getAllEmployees = async () => {
			try {
				const response = await axiosInstance.get("/employees");
				const data = response.data;
				setEmployees(data);
				localStorage.setItem("employees-quickBill", JSON.stringify(data));
				console.log(data);
			} catch (error) {
				console.log(error);
				const errorData = error.response?.data;
				if (errorData?.error?.startsWith("Internal")) {
					console.log("Internal Server Error");
				} else if (errorData?.error?.startsWith("jwt" || "Unauthorized")) {
					setPrevPath(window.location.pathname);
					logout();
				} else if (error.response.status === 401) {
					setPrevPath(window.location.pathname);
					logout();
				}
			}
		};
		getAllEmployees();
	}, []);

	const handleSelectedEmployee = useCallback(
		async (selectedOptionValue) => {
			const employeeId = selectedOptionValue.value;
			const selectedEmployee = employees.find(
				(employee) => employee._id === employeeId
			);
			setSelectedEmployeeDetails(selectedEmployee);
			setIsSelectedEmployee(true);
		},
		[employees]
	);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const activeButton = e.nativeEvent.submitter;
		activeButton.name === "payNow" ? setLoading(true) : null;
		activeButton.name === "payLater" ? setLoadingPayLater(true) : null;


		if (!isSelectedEmployee) {
			showToast("Error", "Please select a employee before submitting", "error");
			return;
		}

		// Update the invoiceAtom state with the current data

		const payrollDetails = {
			payrollNumber: currentPayrollNumber,
			employeeId: selectedEmployeeDetails._id, // Replace with actual logic
			note: payrollNote,
			bankName: bankName,
			accountName: accountName,
			accountNumber: accountNumber,
			salary: salary,
			paymentDate: activeButton.name === "payNow" ? todayDate : "",
			paymentStatus:
				activeButton.name === "payNow" ? "Paid" : "Awaiting Payment",
			currency: selectedCurrency,
		};

		console.log(payrollDetails);

		try {
			const response = await axiosInstance.post("/payrolls/create", {
				payrollDetails,
			});
			const data = response.data;
			console.log(data);
			setAllPayrolls(data);

			activeButton.name === "payNow"
				? showToast("Success", "Salary Paid Successfully", "success")
				: showToast("Success", "Payroll Saved to Pay Later", "success");
			// navigate(`/invoices/${newInvoice._id}`);
		} catch (error) {
			const errorData = error.response?.data;
			if (errorData?.error?.startsWith("Internal")) {
				console.log("Internal Server Error");
			} else if (errorData?.error?.startsWith("jwt" || "Unauthorized")) {
				setPrevPath(window.location.pathname);
				logout();
			} else if (error.response.status === 401) {
				setPrevPath(window.location.pathname);
				logout();
			}
		} finally {
			setLoading(false)
			setLoadingPayLater(false)
		}
	};

	return (
		<>
			<Box
				m={10}
				py={10}
				border={"1px solid black"}
				bg={"#fff"}
				borderRadius={10}
			>
				<Box textAlign={"right"} px={10}>
					<Text fontSize={"36px"} fontWeight={700}>
						SALARY{" "}
					</Text>
					<Text fontWeight={400} fontSize={"26px"}>
						Salary #: {currentPayrollNumber}
					</Text>
				</Box>
				<Box borderBottom="1px" borderColor="gray" w={"full"} mb={20}></Box>

				<Flex
					flexDir={"column"}
					w={"60%"}
					m={"auto"}
					px={30}
					bg={"#F3F3F3"}
					borderRadius={15}
				>
					<Flex gap={5} pt={"27"} flexDir={"column"} pb={"2"} px={10}>
						<Box mt={8}>
							<Text fontWeight={500} fontSize={"2xl"}>
								DATE: {format(todayDate, "PP")}
							</Text>
						</Box>

						<form
							onSubmit={(e) => {
								e.preventDefault();
								setAddClientModalOpen(true);
							}}
						>
							<Box>
								<Text as={"h2"} fontSize={"xl"} fontWeight={600}>
									Employer Details
								</Text>
								{!isSelectedEmployee ? (
									<Flex gap={2} flexDir={"column"}>
										<Box w={250}>
											<ReactSelect
												onChange={handleSelectedEmployee}
												options={employeeSelectOption}
												placeholder="Select Employee"
											/>
										</Box>
										<Button
											bg={"#2970FF"}
											color={"#F6F6F6"}
											w={150}
											_hover={{ bg: "blue" }}
											type="submit"
										>
											Add New Employee
										</Button>
									</Flex>
								) : (
									<Flex gap={4}>
										<Box>
											<Text>{selectedEmployeeDetails?.name}</Text>
											<Text>{selectedEmployeeDetails?.email}</Text>
											<Text>{selectedEmployeeDetails?.jobTitle}</Text>
											<Text>{selectedEmployeeDetails?.department}</Text>
										</Box>
										<Icon
											as={MdOutlineCancel}
											fontSize={"2xl"}
											cursor={"pointer"}
											color={"red"}
											onClick={() => setIsSelectedEmployee(false)}
										/>
									</Flex>
								)}
							</Box>
						</form>

						<AddEmployeeModal />
					</Flex>
					{/* <Flex justifyContent={"space-between"} alignItems={"center"}></Flex> */}
					<form onSubmit={handleSubmit}>
						<Flex gap={6} flexDir={"column"} p={10}>
							<FormControl isRequired colorScheme="red">
								<FormLabel>Bank Name</FormLabel>
								<Input
									bg={"white"}
									py={6}
									placeholder="Bank Name"
									value={bankName}
									onChange={(e) => setBankName(e.target.value)}
								/>
							</FormControl>
							<FormControl isRequired>
								<FormLabel>Account Name</FormLabel>
								<Input
									bg={"white"}
									placeholder="Account Name"
									value={accountName}
									onChange={(e) => setAccountName(e.target.value)}
								/>
							</FormControl>
							<FormControl isRequired>
								<FormLabel>Account Number</FormLabel>
								<Input
									bg={"white"}
									type="number"
									placeholder="Account Number"
									value={accountNumber}
									onChange={(e) => setAccountNumber(e.target.value)}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Salary Currency</FormLabel>
								<Text>US Dollar</Text>
							</FormControl>
							<FormControl isRequired>
								<FormLabel>Salary Amount ({selectedCurrency})</FormLabel>
								<Input
									bg={"white"}
									placeholder="Salary"
									type="number"
									value={salary}
									onChange={(e) => setSalary(e.target.value)}
								/>
							</FormControl>
							{/* <FormControl isRequired>
					<FormLabel>First name</FormLabel>
					<Input  bg={'white'}  placeholder="First name" />
				</FormControl> */}
						</Flex>

						<Flex pb={"30px"} flexDir={"column"} px={10} pt={"17px"}>
							<Text>Note/Additional Information</Text>
							<Box>
								<Textarea
									bg={"white"}
									placeholder="Kindly provide additional details or terms of service "
									value={payrollNote}
									onChange={(e) => setPayrollNote(e.target.value)}
								/>
							</Box>
						</Flex>

						<Box mt={8}>
							<Flex justifyContent="center" gap={8} pb={5}>
								<Button
									type="submit"
									_hover={{ bg: "blue" }}
									color={"white"}
									bg={"#2970FF"}
									name="payLater"
									isLoading={loadingPayLater}
									loadingText={"Saving as draft"}
								>
									Save and Pay Later
								</Button>
								<Button
									type="submit"
									_hover={{ bg: "blue" }}
									color={"white"}
									bg={"#2970FF"}
									name="payNow"
									isLoading={loading}
									loadingText={loading ? "Paying..." : "Pay Now"}
								>
									Pay Now
								</Button>
							</Flex>
						</Box>
					</form>
				</Flex>
			</Box>
		</>
	);
}

export default CreatePayroll;
