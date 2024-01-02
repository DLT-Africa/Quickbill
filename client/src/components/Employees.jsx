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
import AddEmployeeModal from "./AddEmployeeModal";
import EmployeePerRow from "./EmployeePerRow";
import allEmployeesAtom from "../atoms/allEmployeesAtom";

const Employees = () => {
	const setAddClientModalOpen = useSetRecoilState(addClientModalOpenAtom);
	const [employees, setEmployees] = useRecoilState(allEmployeesAtom);
  const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);
  const logout = useLogout()


	useEffect(() => {
		const getAllClients = async () => {
			try {
				const response = await axiosInstance.get("/employees");
				const data = response.data;
				setEmployees(data);
				// localStorage.setItem("employees-quickBill", JSON.stringify(data));
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
			}
		};
		getAllClients();
	}, []);

	return (
		<>
				<Flex px={8} mt={4} justifyContent={"space-between"}>
					<Text fontSize={36} textAlign={"left"} fontWeight={700}>
						Employees
					</Text>
					<Flex>
						<Button
							pos={"relative"}
							bg={"#2970ff"}
							color={"#f6f6f6"}
							_hover={{ bg: "#6C73EF" }}
							onClick={() => setAddClientModalOpen(true)}
						>
							Add New Employee
						</Button>

						<AddEmployeeModal />
					</Flex>
				</Flex>
				<Flex justifyContent={"center"} alignItems={"center"}>
					<Table variant="simple" colorScheme="gray" size={"md"} w={"95%"}>
						<Thead>
							<Tr
								p={2}
								borderBottom={"0.5px solid rgba(0, 0, 0, 0.60)"}
								borderTop={"0.5px solid rgba(0, 0, 0, 0.60)"}
								bg={"rgba(55, 73, 87, 0.1)"}
								>
								<Th color={"#1c1c1c"} fontSize={"l"}>
									Name
								</Th>
								<Th color={"#1c1c1c"} fontSize={"l"}>
									email
								</Th>
								<Th color={"#1c1c1c"} fontSize={"l"}>
									Department
								</Th>
								<Th color={"#1c1c1c"} fontSize={"l"}>
									Job Title
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
							{employees?.map((employee, index) => (
								<EmployeePerRow
									key={index}
									index={index}
									setEmployees={setEmployees}
									employee={employee}
								/>
							))}
						</Tbody>
					</Table>
				</Flex>
		</>
	);
};

export default Employees;
