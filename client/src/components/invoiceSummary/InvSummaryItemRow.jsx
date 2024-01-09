import { Td, Text, Tr } from "@chakra-ui/react";
import React from "react";

const InvSummaryItemRow = ({ row, index }) => {
	return (
		<Tr key={index}>
			<Td fontSize={{ base: "sm", xl: "md" }} minW={"150px"}>
				{row.itemName}
			</Td>
			<Td fontSize={{ base: "sm", xl: "md" }}>{row.qty}</Td>
			<Td fontSize={{ base: "sm", xl: "md" }}>{row.price?.toFixed(2)}</Td>
			<Td fontSize={{ base: "sm", xl: "md" }}>{row?.discPercent || "--"}</Td>
			<Td>
				<Text>{row?.amtAfterDiscount?.toFixed(2)}</Text>
			</Td>
		</Tr>
	);
};

export default InvSummaryItemRow;
