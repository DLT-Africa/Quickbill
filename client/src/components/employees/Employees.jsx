import { prevPathAtom } from "@/atoms/prevPathAtom";
import useLogout from "@/hooks/useLogout";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { columns } from "./columns";
import { useAxiosInstance } from "../../../api/axios";
import {
	Box,
	Button,
	Flex,
	Spinner,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import useErrorHandler from "@/hooks/useErrorHandler";
import addClientModalOpenAtom from "@/atoms/addClientModalOpenAtom";
import AddClientModal from "../AddClientModal";
import allClientsAtom from "@/atoms/allClientsAtom";
import SidebarWithHeader from "../SidebarWithHeader";
import allEmployeesAtom from "@/atoms/allEmployeesAtom";
import DataTable from "./DataTable";
import AddEmployeeModal from "../AddEmployeeModal";

const Employees = () => {
	const setAddClientModalOpen = useSetRecoilState(addClientModalOpenAtom);
	const [employees, setEmployees] = useRecoilState(allEmployeesAtom);
	const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);
	const [fetching, setFetching] = useState(true);
	const axiosInstance = useAxiosInstance();
	const logout = useLogout();

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
				px={{ base: 0, md: 8 }}
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
					Employees
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
						Add New Employee
					</Button>

					<AddEmployeeModal />
				</Flex>
			</Flex>

			<DataTable data={employees} columns={columns} />
		</>
	);
};

export default Employees;
