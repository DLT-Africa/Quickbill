import React, { useEffect, useState } from "react";
import { addDays, format } from "date-fns";

import {
	ChakraProvider,
	Box,
	Flex,
	Heading,
	Text,
	Table,
	Tbody,
	Thead,
	Tr,
	Td,
	Button,
	MenuButton,
	MenuItem,
	MenuList,
	Menu,
	Divider,
	Input,
	Select,
	Textarea,
	Th,
} from "@chakra-ui/react";
import { ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";
import { useRecoilState } from "recoil";
import invoiceAtom from "../atoms/invoiceAtom";
import userAtom from "../atoms/userAtom";
import { axiosInstance } from "../../api/axios";
import { useNavigate } from "react-router-dom";

const todayDate = new Date();
const rawDueDate = addDays(todayDate, 7);

function Invoice() {
	const [invoice, setInvoice] = useRecoilState(invoiceAtom);
	const [user, setUser] = useRecoilState(userAtom);
	const [currentInvoiceNumber, setcurrentInvoiceNumber] = useState("");
	const [dueDate, setDueDate] = useState(format(rawDueDate, "PP"));
	const [tableData, setTableData] = useState([
		{
			itemName: <Input placeholder="Item name or description" />,
			qty: <Input placeholder="0" type="number" />,
			price: <Input placeholder="0" type="number" />,
			discount: <Input placeholder="0" type="number" />,
			amount: <Input placeholder="0" type="number" />,
		},
	]);
	const navigate = useNavigate();

	const addRow = () => {
		const newRow = {
    	itemName: <Input placeholder="Item name or description" />,
			qty: <Input placeholder="0" type="number" />,
			price: <Input placeholder="0" type="number" />,
			discount: <Input placeholder="0" type="number" />,
			amount: <Input placeholder="0" type="number" />,
		};
		setTableData(prevData=> [...prevData, newRow]);
	};

  const deleteRow = (index) => {
    const updatedData = [...tableData];
    updatedData.splice(index, 1);
    setTableData(updatedData);
  };
 
  useEffect(() => {
    console.log(tableData)

  }, [tableData])
  

	useEffect(() => {
		const getInvoiceNo = async () => {
			try {
				const response = await axiosInstance.get("/invoices");
				const data = response.data;
				// console.log(data);
				const totalInvoices = data.length;
				const newInvNo = totalInvoices + 1;
				const formattedInvoiceNumber = newInvNo.toString().padStart(3, "0");
				setcurrentInvoiceNumber(formattedInvoiceNumber);
				setInvoice({ ...invoice, invoiceNumber: formattedInvoiceNumber });
			} catch (error) {
				console.log(error.response);
				const errorData = error.response.data;
				if (errorData.error.startsWith("Internal")) {
					console.log("Internal Server Error");
				} else if (errorData.error.startsWith("jwt" || "Unauthorized")) {
					navigate("/auth");
				}
			}
		};

		getInvoiceNo();
	}, []);

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
						INVOICE{" "}
					</Text>
					<Text fontWeight={400} fontSize={"26px"}>
						Invoice #: {currentInvoiceNumber}
					</Text>
				</Box>
				<Box borderBottom="1px" borderColor="gray" w={"full"}></Box>

				<Flex justifyContent={"space-between"} pt={"27"} pb={"2"} px={10}>
					<Box>
						<Text as={"h2"} fontWeight={600}>
							Bill To
						</Text>
						<Menu>
							<MenuButton
								px={4}
								py={2}
								transition="all 0.2s"
								borderRadius="md"
								borderWidth="1px"
								_hover={{ bg: "gray.400" }}
								_expanded={{ bg: "#fff" }}
								_focus={{ boxShadow: "outline" }}
							>
								Select customer <ChevronDownIcon />
							</MenuButton>
							<MenuList>
								<MenuItem>*New customer</MenuItem>
							</MenuList>
						</Menu>
					</Box>

					<Box>
						<Text as={"h2"} fontWeight={500} fontSize={"18"}>
							STATUS
						</Text>
						<Text
							as={"h2"}
							fontWeight={400}
							color={"red"}
							pb={"5"}
							fontSize={"20"}
						>
							Unpaid
						</Text>

						<Text fontWeight={500} fontSize={"18"}>
							DATE:
						</Text>
						<Text pb={"25"}>{format(todayDate, "PP")} </Text>

						<Text fontWeight={500}>DUE DATE:</Text>
						<Text pb={"35"}>{dueDate}</Text>
						<Text fontSize={"18"} fontWeight={500}>
							AMOUNT <br /> NGN 0
						</Text>
					</Box>
				</Flex>
				<Flex justifyContent={"space-between"} alignItems={"center"}></Flex>

				<Box mt={8}>
					<Table variant="striped" colorScheme="gray.600">
						<Thead>
							<Tr bg={"#F4F4F4"}>
								<Th w={300}>Item</Th>

								<Th>Qty</Th>
								<Th>Price</Th>
								<Th>Disc(%)</Th>
								<Th>Amount</Th>
								<Th>Action</Th>
							</Tr>
						</Thead>
						<Tbody>
							{tableData.map((row, index) => (
								<Tr key={index}>
									<Td>{row.itemName}</Td>
									<Td>{row.qty}</Td>
                  <Td>{row.price}</Td>
                  <Td>{row.discount}</Td>
                  <Td>{row.amount}</Td>
									<Td>
										<DeleteIcon cursor={'pointer'} onClick={() => deleteRow(index)} />
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</Box>

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

				<Box mt={100} pl={700}>
					<Table
						variant="striped"
						fontSize={"20px"}
						fontWeight={500}
						color={"gray"}
					>
						<Thead pl={2}>
							<Tr bg="#F4F4F4">
								<Td>Invoice Summary </Td>
								<Td> </Td>
							</Tr>

							<Tr>
								<Td color={"gray"}>Sub Total: </Td>
								<Td color={"gray"}>0</Td>
							</Tr>
							<Tr>
								<Td color={"gray"}>Discount: </Td>
								<Td color={"gray"}>0</Td>
							</Tr>

							<Tr>
								<Td color={"gray"}>VAT(%): </Td>
								<Td color={"gray"}>0</Td>
							</Tr>
							<Tr>
								<Td color={"gray"}>Total: </Td>
								<Td color={"gray"}>0</Td>
							</Tr>
						</Thead>
					</Table>
				</Box>

				<Flex
					p={4}
					justifyContent={"space-between"}
					alignItems={"center"}
					px={10}
				>
					<Flex flexDir={"column"} gap={2}>
						<Text color={"gray"}>Tax Rate (%)</Text>
						<Input placeholder="0" size="md" type="number" />
					</Flex>

					<Flex flexDir={"column"} gap={2}>
						<Text color={"gray"}>Due Date</Text>

						<Input placeholder="Select Date and Time" size="md" type="date" />
					</Flex>
					<Flex flexDir={"column"} gap={2}>
						<Text color={"gray"}>Currency</Text>
						<Select placeholder="Select Currency" size="md" />
					</Flex>

					{/* <Flex flexDir={"column"} py={5}>
            <Select placeholder="Select Currency" size="sm" />

            <Divider borderColor={"#1c1c1c"} w={"200px"} />
          </Flex> */}
				</Flex>
				<Flex pb={"30px"} flexDir={"column"} px={10} pt={"17px"}>
					<Text>Note/Additional Information</Text>
					<Box>
						<Textarea placeholder="Kindly provide additional details or terms of service " />
					</Box>
				</Flex>

				<Box mt={8}>
					<Flex justifyContent="center" pb={5}>
						<Button bg={"#2970FF"}>Create and send</Button>
					</Flex>
				</Box>
			</Box>
		</>
	);
}

export default Invoice;
