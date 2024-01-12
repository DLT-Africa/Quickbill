import {
	Card,
	CardBody,
	CardHeader,
	Flex,
	Heading,
	Text,
} from "@chakra-ui/react";
import React from "react";

const ItemPerInvSummary = ({ row, index, invoiceDetails }) => {
	console.log(invoiceDetails);
	return (
		<>
			<Card  variant={"elevated"} mt={5}>
				<CardHeader>
					<Heading size="md" textAlign={'center'} color={'gray'} fontSize={{ base: "md", md: "lg" }}>
						{row.itemName}
					</Heading>
				</CardHeader>
				<CardBody color={'gray'}>
					<Flex mb={2} justifyContent={'space-between'}>
						<Text fontSize={{ base: "sm", md: "md" }}> <strong>Qty:</strong> {row.qty}</Text>
						<Text fontSize={{ base: "sm", md: "md" }}>
							<strong>Unit Price:</strong> {invoiceDetails?.currency} {row.price?.toFixed(2)}
						</Text>
					</Flex>
					<Flex justifyContent={'space-between'}>
						<Text fontSize={{ base: "sm", md: "md" }}>
							<strong>Discount: </strong> {`${row?.discPercent}%` || "--"}
						</Text>
						<Text fontSize={{ base: "sm", md: "md" }}>
							<strong>Amount:</strong> {invoiceDetails?.currency}{" "}
							{row?.amtAfterDiscount?.toFixed(2)}
						</Text>
					</Flex>
				</CardBody>
			</Card>
		</>
	);
};

export default ItemPerInvSummary;
