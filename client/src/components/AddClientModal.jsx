// EmailCheckModal.jsx
import { useState } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	FormControl,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import addClientModalOpenAtom from "../atoms/addClientModalOpenAtom";
import sendInviteModalOpenAtom from "../atoms/sendInviteModalOpenAtom";
import { axiosInstance } from "../../api/axios";
import useShowToast from "../hooks/useShowToast";
import { set } from "date-fns";
import allClientsAtom from "../atoms/allClientsAtom";
import useErrorHandler from "../hooks/useErrorHandler";

const AddClientModal = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		address: "",
	});
	const showToast = useShowToast();
	const [loadingAddClientBtn, setLoadingAddClientBtn] = useState(false);

	const [addClientModalOpen, setAddClientModalOpen] = useRecoilState(
		addClientModalOpenAtom
	);
	const [sendInviteModalOpen, setSendInviteModalOpen] = useRecoilState(
		sendInviteModalOpenAtom
	);
	const [clients, setClients] = useRecoilState(allClientsAtom);
	const errorHandler = useErrorHandler();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleAddClient = async (e) => {
		e.preventDefault();
		setLoadingAddClientBtn(true);
		const existingClients =
			JSON.parse(localStorage.getItem("clients-quickBill")) || [];
		// Perform email existence check logic here
		try {
			const response = await axiosInstance.post("/clients/create", formData);
			const newClient = response.data;
			const updatedClients = [...existingClients, newClient];
			localStorage.setItem("clients-quickBill", JSON.stringify(updatedClients));
			setClients(updatedClients);
			setLoadingAddClientBtn(false);
			setAddClientModalOpen(false);
			setFormData({ name: "", email: "", address: "" });

			showToast("Success", "Client added successfully", "success");
		} catch (error) {
			console.log(error.response);
			if (error.response && error.response.status === 400) {
				showToast("Error", error.response.data.message, "error");
				setLoadingAddClientBtn(false);
			} else if (error.response && error.response.status === 404) {
				setAddClientModalOpen(false);
				setSendInviteModalOpen(true);
				setLoadingAddClientBtn(false);
			}  else {
				errorHandler(error);
			}
		}
	};

	const handleSendInvitation = () => {
		// Logic to send invitation
		// ...
		try {
			setLoadingAddClientBtn(true);
			const response = axiosInstance.post("/clients/invite", formData);
			const data = response.data;
			console.log(data);
			showToast("Success", "Invitation sent successfully", "success");
			setSendInviteModalOpen(false);
			setLoadingAddClientBtn(false);
		} catch (error) {
			console.log(error);
			if (error.response.data.msg) {
				showToast("Error", error.response.data.msg, "error");
				setSendInviteModalOpen(false);
				setLoadingAddClientBtn(false);
			} else {
				errorHandler(error);
			}
			setSendInviteModalOpen(false);
			setLoadingAddClientBtn(false);
		}
	};

	return (
		<>
			<Modal
				isOpen={addClientModalOpen}
				onClose={() => setAddClientModalOpen(false)}
			>
				<form id="addClient" onSubmit={handleAddClient}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Add Client</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<FormControl isRequired>
								<FormLabel>Name</FormLabel>
								<Input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
									required
								/>
							</FormControl>
							<FormControl mt={4} isRequired>
								<FormLabel>Email</FormLabel>
								<Input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
								/>
							</FormControl>
							<FormControl mt={4} isRequired>
								<FormLabel>Address</FormLabel>
								<Input
									type="text"
									name="address"
									value={formData.address}
									onChange={handleChange}
									required
								/>
							</FormControl>
						</ModalBody>
						<ModalFooter>
							<Button
								type="submit"
								colorScheme="blue"
								mr={3}
								isLoading={loadingAddClientBtn}
								form="addClient"
							>
								Add Client
							</Button>
							<Button onClick={() => setAddClientModalOpen(false)}>
								Cancel
							</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>

			<Modal
				isOpen={sendInviteModalOpen}
				onClose={() => setSendInviteModalOpen(false)}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalBody>
						<p>
							The email provided is not registered on this platform, do you want
							to send an invitation?
						</p>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={handleSendInvitation}
							isLoading={loadingAddClientBtn}
						>
							Send Invitation
						</Button>
						<Button onClick={() => setSendInviteModalOpen(false)}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AddClientModal;
