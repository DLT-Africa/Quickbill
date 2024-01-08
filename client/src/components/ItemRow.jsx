import { DeleteIcon } from "@chakra-ui/icons";
import { Input, Td, Text, Tr } from "@chakra-ui/react";
import React from "react";

const ItemRow = ({ row, index, handleItemsInputChange, deleteRow }) => {
	return (
		<Tr key={index}>
			<Td p={{ base: 2, xl: "5" }}>
				<Input
					// p={2}
					fontSize={{ base: "sm", xl: "md" }}
					minW={"150px"}
					placeholder="Item name or description"
					type="text"
					required
					value={row.itemName}
					onChange={(e) =>
						handleItemsInputChange(index, "itemName", e.target.value)
					}
				/>
			</Td>
			<Td p={{ base: 2, xl: "7" }}>
				<Input
					fontSize={{ base: "sm", xl: "md" }}
					// p={2}
					minW={"40px"}
					// textAlign={'center'}
					placeholder="0"
					required
					type="number"
					value={row.qty}
					onChange={(e) => handleItemsInputChange(index, "qty", e.target.value)}
				/>
			</Td>
			<Td p={{ base: 2, xl: "7" }}>
				<Input
					// p={2}
					fontSize={{ base: "sm", xl: "md" }}
					minW={"120px"}
					placeholder="0"
					required
					type="number"
					value={row.price}
					onChange={(e) =>
						handleItemsInputChange(index, "price", e.target.value)
					}
				/>
			</Td>
			<Td p={{ base: 6, xl: "7" }}>
				<Input
					maxW={{ base: "70px", xl: "90%" }}
					placeholder="0"
					type="number"
					fontSize={{ base: "sm", xl: "md" }}
					value={row.discPercent}
					onChange={(e) =>
						handleItemsInputChange(index, "discPercent", e.target.value)
					}
				/>
			</Td>
			<Td p={{ base: 6, xl: "7" }}>
				<Text>{row.amtAfterDiscount}</Text>
			</Td>
			<Td p={{ base: 2, xl: "7" }}>
				<DeleteIcon
					color={"red"}
					cursor={"pointer"}
					onClick={() => deleteRow(index)}
				/>
			</Td>
		</Tr>
	);
};

export default ItemRow;
