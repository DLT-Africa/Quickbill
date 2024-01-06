import React, { useState } from "react";
import {
	CaretSortIcon,
	ChevronDownIcon,
	DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { downloadToExcel } from "@/lib/sentInvoice_xlsx";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button as Chakrabutton, Flex, Select, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function DataTable({ columns, data }) {
	const [sorting, setSorting] = useState([]);
	const [columnFilters, setColumnFilters] = useState([]);
	const [columnVisibility, setColumnVisibility] = useState({});
	const [rowSelection, setRowSelection] = useState({});
	const navigate = useNavigate();

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});
	let currentPage = table.options.state.pagination.pageIndex + 1;
	if (!data.length) return null;

	return (
		<div className="w-full">
			<div className="flex justify-end">
				<Button
					onClick={() => downloadToExcel(data)}
					fontSize={"xs"}
					bg={"green"}
					color={"white"}
					className=" bg-green-600 hover:bg-green-800 "
				>
					Export as Excel
				</Button>
			</div>
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter names..."
					value={table.getColumn("client_name")?.getFilterValue() || ""}
					onChange={(event) =>
						table.getColumn("client_name")?.setFilterValue(event.target.value)
					}
					className="max-w-sm mr-4"
				/>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								const columnNames = {
									invoiceNumber: "Invoice Number",
									client_name: "Client Name",
									grandTotal: "Initial Amount",
									remainingAmount: "Due Amount",
									dueDate: "Due Date",
									invoiceStatus: "Invoice Status",
								};

								let columnName = columnNames[column.id] || column.id;

								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{columnName}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader className="bg-[#e6e5e3]">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead className="text-md" key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									className="cursor-pointer"
									onClick={() => navigate(`/invoices/${row.original._id}`)}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				{/* <div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div> */}
				<div className="space-x-2">
					{/* <Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button> */}

					<div className="flex gap-2">
						<Button
							onClick={() => table.setPageIndex(0)}
							disabled={!table.getCanPreviousPage()}
						>
							{"<<"}
						</Button>
						<Button
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							Prev
						</Button>
						<Button
							onClick={(e) =>
								table.setPageIndex(Number(e.target.innerText) - 1)
							}
							// disabled={!table.getCanPreviousPage()}
							className={currentPage === 1 ? "bg-slate-950" : "bg-slate-700"}
						>
							{currentPage < 4 ? 1 : currentPage - 1}
						</Button>
						<Button
							onClick={(e) =>
								table.setPageIndex(Number(e.target.innerText) - 1)
							}
							disabled={currentPage === 1 && !table.getCanPreviousPage()}
							className={
								currentPage === 2 || currentPage > 3
									? "bg-slate-950"
									: "bg-slate-700"
							}
						>
							{currentPage < 4 ? 2 : currentPage}
						</Button>
						<Button
							onClick={(e) =>
								table.setPageIndex(Number(e.target.innerText) - 1)
							}
							disabled={currentPage !== 3 && !table.getCanNextPage()}
							className={currentPage === 3 ? "bg-slate-950" : "bg-slate-700"}
						>
							{currentPage < 4 ? 3 : currentPage + 1}
						</Button>
						<Button
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							Next
						</Button>
						<Button
							onClick={() => table.setPageIndex(table.getPageCount() - 1)}
							disabled={!table.getCanNextPage()}
						>
							{">>"}
						</Button>
					</div>

					{/* <Text mt={3} textAlign={'center'}> You are on page {currentPage}/{table.getPageCount()}</Text> */}
					<Flex justifyContent={"center"} alignItems={"center"} gap={3} mt={4}>
						<Text>Invoices per page:</Text>{" "}
						<Select
							value={table.options.state.pagination.pageSize}
							onChange={(e) => table.setPageSize(e.target.value)}
							w={70}
							cursor={"pointer"}
						>
							{[10, 25, 50].map((pageSizeEl) => {
								return (
									<option key={pageSizeEl} value={pageSizeEl}>
										{pageSizeEl}
									</option>
								);
							})}
						</Select>
					</Flex>
					{/* <hr />
					<ul>
						<li>
							You are on page number:{" "}
							{table.options.state.pagination.pageIndex + 1}
						</li>
						<li>Total pages: {table.getPageCount()}</li>
					</ul>
					<hr />
					<input
						type="number"
						defaultValue={table.options.state.pagination.pageIndex + 1}
						onChange={(e) => table.setPageIndex(e.target.value - 1)}
					/>
					<hr />
					<h4>Current page size: {table.options.state.pagination.pageSize}</h4> */}
				</div>
			</div>
		</div>
	);
}

export default DataTable;
