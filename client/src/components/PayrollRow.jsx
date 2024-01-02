import {
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Td,
	Text,
	Tr,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { addDays, format, set } from "date-fns";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { GrTransaction } from "react-icons/gr";
import { MdOutlinePaid } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { axiosInstance } from "../../api/axios";
import allPayrollsAtom from "../atoms/allPayrollsAtom";
import useLogout from "../hooks/useLogout";
import { prevPathAtom } from "../atoms/prevPathAtom";

const PayrollRow = ({ singlePayroll }) => {
	const navigate = useNavigate();
	const user = useRecoilValue(userAtom);
	const [statusColor, setStatusColor] = useState("#E0BF00");
	const [salaryAmount, setSalaryAmount] = useState(0);
	const setAllPayrolls = useSetRecoilState(allPayrollsAtom);
	const [isActionDisabled, setIsActionDisabled] = useState(false);
    const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);
	const logout = useLogout();

	useEffect(() => {
		switch (singlePayroll?.paymentStatus) {
			case "Awaiting Payment":
				setStatusColor("#E0BF00");
				break;
			case "Paid":
				setStatusColor("green");
				setIsActionDisabled(true);
				break;
			case "Voided":
				setStatusColor("red");
				setIsActionDisabled(true);
				break;
		}

		const formatSalary = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: singlePayroll.currency, // Change currency code as needed
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(singlePayroll.salary);

		setSalaryAmount(formatSalary);
	}, []);

	const handleSalaryStatus = async (e) => {
		const status = e.target.name;

		let updatePayroll;
		if (status === "pay") {
			updatePayroll = {
				...singlePayroll,
				paymentStatus: "Paid",
				paymentDate: new Date(),
			};
			setIsActionDisabled(true);
		} else if (status === "void") {
			updatePayroll = {
				...singlePayroll,
				paymentStatus: "Voided",
			};
			setIsActionDisabled(true);
		}

		try {
			const response = await axiosInstance.put(
				`/payrolls/${singlePayroll._id}`,
				{ updatePayroll }
			);

			setAllPayrolls(response.data);
			status === "pay" ? setStatusColor("green") : setStatusColor("red");
			window.location.reload();

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
		}
	};

	return (
		<Tr>
			<Td>{singlePayroll.employeeId.name}</Td>
			<Td> {singlePayroll.employeeId.department}</Td>
			<Td> {singlePayroll.employeeId.jobTitle}</Td>
			<Td>{salaryAmount}</Td>
			<Td>
				{singlePayroll?.paymentDate
					? format(singlePayroll?.paymentDate, "dd/MM/yyyy")
					: "--"}
			</Td>
			<Td>
				<Text color={statusColor} fontWeight={700}>
					{singlePayroll.paymentStatus}
				</Text>
			</Td>
			<Td>
				<Menu cursor={"pointer"}>
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
				</Menu>
			</Td>
		</Tr>
	);
};

export default PayrollRow;
