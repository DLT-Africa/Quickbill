import React, { useEffect, useState } from "react";
import {
	Button,
	ButtonGroup,
	IconButton,
	Popover,
	PopoverCloseButton,
	PopoverContent,
	PopoverFooter,
	PopoverTrigger,
	useDisclosure,
} from "@chakra-ui/react";
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
		<>
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
