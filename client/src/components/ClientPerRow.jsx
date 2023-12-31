import { Td, Tr } from "@chakra-ui/react";
import React from "react";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ClientPerRow = ({client}) => {
	return (
		<Tr>
			<Td>{client.name}</Td>
			<Td> {client.email}</Td>
			<Td>{client.address}</Td>
			<Td>
				<FaEdit cursor={"pointer"} />
			</Td>
			<Td>
				<MdDelete cursor={"pointer"} />
			</Td>
		</Tr>
	);
};

export default ClientPerRow;
