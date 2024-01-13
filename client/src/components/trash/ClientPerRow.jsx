import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
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
import React, { useState } from "react";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {  useAxiosInstance } from "../../../api/axios";
import useShowToast from "../../hooks/useShowToast";
import { set } from "date-fns";
import { prevPathAtom } from "../../atoms/prevPathAtom";
import useLogout from "../../hooks/useLogout";
import { useRecoilState } from "recoil";
import useErrorHandler from "../../hooks/useErrorHandler";

const ClientPerRow = ({ client, setClients }) => {
	const [updateClientModalOpen, setUpdateClientModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: client.name,
		email: client.email,
		address: client.address,
	});
	const [loading, setLoading] = useState(false);
	const [deleteClientModalOpen, setDeleteClientModalOpen] = useState(false);
	const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);
	const logout = useLogout()
	const showToast = useShowToast();
	const errorHandler = useErrorHandler()
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

	}

	return (
		<Tr>
			<Td fontSize={{ base: '12px', md: '18px', lg: 'xl' }}>{client.name}</Td>
			<Td fontSize={{ base: '12px', md: '18px', lg: 'xl' }}> {client.email}</Td>
			<Td fontSize={{ base: '12px', md: '18px', lg: 'xl' }}>{client.address}</Td>
			<Td>
				<FaEdit
					cursor={"pointer"}
					onClick={() => setUpdateClientModalOpen(true)}
				/>
			</Td>
			<Td>
				<MdDelete cursor={"pointer"} onClick={() => setDeleteClientModalOpen(true)} />
			</Td>

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
						<Text>
							Are you sure you want to delete this client?
						</Text>
					</ModalBody>
					<ModalFooter>
						<Button
							mr={3}
							onClick={handleDeleteClient}
							isLoading={loading}
							colorScheme={'red'}
						>
							Delete Client
						</Button>
						<Button onClick={() => setDeleteClientModalOpen(false)}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Tr>
	);
};

export default ClientPerRow;
