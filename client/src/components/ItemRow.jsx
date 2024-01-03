import { DeleteIcon } from "@chakra-ui/icons";
import { Input, Td, Text, Tr } from "@chakra-ui/react";
import React from "react";

const ItemRow = ({ row, index, handleItemsInputChange, deleteRow }) => {
	return (
		<Tr key={index}>
			<Td>
				<Input
					placeholder="Item name or description"
					type="text"
					required
					value={row.itemName}
					onChange={(e) =>
						handleItemsInputChange(index, "itemName", e.target.value)
					}
				/>
			</Td>
			<Td>
				<Input
					placeholder="0"
					required
					type="number"
					value={row.qty}
					onChange={(e) => handleItemsInputChange(index, "qty", e.target.value)}
				/>
			</Td>
			<Td>
				<Input
					placeholder="0"
					required
					type="number"
					value={row.price}
					onChange={(e) =>
						handleItemsInputChange(index, "price", e.target.value)
					}
				/>
			</Td>
			<Td>
				<Input
					placeholder="0"
					type="number"
					value={row.discPercent}
					onChange={(e) =>
						handleItemsInputChange(index, "discPercent", e.target.value)
					}
				/>
			</Td>
			<Td>
				<Text>{row.amtAfterDiscount}</Text>
			</Td>
			<Td>
				<DeleteIcon cursor={"pointer"} onClick={() => deleteRow(index)} />
			</Td>
		</Tr>
	);
};

export default ItemRow;
