import React from "react";

import Actions from "./Actions";

export const columns = [

	{
		header: "Name",
		accessorKey: "name",
        cell: ({ row }) => <div className="capitalize font-medium text-left">{row.getValue("name")}</div>,

	},
	{
		header: () => <div >Email</div>,
		accessorKey: "email",
		cell: ({ row }) => {
			
			return <div className="font-medium text-left">{row.getValue("email")}</div>;
		},
	},
	{
		header: () => <div >Address</div>,
		accessorKey: "address",
		cell: ({ row }) => {
			return <div className="font-medium text-left">{row.getValue("address")}</div>;
		},
	},
	
	{
		id: "actions",
		header: () => <div >Actions</div>,
		enableHiding: false,
		cell: ({ row }) => {
		  const client = row.original
	 
		  return (
			<Actions client={client}/>
		  )
		},
	  },
	
];
