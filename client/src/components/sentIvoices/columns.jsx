import React from "react";
import { Button } from "@/components/ui/button";

import { CaretSortIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

export const columns = [
	{
		accessorKey: "invoiceNumber",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Invoice No.
					<CaretSortIcon className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="pl-4 text-left" >{row.getValue("invoiceNumber").toString().padStart(3, "0")}</div>
		),
	},

	{
		header: "Client",
		accessorKey: "client.name",
        cell: ({ row }) => <div className="capitalize font-medium text-left">{row.getValue("client_name")}</div>,

	},
	{
		header: () => <div >Initial Amount</div>,
		accessorKey: "grandTotal",
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("grandTotal"));
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
		header: () => <div >Amount Due</div>,
		accessorKey: "remainingAmount",
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("remainingAmount"));
			const currency = row.original.currency;
			console.log(currency)

			// Format the amount as a dollar amount
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: currency
			})?.format(amount);

			return <div className="font-medium text-left">{formatted}</div>;
		},
	},
	{
		header: "Due Date",
		accessorKey: "dueDate",
		cell: ({ row }) => {
			const due_date = row.getValue("dueDate");
			const formatted = format(due_date, "dd/MM/yyyy");
			return <div className="font-medium text-left">{formatted}</div>;
		},
	},

	{
		header: "Status",
		accessorKey: "invoiceStatus",
		cell: ({ row }) => {
			const status = row.original.invoiceStatus;

			let statusColor = "text-[#E0BF00]"
			switch (status) {
				case "Partially Paid":
					statusColor = "text-[#7d85f5]";
					break;
				case "Paid":
					statusColor = "text-green-700";
					break;
				case "Rejected":
					statusColor = "text-red-700";
					break;
				case "Overdue":
					statusColor = "text-[#E40DC4]";
					break;
			}
			console.log(statusColor)
			return <div className={`${statusColor} font-medium text-left`}>{status}</div>;
		},
	},
];
