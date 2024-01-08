import React from "react";
import { Button } from "@/components/ui/button";

import { CaretSortIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Actions from "./Actions";
import { Flex } from "@chakra-ui/react";

export const columns = [
	{
		header: () => <div>Name</div>,
		accessorKey: "employeeId.name",
		cell: ({ row }) => (
			<div className="capitalize font-medium text-left">
				{row.getValue("employeeId_name")}
			</div>
		),
	},
	{
		header: () => <div>Department</div>,
		accessorKey: "employeeId.department",
		cell: ({ row }) => {
			return (
				<div className="font-medium text-left">
					{row.getValue("employeeId_department")}
				</div>
			);
		},
	},
	{
		header: () => <div>Job Title</div>,
		accessorKey: "employeeId.jobTitle",
		cell: ({ row }) => {
			return (
				<div className="font-medium text-left">
					{row.getValue("employeeId_jobTitle")}
				</div>
			);
		},
	},
	{
		header: () => <div>Salary</div>,
		accessorKey: "salary",
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("salary"));
			const currency = row.original.currency;

			// Format the amount as a dollar amount
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: currency,
			})?.format(amount);

			return <div className="font-medium text-left">{formatted}</div>;
		},
	},
	{
		header: () => <div>Payment Date</div>,
		accessorKey: "paymentDate",
		cell: ({ row }) => {
			const paymentDate = row.getValue("paymentDate");
			let formatted;
			if (paymentDate) formatted = format(paymentDate, "dd/MM/yyyy");
			return <div className="font-medium text-left">{formatted || "--"}</div>;
		},
	},

	{
		header: "Status",
		accessorKey: "paymentStatus",
		cell: ({ row }) => {
			const status = row.original.paymentStatus;

			let statusColor = "text-[#E0BF00]";
			switch (status) {
				case "Paid":
					statusColor = "text-green-700";
					break;
				case "Voided":
					statusColor = "text-red-700";
					break;
			}
			console.log(statusColor);
			return (
				<div className={`${statusColor} font-medium text-left`}>{status}</div>
			);
		},
	},
	{
		id: "actions",
		header: () => <div>Actions</div>,
		enableHiding: false,
		cell: ({ row }) => {
			const payroll = row.original;

			return <Flex justifyContent={'flex-start'} ><Actions  singlePayroll={payroll} /></Flex>;
		},
	},
];
