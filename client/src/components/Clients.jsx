import { useEffect, useState } from "react";
import {
	Button,
	Flex,
	Spinner,
	Stack,
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
	const [fetching, setFetching] = useState(true)
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
				} else if (error.response.status === 401) {
					setPrevPath(window.location.pathname);
					logout();
				}
			} finally {
				setFetching(false)

			}
		};
		getAllClients();
	}, []);

	if (fetching) {
		return (
			<Flex
				justifyContent={"center"}
				flexDir={"column"}
				gap={2}
				alignItems={"center"}
				minH={"100vh"}
			>
				<Spinner size={"xl"} />
			</Flex>)
	}

	return (
		<Stack maxH={'100vh'} overflowX={'hidden'}>
			<Flex px={{ base: 0, md: 8 }} mt={4} justifyContent={"space-between"} alignItems={'center'} overflowY={'hidden'}>
				<Text fontSize={{base: '2xl', md: '3xl'}} textAlign={"left"} fontWeight={700}>
					Clients
				</Text>
				<Flex>
					<Button
						pos={"relative"}
						size={{ base: 'sm', md: 'md', lg: 'lg' }}
						bg={"#2970ff"}
						fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
						color={"#f6f6f6"}
						_hover={{ bg: "#6C73EF" }}
						onClick={() => setAddClientModalOpen(true)}
					>
						Add New Client
					</Button>

					<AddClientModal />
				</Flex>
			</Flex>
			<Flex justifyContent={"center"}  overflowY={'hidden'} scrollBehavior={'smooth'} >
				<Table variant="simple" colorScheme="gray" size={"md"} w={"95%"}>
					<Thead px={{base: 10, md: 20}}>
						<Tr
							p={2}
							borderBottom={"0.5px solid rgba(0, 0, 0, 0.60)"}
							borderTop={"0.5px solid rgba(0, 0, 0, 0.60)"}
							bg={"rgba(55, 73, 87, 0.1)"}
						>
							<Th color={"#1c1c1c"} fontSize={{base: '12px', md: '18px', lg: 'xl'}}>
								Name
							</Th>
							<Th color={"#1c1c1c"} fontSize={{base: '12px', md: '18px', lg: 'xl'}}>
								email
							</Th>
							<Th color={"#1c1c1c"} fontSize={{base: '12px', md: '18px', lg: 'xl'}}>
								Address
							</Th>
							<Th color={"#1c1c1c"} fontSize={{base: '12px', md: '18px', lg: 'xl'}}>
								Edit
							</Th>
							<Th color={"#1c1c1c"} >
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
		</Stack>
	);
};

export default Clients;
