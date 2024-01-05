import { Td, Text, Tr } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { addDays, format } from "date-fns";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const InvoicePerRow = ({ singleInvoice }) => {
	const navigate = useNavigate();
	const user = useRecoilValue(userAtom);
	const [statusColor, setStatusColor] = useState("#E0BF00");
	const [total, setTotal] = useState(0);
	const [remAmount, setRemAmount] = useState(0);

	useEffect(() => {
		switch (singleInvoice?.invoiceStatus) {
			case "Partially Paid":
				setStatusColor("#7d85f5");
				break;
			case "Paid":
				setStatusColor("green");
				break;
			case "Rejected":
				setStatusColor("red");
				break;
			case "Overdue":
				setStatusColor("#E40DC4");
				break;
		}

		const formatTotal = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: singleInvoice.currency, // Change currency code as needed
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(singleInvoice.grandTotal);

		const formatRemAmount = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: singleInvoice.currency, // Change currency code as needed
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(singleInvoice.remainingAmount);

		setRemAmount(formatRemAmount);

		setTotal(formatTotal);
	}, []);

	return (
		<Tr
			onClick={() => navigate(`/invoices/${singleInvoice._id}`)}
			cursor={"pointer"}
			_hover={{ bg: "#EFEFEF" }}
		>
			<Td>{singleInvoice.invoiceNumber.toString().padStart(3, "0")}</Td>
			<Td>
				{" "}
				{user?._id === singleInvoice?.creatorId?._id
					? singleInvoice.client?.name
					: singleInvoice?.creatorId?.name}
			</Td>
			<Td>{total}</Td>
			<Td>{remAmount}</Td>
			<Td>{format(singleInvoice.dueDate, "dd/MM/yyyy")}</Td>
			<Td>
				<Text color={statusColor} fontWeight={700}>
					{singleInvoice.invoiceStatus}
				</Text>
			</Td>
		</Tr>
	);
};

export default InvoicePerRow;
