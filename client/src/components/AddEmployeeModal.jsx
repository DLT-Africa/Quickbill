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
import allClientsAtom from "../atoms/allClientsAtom";
import allEmployeesAtom from "../atoms/allEmployeesAtom";
import useLogout from "../hooks/useLogout";
import { prevPathAtom } from "../atoms/prevPathAtom";
import useErrorHandler from "../hooks/useErrorHandler";

const AddEmployeeModal = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		jobTitle: "",
		department: "",
	});
	const showToast = useShowToast();
	const [loading, setLoading] = useState(false);

	const [addClientModalOpen, setAddClientModalOpen] = useRecoilState(
		addClientModalOpenAtom
	);
	const [sendInviteModalOpen, setSendInviteModalOpen] = useRecoilState(
		sendInviteModalOpenAtom
	);

	const [employees, setEmployees] = useRecoilState(allEmployeesAtom);
	const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);
	const logout = useLogout();
	const errorHandler = useErrorHandler()

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const existingEmployees =
			JSON.parse(localStorage.getItem("employees-quickBill")) || [];
		// Perform email existence check logic here
		try {
			const response = await axiosInstance.post("/employees/create", formData);
			const allNewEmployees = response.data;
			// const updatedEmployee = [...existingEmployees, newEmployee];
			localStorage.setItem(
				"employees-quickBill",
				JSON.stringify(allNewEmployees)
			);
			setEmployees(allNewEmployees);
			setLoading(false);
			setAddClientModalOpen(false);
			setFormData({ name: "", email: "", department: "", jobTitle: "" });

			showToast("Success", "Employee added successfully", "success");
		} catch (error) {
			console.log(error.response);
			const errorData = error.response?.data;

			if (error.response && error.response.status === 400) {
				showToast("Error", error.response.data.error, "error");
				setLoading(false);
			} else if (error.response && error.response.status === 404) {
				setAddClientModalOpen(false);
				setSendInviteModalOpen(true);
				setLoading(false);
			} else {
				errorHandler(error);
			}
		}
	};

	const handleSendInvitation = () => {
		// Logic to send invitation
		// ...
		try {
			setLoading(true);
			const response = axiosInstance.post("/employees/invite", formData);
			const data = response.data;
			console.log(data);
			showToast("Success", "Invitation sent successfully", "success");
			setSendInviteModalOpen(false);
			setLoading(false);
		} catch (error) {
			console.log(error);
			if (error.response.data.msg) {
				showToast("Error", error.response.data.msg, "error");
				setSendInviteModalOpen(false);
				setLoading(false);
			}  else {
				errorHandler(error);
			}
			setSendInviteModalOpen(false);
			setLoading(false);
		}
	};

	return (
		<>
			<Modal
				isOpen={addClientModalOpen}
				onClose={() => {
					setAddClientModalOpen(false);
					setLoading(false);
				}}
			>
				<form onSubmit={handleSubmit}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Add Employee</ModalHeader>
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
								<FormLabel>Job Title</FormLabel>
								<Input
									type="text"
									name="jobTitle"
									value={formData.jobTitle}
									onChange={handleChange}
									required
								/>
							</FormControl>
							<FormControl mt={4} isRequired>
								<FormLabel>Department</FormLabel>
								<Input
									type="text"
									name="department"
									value={formData.department}
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
								isLoading={loading}
							>
								Add Employee
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
							isLoading={loading}
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

export default AddEmployeeModal;
