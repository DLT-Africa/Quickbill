import React, { useEffect, useState } from "react";
import { useAxiosInstance } from "../../../api/axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	IconButton,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Table,
	Tbody,
	Td,
	Text,
	Textarea,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom";
import InvSummaryItemRow from "./InvSummaryItemRow";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaStarHalfAlt } from "react-icons/fa";
import { ImStarFull } from "react-icons/im";
import { FaDownload } from "react-icons/fa6";
import { FcCancel } from "react-icons/fc";
import useShowToast from "../../hooks/useShowToast";
import useLogout from "../../hooks/useLogout";
import { prevPathAtom } from "../../atoms/prevPathAtom";
import jsPDF from "jspdf";
import ItemPerInvSummary from "./ItemPerInvSummary";
import domtoimage from "dom-to-image";

const InvoiceSummary = () => {
	const { invoiceId } = useParams();
	const [invoiceDetails, setInvoiceDetails] = useState("");
	const [invoiceItems, setInvoiceItems] = useState([]);
	const [client, setClient] = useState({});
	const [paymentRecords, setPaymentRecords] = useState([]);
	const [invoiceDueDate, setInvoiceDueDate] = useState("");
	const [invoiceDate, setInvoiceDate] = useState("");
	const [formattedSubTotal, setFormattedSubTotal] = useState("");
	const [formattedDiscount, setFormattedDiscount] = useState("");
	const [formattedVat, setFormattedVat] = useState("");
	const [formattedGrandTotal, setFormattedGrandTotal] = useState("");
	const [formattedAfterDiscount, setFormattedAfterDiscount] = useState("");
	const [formattedRemAmount, setFormattedRemAmount] = useState("");
	const [formattedPaidAmount, setFormattedPaidAmount] = useState("");
	const [statusColor, setStatusColor] = useState("#E0BF00");
	const userDetails = useRecoilValue(userAtom);
	const [formData, setFormData] = useState({
		amountPaid: "",
		note: "",
	});
	const [payPartialModalOpen, setPayPartialModalOpen] = useState(false);
	const [fullyPaidModalOpen, setFullyPaidModalOpen] = useState(false);
	const [rejectModalOpen, setRejectModalOpen] = useState(false);
	const [rejectReason, setRejectReason] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);
	const logout = useLogout();
	const axiosInstance = useAxiosInstance();
	const [isFetching, setIsFetching] = useState(true)

	const showToast = useShowToast();


	useEffect(() => {
		console.log(paymentRecords);
	}, [paymentRecords]);

	useEffect(() => {
		const getInvoiceDetails = async () => {
			try {
				const response = await axiosInstance.get(`/invoices/${invoiceId}`);
				const data = response.data;
				console.log(data);
				setInvoiceDetails(data);
				setPaymentRecords(data.paymentRecords);
			} catch (error) {
				const errorData = error.response?.data;
				if (errorData?.error?.startsWith("Internal")) {
					console.log("Internal Server Error");
				} else if (errorData?.error?.startsWith("jwt" || "Unauthorized")) {
					setPrevPath(window.location.pathname);
					logout();
				}
			}
		};

		getInvoiceDetails();
	}, []);

	useEffect(() => {
		if (invoiceDetails) {
			console.log(invoiceDetails);
			const items = invoiceDetails?.items;
			setInvoiceItems(items);
			const client = invoiceDetails?.client;
			setClient(client);

			switch (invoiceDetails.invoiceStatus) {
				case "Partially Paid":
					setStatusColor("#7d85f5");
					break;
				case "Paid":
					setStatusColor("green");
					break;
				case "Rejected":
					setStatusColor("red");
					break;
				case "Overdue":
					setStatusColor("#E40DC4");
					break;
			}

			// Format number with two decimal places and currency symbol
			const formatSubTotal = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: invoiceDetails.currency, // Change currency code as needed
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			}).format(invoiceDetails.subTotalBeforeDiscount);
			const formatDiscount = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: invoiceDetails.currency, // Change currency code as needed
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			}).format(invoiceDetails.totalDiscountValue);
			const formatAfterDiscVal = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: invoiceDetails.currency, // Change currency code as needed
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			}).format(
				invoiceDetails.subTotalBeforeDiscount -
					invoiceDetails.totalDiscountValue
			);
			const formatVat = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: invoiceDetails.currency, // Change currency code as needed
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			}).format(invoiceDetails.vatValue);
			const formatGrandTotal = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: invoiceDetails?.currency, // Change currency code as needed
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			}).format(invoiceDetails.grandTotal);
			const formatRemAmount = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: invoiceDetails.currency, // Change currency code as needed
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			}).format(invoiceDetails.remainingAmount);
			const formatPaidAmount = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: invoiceDetails.currency, // Change currency code as needed
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			}).format(invoiceDetails.totalAmountReceived);

			setFormattedSubTotal(formatSubTotal);
			setFormattedDiscount(formatDiscount);
			setFormattedAfterDiscount(formatAfterDiscVal);
			setFormattedVat(formatVat);
			setFormattedGrandTotal(formatGrandTotal);
			setFormattedRemAmount(formatRemAmount);
			setFormattedPaidAmount(formatPaidAmount);

			const dueDate = invoiceDetails.dueDate;
			console.log(dueDate);
			const date = invoiceDetails.issueDate;
			setInvoiceDueDate(format(dueDate, "PP"));
			setInvoiceDate(format(date, "PP"));
			
			setIsFetching(false)
		}

	}, [invoiceDetails]);

	const handlePartialPayment = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		if (Number(formData.amountPaid) > Number(invoiceDetails.remainingAmount)) {
			setIsLoading(false);
			showToast(
				"Error",
				"Amount paid cannot be greater than due amount",
				"error"
			);
			return;
		}

		try {
			const response = await axiosInstance.put(
				`/invoices/pay/${invoiceId}`,
				formData
			);
			const data = response.data;
			console.log(data);
			setPayPartialModalOpen(false);

			setInvoiceDetails((previousInvoiceDetails) => {
				const updatedInvoiceDetails = { ...previousInvoiceDetails };
				// const paymentRecord = {
				// 	...formData,
				// 	paymentDate: new Date(),
				// };

				updatedInvoiceDetails.remainingAmount = Math.max(
					updatedInvoiceDetails.remainingAmount - Number(formData.amountPaid),

					0
				);

				updatedInvoiceDetails.totalAmountReceived += Number(
					formData.amountPaid
				);

				updatedInvoiceDetails.invoiceStatus =
					updatedInvoiceDetails.remainingAmount === 0
						? "Paid"
						: "Partially Paid";

				return updatedInvoiceDetails;
			});

			setPaymentRecords((prevRecord) => [
				...prevRecord,
				{ ...formData, paymentDate: new Date() },
			]);

			setFormData({
				amountPaid: "",
				note: "",
			});
			setIsLoading(false);
			showToast("Success", "Payment Updated Successfully", "success");
			// window.location.reload();
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	const handleFullPayment = async () => {
		setIsLoading(true);

		const paymentRecord = {
			amountPaid: invoiceDetails?.remainingAmount,
			note: "",
			paymentDate: new Date(),
		};

		try {
			const response = await axiosInstance.put(`/invoices/pay/${invoiceId}`, {
				amountPaid: invoiceDetails?.remainingAmount,
				note: "",
			});
			const data = response.data;
			console.log(data);

			setInvoiceDetails((previousInvoiceDetails) => {
				const updatedInvoiceDetails = { ...previousInvoiceDetails };

				updatedInvoiceDetails.remainingAmount = 0;

				updatedInvoiceDetails.totalAmountReceived = invoiceDetails.grandTotal;

				updatedInvoiceDetails.invoiceStatus = "Paid";

				return updatedInvoiceDetails;
			});

			setPaymentRecords((prevRecord) => [...prevRecord, { ...paymentRecord }]);

			setFullyPaidModalOpen(false);
			setIsLoading(false);
			showToast("Success", "Payment Updated Successfully", "success");
			// window.location.reload();
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	const handleRejectInvoice = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await axiosInstance.post(
				`/invoices/reject/${invoiceId}`,
				{ rejectReason }
			);
			const data = response.data;
			console.log(data);
			setInvoiceDetails((prevInvoice) => {
				const updatedInvoice = { ...prevInvoice };
				updatedInvoice.invoiceStatus = "Rejected";
				updatedInvoice.rejectReason = rejectReason;
				return updatedInvoice;
			});
			setRejectModalOpen(false);
			setIsLoading(false);
			showToast("Success", "Invoice Rejected Successfully", "success");
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	// Function to capture and convert page sections
	const captureAndConvertPage = async (pageElement) => {
		return await domtoimage.toPng(pageElement);
	};

	// Function to process image data and add to PDF
	const processImageData = async (doc, image, currentY) => {
		doc.addImage(image, "PNG", 10, currentY);
		return doc;
	};

	const downloadPDF = async () => {
		const invoiceContainer = document.getElementById("invoice-container");
		const scaleFactor = 1.5; // Adjust this value as needed
		const imageQuality = 0.8; // Adjust this value (0.0 to 1.0) for image quality

		// PDF document
		const pdf = new jsPDF({
			unit: "mm",
			format: "a4",
			orientation: "portrait",
			compress: true, // Enable text compression
		});

		// Capture the entire content as an image
		setTimeout(async () => {
			try {
				const img = await domtoimage.toPng(invoiceContainer, {
					width: invoiceContainer.clientWidth * scaleFactor,
					quality: imageQuality,
					dpi: 72,
				});
				pdf.addImage(
					img,
					"PNG",
					0,
					0,
					pdf.internal.pageSize.width,
					pdf.internal.pageSize.height
				);
			} catch (error) {
				console.error(error);
			}

			// Save PDF
			pdf.save("invoice.pdf");
		}, 200);
	};

	if (isFetching) {
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
		<div id="invoice-container">
			<Box>
				<Text
					textAlign={"center"}
					fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
					fontWeight={800}
				>
					INVOICE INFORMATION
				</Text>

				<Flex justifyContent={"flex-end"} pr={{base: 3, md: 5, lg:10}}>
					<Menu>
						<MenuButton
							as={IconButton}
							aria-label="Options"
							icon={<HamburgerIcon />}
							variant="outline"
							colorScheme="blue"
						/>
						<MenuList>
							{(invoiceDetails?.invoiceStatus === "Awaiting Payment" ||
								invoiceDetails?.invoiceStatus === "Partially Paid") && (
								<MenuItem
									icon={<FaStarHalfAlt />}
									onClick={() => setPayPartialModalOpen(true)}
								>
									Mark as Partially Paid
								</MenuItem>
							)}

							{(invoiceDetails?.invoiceStatus === "Awaiting Payment" ||
								invoiceDetails?.invoiceStatus === "Partially Paid") && (
								<MenuItem
									icon={<ImStarFull />}
									onClick={() => setFullyPaidModalOpen(true)}
								>
									Mark as Fully Paid
								</MenuItem>
							)}

							{invoiceDetails?.invoiceStatus === "Awaiting Payment" &&
								invoiceDetails?.client?.email === userDetails?.email && (
									<MenuItem
										icon={<FcCancel />}
										onClick={() => setRejectModalOpen(true)}
										color={"red"}
									>
										Reject Invoice
									</MenuItem>
								)}

							<MenuItem icon={<FaDownload />} onClick={downloadPDF}>
								Download Invoice
							</MenuItem>
						</MenuList>
					</Menu>

					<Modal
						isOpen={payPartialModalOpen}
						onClose={() => setPayPartialModalOpen(false)}
					>
						<form onSubmit={handlePartialPayment}>
							<ModalOverlay />
							<ModalContent>
								<ModalHeader> Partial Payment</ModalHeader>
								<ModalCloseButton />
								<ModalBody>
									<Text textAlign={"center"} mb={4}>
										Amount Due: {formattedRemAmount}
									</Text>
									<FormControl isRequired>
										<FormLabel>Amount Paid</FormLabel>
										<Input
											type="number"
											name="amountPaid"
											value={formData.amountPaid}
											onChange={handleChange}
											required
										/>
									</FormControl>
									<FormControl mt={4} isRequired>
										<FormLabel>Note</FormLabel>
										<Textarea
											name="note"
											value={formData.note}
											onChange={handleChange}
											required
										/>
									</FormControl>
								</ModalBody>
								<ModalFooter>
									<Button
										type="submit"
										colorScheme="blue"
										mr={3}
										isLoading={isLoading}
									>
										Update Payment
									</Button>
									<Button
										onClick={() => {
											setPayPartialModalOpen(false);
											setFormData({
												amountPaid: "",
												note: "",
											});
										}}
									>
										Cancel
									</Button>
								</ModalFooter>
							</ModalContent>
						</form>
					</Modal>

					<Modal
						isOpen={fullyPaidModalOpen}
						onClose={() => setFullyPaidModalOpen(false)}
					>
						<ModalOverlay />
						<ModalContent>
							<ModalBody>
								<p>Are you sure you want to mark this invoice as paid?</p>
							</ModalBody>
							<ModalFooter>
								<Button
									colorScheme="blue"
									mr={3}
									onClick={handleFullPayment}
									isLoading={isLoading}
								>
									Yes, Mark as Paid
								</Button>
								<Button
									onClick={() => {
										setFullyPaidModalOpen(false);
									}}
								>
									Cancel
								</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>

					<Modal
						isOpen={rejectModalOpen}
						onClose={() => setRejectModalOpen(false)}
					>
						<ModalOverlay />
						<form onSubmit={handleRejectInvoice}>
							<ModalContent>
								<ModalBody>
									<Text fontSize={"xl"} textAlign={"center"}>
										Are you sure you want to Reject this invoice?
									</Text>
									<FormControl mt={4} isRequired>
										<FormLabel>Reason for Rejection</FormLabel>
										<Textarea
											name="reject"
											value={rejectReason}
											required
											onChange={(event) => setRejectReason(event.target.value)}
										/>
									</FormControl>
								</ModalBody>
								<ModalFooter>
									<Button
										colorScheme="red"
										mr={3}
										type="submit"
										isLoading={isLoading}
									>
										Yes, Reject Invoice
									</Button>
									<Button
										onClick={() => {
											setRejectModalOpen(false);
										}}
									>
										Cancel
									</Button>
								</ModalFooter>
							</ModalContent>
						</form>
					</Modal>
				</Flex>
				<Accordion
					mx={"auto"}
					mt={8}
					w={"98%"}
					defaultIndex={[0]}
					allowMultiple
				>
					<AccordionItem>
						<h2>
							<AccordionButton gap={4}>
								<Box
									as="span"
									fontSize={{ base: "lg", lg: "2xl" }}
									textAlign="left"
								>
									Payment History
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4}>
							<Table
								variant="simple"
								colorScheme="gray"
								size={{ base: "sm", lg: "md" }}
								mt={5}
							>
								<Thead>
									<Tr
										p={2}
										borderBottom={"0.5px solid rgba(0, 0, 0, 0.60)"}
										borderTop={"0.5px solid rgba(0, 0, 0, 0.60)"}
										bg={"rgba(55, 73, 87, 0.1)"}
									>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Payment Date
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Amount Paid ({invoiceDetails.currency})
										</Th>
										<Th color={"#1c1c1c"} fontSize={"l"}>
											Note
										</Th>
									</Tr>
								</Thead>
								<Tbody>
									{[...paymentRecords]?.reverse().map((record, index) => (
										<Tr key={index} _hover={{ bg: "#EFEFEF" }}>
											<Td>{format(record?.paymentDate, "dd/MM/yyyy p")}</Td>

											<Td>{record?.amountPaid}</Td>
											<Td>{record?.note || "--"}</Td>
										</Tr>
									))}
								</Tbody>
							</Table>
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			</Box>
			<Box
				my={10}
				// mx={8}
				mx={{ base: 2, md: 5, lg: 10 }}

				py={10}
				border={"1px solid black"}
				bg={"#fff"}
				borderRadius={10}
			>
				<Box textAlign={"right"} px={{ base: 4, lg: 10 }}>
					<Text fontSize={{ base: "lg", lg: "26px" }} fontWeight={600}>
						Invoice #:{" "}
						{invoiceDetails?.invoiceNumber?.toString().padStart(3, "0")}
					</Text>
				</Box>
				<Box borderBottom="1px" borderColor="gray" w={"full"}></Box>

				<Flex
					justifyContent={"space-between"}
					pt={"27"}
					pb={"2"}
					w={'full'}
					px={{ base: 2, lg: 10 }}
				>
					<Flex flexDir={"column"} maxW={{base:'70%', lg: 'full'}}  gap={5}>
						<Box >
							<Text
								as={"h2"}
								fontSize={{ base: "md", lg: "xl" }}
								fontWeight={600}
							>
								FROM
							</Text>

							<Box  >
								<Text fontSize={{ base: "sm", lg: "lg" }}>
									{invoiceDetails?.creatorId?.name}
								</Text>
								<Text fontSize={{ base: "sm", lg: "lg" }}>
									{invoiceDetails?.creatorId?.email}
								</Text>
							</Box>
						</Box>
						<Box>
							<Text
								as={"h2"}
								fontSize={{ base: "md", lg: "xl" }}
								fontWeight={600}
							>
								BILLED TO
							</Text>

							<Box   >
								<Text fontSize={{ base: "sm", lg: "lg" }}>{client?.name}</Text>
								<Text fontSize={{ base: "sm", lg: "lg" }}>{client?.email}</Text>
								<Text fontSize={{ base: "sm", lg: "lg" }}>
									{client?.address}
								</Text>
							</Box>
						</Box>

						<Box>
							<Text fontSize={{ base: "md",md:'full', lg: "lg" }} fontWeight={600} mt={2}>
								Payment Details:
							</Text>
							<Text fontSize={{ base: "sm", lg: "md" }}>
								<strong>Bank Name:</strong>{" "}
								{invoiceDetails?.paymentDetails?.bankName}
							</Text>
							<Text fontSize={{ base: "sm", lg: "md" }}>
								<strong>Account Name:</strong>{" "}
								{invoiceDetails?.paymentDetails?.accountName}
							</Text>
							<Text fontSize={{ base: "sm", lg: "md" }}>
								<strong>Account Number:</strong>{" "}
								{invoiceDetails?.paymentDetails?.accountNumber}
							</Text>
						</Box>
					</Flex>

					<Box >
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
							pb={{ base: 3, lg: 25 }}
							fontSize={{ base: "sm", lg: "lg" }}
							color={statusColor}
						>
							{invoiceDetails.invoiceStatus}
						</Text>

						<Text fontWeight={500} fontSize={{ base: "md", lg: "xl" }}>
							DATE:
						</Text>
						<Text fontSize={{ base: "sm", lg: "lg" }} pb={{ base: 3, lg: 25 }}>
							{invoiceDate}{" "}
						</Text>

						<Text fontWeight={500} fontSize={{ base: "md", lg: "xl" }}>
							DUE DATE:
						</Text>
						<Text fontSize={{ base: "sm", lg: "lg" }}>{invoiceDueDate}</Text>
					</Box>
				</Flex>
				{/* <Flex justifyContent={"space-between"} alignItems={"center"}></Flex> */}

				<Box mt={8} display={{ base: "none", lg: "block" }}>
					<Table
						fontSize={{ sm: "md" }}
						variant="striped"
						colorScheme="gray.600"
					>
						<Thead>
							<Tr bg={"#F4F4F4"}>
								<Th>Item</Th>

								<Th>Qty</Th>
								<Th>Unit Price ({invoiceDetails.currency})</Th>
								<Th>Discount (%)</Th>
								<Th>Amount ({invoiceDetails.currency})</Th>
							</Tr>
						</Thead>
						<Tbody>
							{invoiceItems.map((row, index) => (
								<InvSummaryItemRow
									key={index}
									row={row}
									index={index}
									// handleItemsInputChange={handleItemsInputChange}
									// deleteRow={deleteRow}
								/>
							))}
						</Tbody>
					</Table>
				</Box>

				<Box mx={4} display={{ base: "block", lg: "none" }}>
					{invoiceItems.map((row, index) => (
						<ItemPerInvSummary
							key={index}
							row={row}
							index={index}
							invoiceDetails={invoiceDetails}

							// handleItemsInputChange={handleItemsInputChange}
							// deleteRow={deleteRow}
						/>
					))}
				</Box>

				{/* <Button ml={10} mt={5} bg={"#2970FF"} borderRadius="50%" color={"#fff"}>
					+
				</Button> */}

				<Flex mt={100} justifyContent={"flex-end"}>
					<Table
						variant="striped"
						fontSize={"20px"}
						fontWeight={500}
						color={"gray"}
						w={{ base: "70%", lg: "45%" }}
						mr={2}
					>
						<Thead fontSize={{ base: "sm", lg: "lg" }}>
							<Tr bg="#F4F4F4">
								<Td>Invoice Summary </Td>
								<Td> </Td>
							</Tr>

							<Tr>
								<Td color={"gray"}>Sub Total: </Td>
								<Td color={"gray"} textAlign={"right"}>
									{formattedSubTotal}
								</Td>
							</Tr>
							<Tr>
								<Td color={"gray"}>Discount: </Td>
								<Td color={"gray"} textAlign={"right"}>
									{formattedDiscount}
								</Td>
							</Tr>
							<Tr>
								<Td color={"gray"}>Total after Discount:</Td>
								<Td color={"gray"} textAlign={"right"}>
									{formattedAfterDiscount}
								</Td>
							</Tr>

							<Tr>
								<Td color={"gray"}>VAT: </Td>
								<Td color={"gray"} textAlign={"right"}>
									{formattedVat} ({Number(invoiceDetails.vatPercent)}%)
								</Td>
							</Tr>
							<Tr>
								<Td color={"black"} fontSize={{ base: "lg", lg: "2xl" }}>
									Total:{" "}
								</Td>
								<Td
									color={"black"}
									textAlign={"right"}
									fontSize={{ base: "lg", lg: "2xl" }}
								>
									{formattedGrandTotal}
								</Td>
							</Tr>
							<Tr>
								<Td color={"gray"}>Amount Paid: </Td>
								<Td color={"gray"} textAlign={"right"}>
									{formattedPaidAmount}
								</Td>
							</Tr>
							<Tr>
								<Td
									color={"black"}
									fontWeight={900}
									fontSize={{ base: "md", lg: "2xl" }}
								>
									Amount Due:{" "}
								</Td>
								<Td
									color={"black"}
									fontWeight={900}
									textAlign={"right"}
									fontSize={{ base: "lg", lg: "2xl" }}
								>
									{formattedRemAmount}
								</Td>
							</Tr>
						</Thead>
					</Table>
				</Flex>

				{invoiceDetails?.notes && (
					<Flex
						pb={"30px"}
						flexDir={"column"}
						px={{ base: 4, lg: 10 }}
						pt={"17px"}
					>
						<Text fontWeight={600} fontSize={{ base: "md", lg: "lg" }}>
							Note/Additional Information:
						</Text>
						<Box mt={4} ml={4}>
							<Text fontSize={{ base: "sm", lg: "md" }}>
								{invoiceDetails?.notes}
							</Text>
						</Box>
					</Flex>
				)}

				{/* <Box mt={8}>
					<Flex justifyContent="center" pb={5}>
						<Button type="submit" bg={"#2970FF"}>
							Create and send
						</Button>
					</Flex>
				</Box> */}
			</Box>
		</div>
	);
};

export default InvoiceSummary;
