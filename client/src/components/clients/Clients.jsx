import { prevPathAtom } from "@/atoms/prevPathAtom";
import useLogout from "@/hooks/useLogout";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import DataTable from "./DataTable";
import { columns } from "./columns";
import { useAxiosInstance } from "../../../api/axios";
import {
	Button,
	Flex,
	Spinner,
	Text,
} from "@chakra-ui/react";
import addClientModalOpenAtom from "@/atoms/addClientModalOpenAtom";
import AddClientModal from "../AddClientModal";
import allClientsAtom from "@/atoms/allClientsAtom";

const Clients = () => {
	const setAddClientModalOpen = useSetRecoilState(addClientModalOpenAtom);
	const [clients, setClients] = useRecoilState(allClientsAtom);
	const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);
	const [fetching, setFetching] = useState(true);
	const axiosInstance = useAxiosInstance();

	const logout = useLogout();

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
				setFetching(false);
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
			</Flex>
		);
	}

	return (
		<>
			<Flex
				px={3}
				mt={4}
				justifyContent={"space-between"}
				alignItems={"center"}
				overflowY={"hidden"}
			>
				<Text
					fontSize={{ base: "2xl", md: "3xl" }}
					textAlign={"left"}
					fontWeight={700}
				>
					Clients
				</Text>
				<Flex>
					<Button
						pos={"relative"}
						size={{ base: "sm", md: "md" }}
						bg={"#2970ff"}
						color={"#f6f6f6"}
						_hover={{ bg: "#6C73EF" }}
						onClick={() => setAddClientModalOpen(true)}
					>
						Add New Client
					</Button>

					<AddClientModal />
				</Flex>
			</Flex>

			<DataTable data={clients} columns={columns} />
		</>
	);
};

export default Clients;
