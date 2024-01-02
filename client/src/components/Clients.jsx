import { useEffect, useState } from "react";
import {
	Button,
	Flex,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import React from "react";
import SidebarWithHeader from "./SidebarWithHeader";
import AddClientModal from "./AddClientModal";
import addClientModalOpenAtom from "../atoms/addClientModalOpenAtom";
import { useRecoilState, useSetRecoilState } from "recoil";
import ClientPerRow from "./ClientPerRow";
import { axiosInstance } from "../../api/axios";
import allClientsAtom from "../atoms/allClientsAtom";
import { prevPathAtom } from "../atoms/prevPathAtom";
import useLogout from "../hooks/useLogout";

const Clients = () => {
	const setAddClientModalOpen = useSetRecoilState(addClientModalOpenAtom);
	const [clients, setClients] = useRecoilState(allClientsAtom);
  const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);
  const logout = useLogout()


	useEffect(() => {
		const getAllClients = async () => {
			try {
				const response = await axiosInstance.get("/clients");
				const data = response.data;
				setClients(data);
				localStorage.setItem("clients-quickBill", JSON.stringify(data));
				console.log(data);
			} catch (error) {
				console.log(error);
				if (error?.response?.status === 401) {
					setPrevPath(window.location.pathname);
					logout();
				} else if (
					error?.response?.data?.error?.startsWith("jwt" || "Unauthorized")
				) {
					setPrevPath(window.location.pathname);
					logout();
				}
			}
		};
		getAllClients();
	}, []);

	return (
		<>
			<SidebarWithHeader>
				<Flex px={8} mt={4} justifyContent={"space-between"}>
					<Text fontSize={36} textAlign={"left"} fontWeight={700}>
						Clients
					</Text>
					<Flex>
						<Button
							pos={"relative"}
							bg={"#2970ff"}
							color={"#f6f6f6"}
							_hover={{ bg: "#6C73EF" }}
							onClick={() => setAddClientModalOpen(true)}
						>
							Add New Clients
						</Button>

						<AddClientModal />
					</Flex>
				</Flex>
				<Flex justifyContent={"center"} alignItems={"center"}>
					<Table variant="simple" colorScheme="gray" size={"md"} w={"95%"}>
						<Thead>
							<Tr
								p={2}
								borderBottom={"0.5px solid rgba(0, 0, 0, 0.60)"}
								borderTop={"0.5px solid rgba(0, 0, 0, 0.60)"}
								bg={"#F4F4F4"}
							>
								<Th color={"#1c1c1c"} fontSize={"l"}>
									Name
								</Th>
								<Th color={"#1c1c1c"} fontSize={"l"}>
									email
								</Th>
								<Th color={"#1c1c1c"} fontSize={"l"}>
									Address
								</Th>
								<Th color={"#1c1c1c"} fontSize={"l"}>
									Edit
								</Th>
								<Th color={"#1c1c1c"} fontSize={"l"}>
									Delete
								</Th>
							</Tr>
						</Thead>
						<Tbody>
							{clients?.map((client, index) => (
								<ClientPerRow
									key={index}
									index={index}
									setClients={setClients}
									client={client}
								/>
							))}
						</Tbody>
					</Table>
				</Flex>
			</SidebarWithHeader>
		</>
	);
};

export default Clients;

// <TableContainer
// 	pl={80}
// 	pr={20}
// 	pt={20}
// 	fontWeight={500}
// 	top={11}
// 	left={27}
// >
// 	<Table>
// 		<Thead>
// 			<Tr
// 				p={4}
// 				borderBottom={"0.5px solid rgba(0, 0, 0, 0.60)"}
// 				borderTop={"0.5px solid rgba(0, 0, 0, 0.60)"}
// 				bg={"rgba(55, 73, 87, 0.1)"}
// 			>
// 				<Th color={"#1c1c1c"} fontSize={"xl"}>
// 					Name
// 				</Th>
// 				<Th color={"#1c1c1c"} fontSize={"xl"}>
// 					Email
// 				</Th>
// 				<Th color={"#1c1c1c"} fontSize={"xl"}>
// 					Edit
// 				</Th>
// 				<Th color={"#1c1c1c"} fontSize={"xl"}>
// 					Delete
// 				</Th>
// 			</Tr>
// 		</Thead>
// 		<Tbody fontSize={"17"}>
// 			<Tr>
// 				<Td>Jimoh Kanas</Td>
// 				<Td> jimohkanas91@gmail.com</Td>
// 				<Td>
// 					<FaEdit cursor={"pointer"} />
// 				</Td>
// 				<Td>
// 					<MdDelete cursor={"pointer"} />
// 				</Td>
// 			</Tr>
// 			<Tr>
// 				<Td>Musa Muhammed</Td>
// 				<Td> muha_smallkay@gmail.com</Td>
// 				<Td>
// 					<FaEdit cursor={"pointer"} />
// 				</Td>
// 				<Td>
// 					<MdDelete cursor={"pointer"} />
// 				</Td>
// 			</Tr>
// 		</Tbody>
// 	</Table>
// </TableContainer>
