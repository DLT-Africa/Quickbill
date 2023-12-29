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

const AddClientModal = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		address: "",
	});

	const [addClientModalOpen, setAddClientModalOpen] = useRecoilState(
		addClientModalOpenAtom
	);
	const [sendInviteModalOpen, setSendInviteModalOpen] = useRecoilState(
		sendInviteModalOpenAtom
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Perform email existence check logic here
		try {
      const response = await axiosInstance.post("/invoices/create", formData)
      const data = response.data;
      console.log(data);
		} catch (error) {
			console.log(error);
		}
		// Send formData to the backend for email existence check
		// ...

		// Close the modal
		// setAddClientModalOpen(false);

		// setSendInviteModalOpen(true);
	};

	const handleSendInvitation = () => {
		// Logic to send invitation
		// ...

		// Close the modal
		setSendInviteModalOpen(false);
	};

	return (
		<>
			<Modal
				isOpen={addClientModalOpen}
				onClose={() => setAddClientModalOpen(false)}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Email Check</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl>
							<FormLabel>Name</FormLabel>
							<Input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Email</FormLabel>
							<Input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Address</FormLabel>
							<Input
								type="text"
								name="text"
								value={formData.address}
								onChange={handleChange}
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={handleSubmit}>
							Check Email
						</Button>
						<Button onClick={() => setAddClientModalOpen(false)}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
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
						<Button colorScheme="blue" mr={3} onClick={handleSendInvitation}>
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
