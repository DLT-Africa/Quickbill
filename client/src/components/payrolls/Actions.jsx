import React, { useEffect, useState } from "react";
import {
	Button,
	ButtonGroup,
	Flex,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Popover,
	PopoverArrow,
	PopoverCloseButton,
	PopoverContent,
	PopoverFooter,
	PopoverTrigger,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { BsInfoCircle } from "react-icons/bs";

import useLogout from "@/hooks/useLogout";
import { useAxiosInstance } from "/api/axios";
import { prevPathAtom } from "@/atoms/prevPathAtom";
import { useRecoilState, useSetRecoilState } from "recoil";
import allPayrollsAtom from "@/atoms/allPayrollsAtom";
import { GrTransaction } from "react-icons/gr";
import { GiCancel } from "react-icons/gi";

const Actions = ({ singlePayroll }) => {
	const setAllPayrolls = useSetRecoilState(allPayrollsAtom);
	const [isActionDisabled, setIsActionDisabled] = useState(false);
	const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);
	const axiosInstance = useAxiosInstance();
	const logout = useLogout();
	const { onOpen, onClose, isOpen } = useDisclosure();
	const [paying, setPaying] = useState(false);
	const [voiding, setVoiding] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalClose, setIsModalClose] = useState(false);

	useEffect(() => {
		if (
			singlePayroll?.paymentStatus === "Paid" ||
			singlePayroll?.paymentStatus === "Voided"
		) {
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
			setIsActionDisabled(true);
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
		<Flex gap={3}>
			<Button
				as={IconButton}
				icon={<BsInfoCircle />}
				onClick={() => setIsModalOpen(true)}
			></Button>

			<Popover
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
					<PopoverArrow bg="blue.800" />
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

			<Modal onClose={onClose} isOpen={isModalOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Payroll No: {singlePayroll.payrollNumber}</ModalHeader>
					<ModalCloseButton
						onClick={(e) => {
							e.preventDefault();
							setIsModalOpen(false);
						}}
					/>
					<ModalBody>
						<Text><strong>Bank Name: </strong>{singlePayroll.bankName}</Text>
						<Text><strong>Account Name: </strong>{singlePayroll.accountName}</Text>
						<Text><strong>Account Number: </strong>{singlePayroll.accountNumber}</Text>
					</ModalBody>
					<ModalFooter>
						<Button onClick={() => setIsModalOpen(false)}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default Actions;
