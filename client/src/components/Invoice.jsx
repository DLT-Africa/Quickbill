import React, { useCallback, useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import ReactSelect from "react-select";

import {
	Box,
	Flex,
	Text,
	Table,
	Tbody,
	Thead,
	Tr,
	Td,
	Button,
	Input,
	Textarea,
	Th,
	Icon,
	FormControl,
	FormLabel,
	Spinner,
	Accordion,
} from "@chakra-ui/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import invoiceAtom from "../atoms/invoiceAtom";
import userAtom from "../atoms/userAtom";
import { useAxiosInstance } from "../../api/axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AddClientModal from "./AddClientModal";
import addClientModalOpenAtom from "../atoms/addClientModalOpenAtom";
import allClientsAtom from "../atoms/allClientsAtom";
import { MdOutlineCancel } from "react-icons/md";
import currencies from "../utils/currencies.json";
import ItemRow from "./ItemRow";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";
import { prevPathAtom } from "../atoms/prevPathAtom";
import { encodePayload, decodeToken } from "../utils/tokenUtils";
import ItemPerAccordion from "./ItemPerAccordion";

const todayDate = new Date();
const rawDueDate = addDays(todayDate, 7);
const currencyOptions = currencies;

function Invoice() {
	const [invoice, setInvoice] = useRecoilState(invoiceAtom);
	const [user, setUser] = useRecoilState(userAtom);
	const [clients, setClients] = useRecoilState(allClientsAtom);
	const [currentInvoiceNumber, setcurrentInvoiceNumber] = useState("");
	const [clientsSelectOptions, setClientsSelectOptions] = useState("");
	const [selectedClientDetails, setSelectedClientDetails] = useState(null);
	const [isSelectedClient, setIsSelectedClient] = useState(false);
	const [selectedDueDate, setSelectedDueDate] = useState(rawDueDate);
	const [selectedCurrency, setSelectedCurrency] = useState("USD");
	const [invoiceItems, setInvoiceItems] = useState([
		{
			itemName: "",
			qty: "",
			price: "",
			discPercent: "",
			amtAfterDiscount: (0.0).toFixed(2),
			discValue: "",
			amtBeforeDiscount: "",
		},
	]);
	const [totalDiscount, setTotalDiscount] = useState(0);
	const [vatRate, setVatRate] = useState("");
	const [invoiceNote, setInvoiceNote] = useState();
	const [vatAmt, setVatAmt] = useState(0);
	const [subTotal, setSubTotal] = useState(0);
	const [totalAmtAfterDiscount, setTotalAmtAfterDiscount] = useState(0);
	const [grandTotal, setGrandTotal] = useState(0);
	const [paymentDetails, setPaymentDetails] = useState({});
	const setAddClientModalOpen = useSetRecoilState(addClientModalOpenAtom);
	const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);
	const axiosInstance = useAxiosInstance();

	const { encodedToken } = useParams();
	const [loading, setLoading] = useState(false);

	let decodedTokenDetails;
	if (encodedToken) {
		decodedTokenDetails = decodeToken(encodedToken);
	}

	// console.log(decodedTokenDetails);

	const showToast = useShowToast();
	const logout = useLogout();
	// const [inviteModalOpen, setInviteModalOpen] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (user?.email === decodedTokenDetails?.email) {
			showToast("Error", "You cannot send invoice to yourself", "error");
			navigate("/dashboard");
		}
		const getInvoiceNo = async () => {
			try {
				const response = await axiosInstance.get("/invoices/all-sent");
				const data = response.data;
				// console.log(data);
				const totalInvoices = data.length;
				const newInvNo = totalInvoices + 1;
				const formattedInvoiceNumber = newInvNo.toString().padStart(3, "0");
				setcurrentInvoiceNumber(formattedInvoiceNumber);
				// setInvoice({ ...invoice, invoiceNumber: formattedInvoiceNumber });
			} catch (error) {
				console.log(error.response);
				const errorData = error.response?.data;
				if (errorData?.error?.startsWith("Internal")) {
					console.log("Internal Server Error");
				} else if (errorData?.error?.startsWith("jwt" || "Unauthorized")) {
					setPrevPath(window.location.pathname);
					logout();
				}
			}
		};

		getInvoiceNo();
	}, []);

	useEffect(() => {
		const setOptions = () => {
			const options = clients?.map((client) => {
				return { value: client._id, label: client.name };
			});

			setClientsSelectOptions(options);
		};
		setOptions();
	}, [clients]);

	useEffect(() => {
		const getAllClients = async () => {
			try {
				const response = await axiosInstance.get("/clients");
				const data = response.data;
				setClients(data);
				localStorage.setItem("clients-quickBill", JSON.stringify(data));
				// console.log(data);
			} catch (error) {
				console.log(error);
				const errorData = error.response?.data;
				if (errorData?.error?.startsWith("Internal")) {
					// console.log("Internal Server Error");
					showToast("Error", "Internal Server Error", "error");
				} else if (errorData?.error?.startsWith("jwt" || "Unauthorized")) {
					if (decodedTokenDetails) {
						localStorage.setItem("localPrevPath", window.location.pathname);
						logout();
					} else {
						setPrevPath(window.location.pathname);
						logout();
					}
				} else if (error?.response?.status === 401) {
					if (decodedTokenDetails) {
						localStorage.setItem("localPrevPath", window.location.pathname);
						logout();
					} else {
						setPrevPath(window.location.pathname);
						logout();
					}
				}
			}
		};
		getAllClients();
	}, []);

	// useEffect(() => {
	// 	// console.log(invoice);
	// 	console.log(paymentDetails);
	// }, [paymentDetails]);

	const addRow = () => {
		const newRow = {
			itemName: "",
			qty: "",
			price: "",
			discPercent: "",
			amtAfterDiscount: (0.0).toFixed(2),
			discValue: "",
			amtBeforeDiscount: "",
		};
		setInvoiceItems((prevData) => [...prevData, newRow]);
	};

	const deleteRow = (index) => {
		const updatedData = [...invoiceItems];
		updatedData.splice(index, 1);
		setInvoiceItems(updatedData);
	};

	const handlePaymentDetailsInput = (property, value) => {
		setPaymentDetails((prevPaymentDetails) => {
			return {
				...prevPaymentDetails,
				[property]: value,
			};
		});
	};

	const handleItemsInputChange = useCallback((index, columnName, value) => {
		setInvoiceItems((prevTableDate) => {
			const updatedData = [...prevTableDate];
			updatedData[index] = {
				...updatedData[index],
				[columnName]: value,
			};

			const valBeforeDiscount =
				Number(updatedData[index].qty) * Number(updatedData[index].price);
			const discount = Number(updatedData[index].discPercent) / 100;
			const valAfterDiscount = valBeforeDiscount * (1 - discount);
			const discountValue = valBeforeDiscount - valAfterDiscount;
			updatedData[index].amtAfterDiscount = valAfterDiscount.toFixed(2);
			updatedData[index].amtBeforeDiscount = valBeforeDiscount;
			updatedData[index].discValue = discountValue;
			return updatedData;
		});
	}, []);

	const handleDueDateChange = useCallback((e) => {
		setSelectedDueDate(new Date(e.target.value));
	}, []);

	const handleSelectedClient = useCallback(
		async (selectedOptionValue) => {
			const clientId = selectedOptionValue.value;
			const selectedclient = clients.find((client) => client._id === clientId);
			setSelectedClientDetails(selectedclient);
			setIsSelectedClient(true);
		},
		[clients]
	);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// if (!isSelectedClient) {
		// 	showToast("Error", "Please select a client before submitting", "error");
		// 	return;
		// }

		// Update the invoiceAtom state with the current data

		const invoiceData = {
			invoiceNumber: currentInvoiceNumber,
			client: isSelectedClient ? selectedClientDetails : decodedTokenDetails, // Replace with actual logic
			items: invoiceItems,
			paymentDetails: paymentDetails,
			issueDate: todayDate,
			dueDate: selectedDueDate,
			subTotalBeforeDiscount: subTotal,
			totalDiscountValue: totalDiscount,
			vatPercent: vatRate,
			vatValue: vatAmt,
			grandTotal: grandTotal,
			remainingAmount: grandTotal,
			notes: invoiceNote,
			currency: selectedCurrency,
		};

		if (!invoiceData.client) {
			return;
		}

		try {
			setLoading(true);

			setInvoice((prevInvoiceState) => ({
				...prevInvoiceState,
				...invoiceData,
			}));
			const response = await axiosInstance.post(
				"/invoices/create",
				invoiceData
			);
			const data = response.data;
			const newInvoice = data.newInvoice;

			showToast("Success", "Invoice created successfully", "success");
			navigate(`/invoices/${newInvoice._id}`);
			console.log(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		//Calculate Total Value before Discount
		const totalBeforeDiscount = invoiceItems.reduce(
			(acc, row) => acc + Number(row.amtBeforeDiscount),
			0
		);
		setSubTotal(totalBeforeDiscount.toFixed(2));

		// Calculate Subtotal based on table data
		const totalAfterDiscount = invoiceItems.reduce(
			(acc, row) => acc + Number(row.amtAfterDiscount),
			0
		);
		setTotalAmtAfterDiscount(totalAfterDiscount.toFixed(2));

		// Calculate Grand Total after removing VAT
		const vatAmount = (totalAfterDiscount * Number(vatRate)) / 100;
		setVatAmt(vatAmount.toFixed(2));

		const calculatedDiscountValue = invoiceItems.reduce(
			(acc, row) => acc + Number(row.discValue),
			0
		);
		setTotalDiscount(calculatedDiscountValue.toFixed(2));

		const calculatedGrandTotal = totalAfterDiscount + vatAmount;
		setGrandTotal(calculatedGrandTotal.toFixed(2));

		// setInvoice({ ...invoice, items: invoiceItems });
	}, [invoiceItems, vatRate]);

	if (!currentInvoiceNumber) {
		return (
			<Flex
				justifyContent={"center"}
				flexDir={"column"}
				gap={2}
				alignItems={"center"}
				minH={"100vh"}
			>
				<Spinner size={"xl"} />
				<Text>Setting up the invoice page</Text>
			</Flex>
		);
	}

	return (
		<>
			<Box
				m={{ base: 3, md: 5, lg: 10 }}
				py={{ base: 5, md: 10 }}
				border={"1px solid black"}
				bg={"#fff"}
				borderRadius={10}
			>
				<Box textAlign={"right"} px={{ base: 4, lg: 10 }}>
					<Text fontSize={{ base: "2xl", lg: "36px" }} fontWeight={700}>
						INVOICE{" "}
					</Text>
					<Text fontWeight={400} fontSize={{ base: "lg", lg: "26px" }}>
						Invoice #: {currentInvoiceNumber}
					</Text>
				</Box>
				<Box borderBottom="1px" borderColor="gray" w={"full"}></Box>

				<form id="createInvoice" onSubmit={handleSubmit}>
					<Flex
						justifyContent={"space-between"}
						pt={"27"}
						pb={"2"}
						px={{ base: 4, lg: 10 }}
					>
						<Box>
							<Text
								as={"h2"}
								fontSize={{ base: "md", lg: "xl" }}
								fontWeight={600}
							>
								Bill To
							</Text>
							{encodedToken ? (
								<Box>
									<Text fontSize={{ base: "sm", lg: "lg" }}>
										{decodedTokenDetails?.name}
									</Text>
									<Text fontSize={{ base: "sm", lg: "lg" }}>
										{decodedTokenDetails?.email}
									</Text>
									{/* <Text>{selectedClientDetails?.address}</Text> */}
								</Box>
							) : !isSelectedClient ? (
								<Flex gap={2} flexDir={"column"}>
									<Box w={{ base: 150, md: 200, lg: 250 }}>
										<ReactSelect
											onChange={handleSelectedClient}
											options={clientsSelectOptions}
											placeholder="Select Client"
											required={encodedToken ? false : true}
										/>
									</Box>
									<Button
										bg={"#2970FF"}
										color={"#F6F6F6"}
										w={{ base: 120, md: 150 }}
										size={{ base: "sm", md: "lg" }}
										onClick={() => setAddClientModalOpen(true)}
									>
										Add New Client
									</Button>
								</Flex>
							) : (
								<Flex gap={4}>
									<Box>
										<Text fontSize={{ base: "sm", lg: "lg" }}>
											{selectedClientDetails?.name}
										</Text>
										<Text fontSize={{ base: "sm", lg: "lg" }}>
											{selectedClientDetails?.email}
										</Text>
										<Text fontSize={{ base: "sm", lg: "lg" }}>
											{selectedClientDetails?.address}
										</Text>
									</Box>
									<Icon
										as={MdOutlineCancel}
										fontSize={"2xl"}
										cursor={"pointer"}
										color={"red"}
										onClick={() => setIsSelectedClient(false)}
									/>
								</Flex>
							)}

							<Flex gap={3} flexDir={"column"} my={6}>
								<Text
									fontSize={{ base: "lg", lg: "xl" }}
									fontWeight={600}
									mt={5}
								>
									Payment Details:
								</Text>
								<FormControl isRequired>
									<FormLabel fontSize={{ base: "sm", lg: "md" }}>
										Bank Name
									</FormLabel>
									<Input
										placeholder="United Bank for Africa"
										value={paymentDetails.bankName}
										size={{ base: "sm", lg: "md" }}
										onChange={(e) =>
											handlePaymentDetailsInput("bankName", e.target.value)
										}
										required
									/>
								</FormControl>
								<FormControl isRequired>
									<FormLabel fontSize={{ base: "sm", lg: "md" }}>
										Account Name
									</FormLabel>
									<Input
										bg={"White"}
										size={{ base: "sm", lg: "md" }}
										placeholder="John Doe"
										value={paymentDetails.accountName}
										onChange={(e) =>
											handlePaymentDetailsInput("accountName", e.target.value)
										}
										required
									/>
								</FormControl>
								<FormControl isRequired>
									<FormLabel fontSize={{ base: "sm", lg: "md" }}>
										Account Number
									</FormLabel>
									<Input
										size={{ base: "sm", lg: "md" }}
										type="number"
										placeholder="0456789012"
										value={paymentDetails.accountNumber}
										onChange={(e) =>
											handlePaymentDetailsInput("accountNumber", e.target.value)
										}
										required
									/>
								</FormControl>
							</Flex>
						</Box>

						<AddClientModal />

						<Box>
							<Text
								as={"h2"}
								fontWeight={500}
								fontSize={{ base: "md", lg: "xl" }}
							>
								STATUS
							</Text>
							<Text
								as={"h2"}
								fontWeight={400}
								color={"red"}
								pb={{ base: 3, lg: 25 }}
								fontSize={{ base: "sm", lg: "lg" }}
							>
								Unpaid
							</Text>

							<Text fontWeight={500} fontSize={{ base: "md", lg: "xl" }}>
								DATE:
							</Text>
							<Text
								fontSize={{ base: "sm", lg: "lg" }}
								pb={{ base: 3, lg: 25 }}
							>
								{format(todayDate, "PP")}{" "}
							</Text>

							<Text fontSize={{ base: "md", lg: "xl" }} fontWeight={500}>
								DUE DATE:
							</Text>
							<Text fontSize={{ base: "sm", lg: "lg" }}>
								{format(selectedDueDate, "PP")}
							</Text>
						</Box>
					</Flex>
					{/* <Flex justifyContent={"space-between"} alignItems={"center"}></Flex> */}

					<Box mt={8} display={{ base: "none", lg: "block" }}>
						<Table variant="striped" colorScheme="gray.600">
							<Thead>
								<Tr bg={"#F4F4F4"}>
									<Th w={300}>Item</Th>

									<Th>Qty</Th>
									<Th minW={100}>Unit Price</Th>
									<Th>Discount (%)</Th>
									<Th>Amount</Th>
									<Th></Th>
								</Tr>
							</Thead>
							<Tbody>
								{invoiceItems.map((row, index) => (
									<ItemRow
										key={index}
										row={row}
										index={index}
										handleItemsInputChange={handleItemsInputChange}
										deleteRow={deleteRow}
									/>
								))}
							</Tbody>
						</Table>
					</Box>

					<Accordion  display={{ base: "block", lg: "none" }} defaultIndex={[0]} allowMultiple>
						{invoiceItems.map((row, index) => (
							<ItemPerAccordion
								key={index}
								row={row}
								index={index}
								handleItemsInputChange={handleItemsInputChange}
								deleteRow={deleteRow}
								selectedCurrency={selectedCurrency}
							/>
						))}
					</Accordion>

					<Button
						onClick={addRow}
						ml={10}
						mt={5}
						bg={"#2970FF"}
						borderRadius="50%"
						color={"#fff"}
					>
						+
					</Button>

					<Flex mt={100} justifyContent={"flex-end"}>
						<Table
							variant="striped"
							fontSize={"20px"}
							fontWeight={500}
							color={"gray"}
							w={{ base: "60%", lg: "45%" }}
						>
							<Thead pl={2} fontSize={{ base: "sm", lg: "lg" }}>
								<Tr bg="#F4F4F4">
									<Td>Invoice Summary </Td>
									<Td> </Td>
								</Tr>

								<Tr>
									<Td color={"gray"}>Sub Total: </Td>
									<Td color={"gray"}>{subTotal}</Td>
								</Tr>
								<Tr>
									<Td color={"gray"}>Discount ({selectedCurrency}): </Td>
									<Td color={"gray"}>{totalDiscount}</Td>
								</Tr>
								<Tr>
									<Td color={"gray"}>
										Total after Discount ({selectedCurrency}):{" "}
									</Td>
									<Td color={"gray"}>{totalAmtAfterDiscount}</Td>
								</Tr>

								<Tr>
									<Td color={"gray"}>VAT ({selectedCurrency}): </Td>
									<Td color={"gray"}>{vatAmt}</Td>
								</Tr>
								<Tr>
									<Td
										color={"black"}
										flexWrap={900}
										fontSize={{ base: "lg", lg: "2xl" }}
									>
										Total: ({selectedCurrency})
									</Td>
									<Td
										color={"black"}
										fontWeight={900}
										fontSize={{ base: "lg", lg: "2xl" }}
									>
										{grandTotal}
									</Td>
								</Tr>
							</Thead>
						</Table>
					</Flex>

					<Flex
						p={4}
						justifyContent={"space-between"}
						alignItems={"center"}
						gap={3}
						px={{ base: 4, lg: 10 }}
						mt={10}
					>
						<Flex flexDir={"column"} gap={2}>
							<Text color={"gray"} fontSize={{ base: "sm", lg: "lg" }}>
								Tax Rate(%){" "}
							</Text>
							<Input
								placeholder="0"
								// size={{base: 'sm', lg: 'md'}}
								type="number"
								value={vatRate}
								fontSize={{ base: "sm", lg: "md" }}
								w={{ base: 20, md: "100%" }}
								onChange={(e) => setVatRate(e.target.value)}
							/>
						</Flex>

						<Flex flexDir={"column"} gap={2}>
							<Text color={"gray"} fontSize={{ base: "sm", lg: "lg" }}>
								Due Date
							</Text>

							<Input
								placeholder="Select Date and Time"
								// size={{base: 'sm', lg: 'md'}}
								type="date"
								fontSize={{ base: "sm", md: "md" }}
								value={format(selectedDueDate, "yyyy-MM-dd")}
								onChange={handleDueDateChange}
								min={format(addDays(todayDate, 1), "yyyy-MM-dd")}
							/>
						</Flex>
						<Flex flexDir={"column"} gap={2}>
							<Text color={"gray"} fontSize={{ base: "sm", lg: "lg" }}>
								Currency
							</Text>

							<ReactSelect
								defaultValue={{ label: "US Dollar", value: "USD" }}
								options={currencyOptions}
								className="react-select"
								placeholder={"Select Currency"}
								onChange={(currencyInfo) =>
									setSelectedCurrency(currencyInfo.value)
								}
							/>
						</Flex>
					</Flex>
					<Flex
						pb={"30px"}
						flexDir={"column"}
						px={{ base: 4, lg: 10 }}
						pt={"17px"}
					>
						<Text>Note/Additional Information</Text>
						<Box>
							<Textarea
								placeholder="Kindly provide additional details or terms of service "
								value={invoiceNote}
								onChange={(e) => setInvoiceNote(e.target.value)}
							/>
						</Box>
					</Flex>

					<Box mt={8}>
						<Flex justifyContent="center" pb={5}>
							<Button
								form="createInvoice"
								color={"white"}
								type="submit"
								bg={"#2970FF"}
								loadingText={"Sending your invoice"}
								isLoading={loading}
								_hover={{ bg: "blue" }}
							>
								Create and send
							</Button>
						</Flex>
					</Box>
				</form>
			</Box>
		</>
	);
}

export default Invoice;
