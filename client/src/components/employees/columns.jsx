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
		header: () => <div >Department</div>,
		accessorKey: "department",
		cell: ({ row }) => {
			return <div className="font-medium text-left">{row.getValue("department")}</div>;
		},
	},
	{
		header: () => <div >Job Title</div>,
		accessorKey: "jobTitle",
		cell: ({ row }) => {
			return <div className="font-medium text-left">{row.getValue("jobTitle")}</div>;
		},
	},
	
	{
		id: "actions",
		header: () => <div >Actions</div>,
		enableHiding: false,
		cell: ({ row }) => {
		  const employee = row.original
	 
		  return (
			<Actions employee={employee}/>
		  )
		},
	  },
	
];
