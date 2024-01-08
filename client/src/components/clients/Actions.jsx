import React, { useState } from "react";
import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Menu,
	MenuButton,
	MenuGroup,
	MenuItem,
	MenuList,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Td,
	Text,
	Tr,
} from "@chakra-ui/react";
import useLogout from "@/hooks/useLogout";
import useShowToast from "@/hooks/useShowToast";
import useErrorHandler from "@/hooks/useErrorHandler";
import { useAxiosInstance } from "/api/axios";
import { prevPathAtom } from "@/atoms/prevPathAtom";
import { useRecoilState, useSetRecoilState } from "recoil";
import allClientsAtom from "@/atoms/allClientsAtom";
// import { Button } from "@/components/ui/button";

import { CaretSortIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Actions = ({ client }) => {
	const setClients = useSetRecoilState(allClientsAtom);
	const [updateClientModalOpen, setUpdateClientModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: client.name,
		email: client.email,
		address: client.address,
	});
	const [loading, setLoading] = useState(false);
	const [deleteClientModalOpen, setDeleteClientModalOpen] = useState(false);
	const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);
	const logout = useLogout();
	const showToast = useShowToast();
	const errorHandler = useErrorHandler();
	const axiosInstance = useAxiosInstance();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleUpdateClient = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axiosInstance.put(
				`/clients/${client._id}`,
				formData
			);
			setLoading(false);
			setUpdateClientModalOpen(false);
			setClients(response.data);
			localStorage.setItem("clients-quickBill", JSON.stringify(response.data));
			showToast("Success", "Client details updated successfully", "success");
			console.log(response.data);
		} catch (error) {
			console.error(error);
			errorHandler(error);
		}
	};

	const handleDeleteClient = async () => {
		try {
			const response = await axiosInstance.delete(`/clients/${client._id}`);
			setClients(response.data);
			setDeleteClientModalOpen(false);
			showToast("Success", "Client deleted successfully", "success");
			localStorage.setItem("clients-quickBill", JSON.stringify(response.data));
			console.log(response.data);
		} catch (error) {
			errorHandler(error);
		}
	};

	return (
		<>
			

			<Flex gap={6}>
				<FaEdit
                size={25}
					cursor={"pointer"}
					onClick={() => setUpdateClientModalOpen(true)}
				/>
				<MdDelete
                                size={25}

					cursor={"pointer"}
					onClick={() => setDeleteClientModalOpen(true)}
				/>
			</Flex>

			<Modal
				isOpen={updateClientModalOpen}
				onClose={() => setUpdateClientModalOpen(false)}
			>
				<form onSubmit={handleUpdateClient}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Update Client Details</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Flex gap={2} mb={2}>
								<Text fontWeight={600}>Email:</Text>
								<Text>{client.email}</Text>
							</Flex>

							<FormControl>
								<FormLabel>Name</FormLabel>
								<Input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
								/>
							</FormControl>

							<FormControl mt={4}>
								<FormLabel>Address</FormLabel>
								<Input
									type="text"
									name="address"
									value={formData.address}
									onChange={handleChange}
								/>
							</FormControl>
						</ModalBody>
						<ModalFooter>
							<Button
								type="submit"
								colorScheme="blue"
								mr={3}
								isLoading={loading}
							>
								Update Client Details
							</Button>
							<Button onClick={() => setUpdateClientModalOpen(false)}>
								Cancel
							</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>

			<Modal
				isOpen={deleteClientModalOpen}
				onClose={() => setDeleteClientModalOpen(false)}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalBody>
						<Text>Are you sure you want to delete this client?</Text>
					</ModalBody>
					<ModalFooter>
						<Button
							mr={3}
							onClick={handleDeleteClient}
							isLoading={loading}
							colorScheme={"red"}
						>
							Delete Client
						</Button>
						<Button onClick={() => setDeleteClientModalOpen(false)}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Actions;
