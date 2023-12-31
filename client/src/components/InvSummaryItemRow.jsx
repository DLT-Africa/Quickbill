import { Td, Text, Tr } from "@chakra-ui/react";
import React from "react";

const InvSummaryItemRow = ({row, index}) => {
	return (
		<Tr key={index}>
			<Td>
				{row.itemName}
			</Td>
			<Td>
            {row.qty}
			</Td>
			<Td>
            {row.price?.toFixed(2)}
			</Td>
			<Td>
           {(row?.discPercent) || '--'}
			</Td>
			<Td>
				<Text>{row?.amtAfterDiscount?.toFixed(2)}</Text>
			</Td>
			
		</Tr>
	);
};

export default InvSummaryItemRow;
