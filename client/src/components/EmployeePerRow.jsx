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
import { axiosInstance } from "../../api/axios";
import useShowToast from "../hooks/useShowToast";
import { set } from "date-fns";
import { prevPathAtom } from "../atoms/prevPathAtom";
import useLogout from "../hooks/useLogout";
import { useRecoilState } from "recoil";

const EmployeePerRow = ({ employee, setEmployees }) => {
	const [updateClientModalOpen, setUpdateClientModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: employee.name,
		email: employee.email,
		department: employee.department,
		jobTitle: employee.jobTitle,
	});
	const [loading, setLoading] = useState(false);
	const [deleteClientModalOpen, setDeleteClientModalOpen] = useState(false);
	const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);
  const logout = useLogout()
	const showToast = useShowToast();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleUpdateEmployee = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axiosInstance.put(
				`/employees/${employee._id}`,
				formData
			);
			setLoading(false);
			setUpdateClientModalOpen(false);
            setEmployees(response.data);
			localStorage.setItem("employees-quickBill", JSON.stringify(response.data));
			showToast("Success", "Employee details updated successfully", "success");
			console.log(response.data);
		} catch (error) {
			console.error(error);
            const errorData = error.response?.data;
            if (errorData?.error?.startsWith("Internal")) {
                console.log("Internal Server Error");
            } else if (errorData?.error?.startsWith("jwt" || "Unauthorized")) {
				setPrevPath(window.location.pathname);

				logout()
            } else if (error.response.status === 401) {
				setPrevPath(window.location.pathname);
				logout();
			}
		}
	};

    const handleDeleteEmployee = async () => {
        try {
            const response = await axiosInstance.delete(`/employees/${employee._id}`);
            setEmployees(response.data);
            setDeleteClientModalOpen(false);
            showToast("Success", "Employee deleted successfully", "success");
            localStorage.setItem("employees-quickBill", JSON.stringify(response.data));
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    
    }

	return (
		<Tr>
			<Td>{employee.name}</Td>
			<Td> {employee.email}</Td>
			<Td>{employee.department}</Td>
			<Td>{employee.jobTitle}</Td>
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
				<form onSubmit={handleUpdateEmployee}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Update Employee Details</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Flex gap={2} mb={2}>
								<Text fontWeight={600}>Email:</Text>
								<Text>{employee.email}</Text>
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
								<FormLabel>Department</FormLabel>
								<Input
									type="text"
									name="department"
									value={formData.department}
									onChange={handleChange}
								/>
							</FormControl>
							<FormControl mt={4}>
								<FormLabel>Job Title</FormLabel>
								<Input
									type="text"
									name="jobTitle"
									value={formData.jobTitle}
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
								Update Employee Details
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
							Are you sure you want to delete this employee?
						</Text>
					</ModalBody>
					<ModalFooter>
						<Button
							mr={3}
							onClick={handleDeleteEmployee}
							isLoading={loading}
                            colorScheme={'red'}
						>
							Delete Employee
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

export default EmployeePerRow;
