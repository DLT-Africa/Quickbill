import { DeleteIcon } from "@chakra-ui/icons";
import {
	AccordionItem,
	AccordionPanel,
	AccordionIcon,
	AccordionButton,
	Card,
	CardHeader,
	Heading,
	CardBody,
	Text,
	Box,
	Input,
	FormLabel,
	Flex,
} from "@chakra-ui/react";
import React from "react";

const ItemPerAccordion = ({
	row,
	index,
	handleItemsInputChange,
	deleteRow,
    selectedCurrency,
    invoiceItems
}) => {
	return (
		<AccordionItem>
			<h2>
				<AccordionButton bg={'#f8f8f8'}>
					<Box as="span" flex="1" textAlign="left">
						Item {index + 1}
					</Box>
					<AccordionIcon />
				</AccordionButton>
			</h2>
			<AccordionPanel pb={4}>
				<Card variant={"elevated"} border={"solid 1px"}>
					<CardBody>
						<Flex mb={4} alignItems={"center"} gap={6} justifyContent={"space-between"}>
							<Box w={"100%"}>
								<FormLabel fontSize={"sm"}>Item Description</FormLabel>

								<Input
									// p={2}
									fontSize={{ base: "sm", xl: "md" }}
									minW={"150px"}
									// size={"sm"}
									placeholder="Item name or description"
									type="text"
									required
									value={row.itemName}
									onChange={(e) =>
										handleItemsInputChange(index, "itemName", e.target.value)
									}
								/>
							</Box>

							{invoiceItems.length > 1 && <DeleteIcon 
								fontSize={"2xl"}
								color={"red"}
								cursor={"pointer"}
								onClick={() => deleteRow(index)}
                                
							/>}
						</Flex>

						<Flex mb={4} justifyContent={"space-between"} gap={4}>
							<Box w={"50%"}>
								<FormLabel fontSize={"sm"}>Quantity</FormLabel>
								<Input
									// borderRadius={5}
									fontSize={{ base: "sm", xl: "md" }}
									// p={2}
									// size={"sm"}
									// minW={"40px"}
									// textAlign={'center'}
									placeholder="0"
									required
									type="number"
									value={row.qty}
									onChange={(e) =>
										handleItemsInputChange(index, "qty", e.target.value)
									}
								/>
							</Box>
							<Box w={"50%"}>
								<FormLabel fontSize={"sm"}>Unit Price</FormLabel>
								<Input
									// p={2}
									fontSize={{ base: "sm", xl: "md" }}
									// size={"sm"}
									// minW={"120px"}
									placeholder="0"
									required
									type="number"
									value={row.price}
									onChange={(e) =>
										handleItemsInputChange(index, "price", e.target.value)
									}
								/>
							</Box>
						</Flex>

						<Flex  gap={4}>
							<Box w={'50%'}>
								<FormLabel fontSize={"sm"}>Discount (%)</FormLabel>
								<Input
									// maxW={{ base: "70px", xl: "90%" }}
									// size={"sm"}
									placeholder="0"
									type="number"
									fontSize={{ base: "sm", xl: "md" }}
									value={row.discPercent}
									onChange={(e) =>
										handleItemsInputChange(index, "discPercent", e.target.value)
									}
								/>
							</Box>
							<Flex w={'50%'}  flexDir={'column'}  alignItems={'center'}>
								<FormLabel fontSize={"lg"}>Amount</FormLabel>
								<Text fontSize={"lg"}>{selectedCurrency} {row.amtAfterDiscount}</Text>
							</Flex>
						</Flex>
					</CardBody>
				</Card>
			</AccordionPanel>
		</AccordionItem>
	);
};

export default ItemPerAccordion;
