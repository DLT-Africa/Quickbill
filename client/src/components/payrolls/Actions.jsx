import React, { useEffect, useState } from "react";
import {
	Box,
	Button,
	ButtonGroup,
	Flex,
	FormControl,
	FormLabel,
	IconButton,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverFooter,
	PopoverHeader,
	PopoverTrigger,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import useLogout from "@/hooks/useLogout";
import useShowToast from "@/hooks/useShowToast";
import useErrorHandler from "@/hooks/useErrorHandler";
import { useAxiosInstance } from "/api/axios";
import { prevPathAtom } from "@/atoms/prevPathAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdOutlinePaid } from "react-icons/md";
import allEmployeesAtom from "@/atoms/allEmployeesAtom";
import { useNavigate } from "react-router-dom";
import userAtom from "@/atoms/userAtom";
import allPayrollsAtom from "@/atoms/allPayrollsAtom";
import { GrTransaction } from "react-icons/gr";
import { GiCancel } from "react-icons/gi";

const Actions = ({ singlePayroll }) => {
	const navigate = useNavigate();
	const user = useRecoilValue(userAtom);
	// const [statusColor, setStatusColor] = useState("#E0BF00");
	// const [salaryAmount, setSalaryAmount] = useState(0);
	const setAllPayrolls = useSetRecoilState(allPayrollsAtom);
	const [isActionDisabled, setIsActionDisabled] = useState(false);
	const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);
	const axiosInstance = useAxiosInstance();
	const logout = useLogout();
	// const initialFocusRef = React.useRef();
	const { onOpen, onClose, isOpen } = useDisclosure();
	const [paying, setPaying] = useState(false);
	const [voiding, setVoiding] = useState(false);

	useEffect(() => {
		if (singlePayroll?.paymentStatus === "Paid" || singlePayroll?.paymentStatus === "Voided") {
			setIsActionDisabled(true);
		} 
	}, []);

	const handleSalaryStatus = async (e) => {
		const status = e.target.name;

		let updatePayroll;
		if (status === "pay") {
			setPaying(true);
			updatePayroll = {
				...singlePayroll,
				paymentStatus: "Paid",
				paymentDate: new Date(),
			};
			// setIsActionDisabled(true);
		} else if (status === "void") {
			setVoiding(true);
			updatePayroll = {
				...singlePayroll,
				paymentStatus: "Voided",
			};
		}

		try {
			const response = await axiosInstance.put(
				`/payrolls/${singlePayroll._id}`,
				{ updatePayroll }
			);

			setAllPayrolls(response.data);
			// status === "pay" ? setStatusColor("green") : setStatusColor("red");
			// window.location.reload();
			setIsActionDisabled(true);

			// console.log(response.data);
		} catch (error) {
			console.log(error);
			const errorData = error.response?.data;
			if (errorData?.error?.startsWith("Internal")) {
				console.log("Internal Server Error");
			} else if (errorData?.error?.startsWith("jwt" || "Unauthorized")) {
				setPrevPath(window.location.pathname);
				logout();
			} else if (error.response.status === 401) {
				setPrevPath(window.location.pathname);
				logout();
			}
		} finally {
			onClose();
			setPaying(false);
			setVoiding(false);
		}
	};

	return (
		<>
			{/* <Menu cursor={"pointer"}>
				<MenuButton
					isDisabled={isActionDisabled}
					as={IconButton}
					aria-label="Options"
					icon={<GrTransaction />}
					variant="outline"
				/>
				<MenuList>
					<MenuItem
						icon={<MdOutlinePaid />}
						name="pay"
						onClick={handleSalaryStatus}
					>
						Pay Now
					</MenuItem>
					<MenuItem
						icon={<GiCancel />}
						name="void"
						onClick={handleSalaryStatus}
					>
						Void Salary
					</MenuItem>
				</MenuList>
			</Menu> */}

			<Popover
				// initialFocusRef={initialFocusRef}
				placement="left"
				isOpen={isOpen}
				onOpen={onOpen}
				onClose={onClose}
				closeOnBlur={true}
			>
				<PopoverTrigger>
					<Button
						as={IconButton}
						aria-label="Options"
						icon={<GrTransaction />}
						variant="outline"
					/>
				</PopoverTrigger>
				<PopoverContent
					w={"100%"}
					color="white"
					bg="blue.800"
					borderColor="blue.800"
				>
					            <PopoverCloseButton />

					<PopoverFooter
						border="0"
						display="flex"
						alignItems="center"
						justifyContent="center"
						pb={3}
						pt={10}
					>
						<ButtonGroup size="sm">
							<Button
								size={"sm"}
								icon={<GiCancel />}
								name="void"
								onClick={handleSalaryStatus}
								colorScheme="red"
								isLoading={voiding}
								isDisabled={isActionDisabled}
							>
								Void
							</Button>
							<Button
								size={"sm"}
								name="pay"
								onClick={handleSalaryStatus}
								colorScheme="green"
								// ref={initialFocusRef}
								isLoading={paying}
								isDisabled={isActionDisabled}
							>
								Pay Now
							</Button>
						</ButtonGroup>
					</PopoverFooter>
				</PopoverContent>
			</Popover>
		</>
	);
};

export default Actions;
