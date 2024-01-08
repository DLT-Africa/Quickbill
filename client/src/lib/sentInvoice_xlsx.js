import { format } from "date-fns";
import xlsx from "json-as-xlsx";
// import { people } from "@/people";

export function downloadToExcel(data) {
	let columns = [
		{
			sheet: "Persons",
			columns: [
				{
					label: "Invoice No",
					value: (row) => row.invoiceNumber.toString().padStart(3, "0"),
				},
				{ label: "Client", value: "client.name" },
				{ label: "Currency", value: "currency" },
				{ label: "Initial Amount", value: "grandTotal" },
				{ label: "Amount Due", value: "remainingAmount" },
				{
          label: "Due Date",
					value: (row) => format(row.dueDate, "dd/MM/yyyy"),
				},
        { label: "Status", value: "invoiceStatus" },
			],
			content: data,
		},
	];

	let settings = {
		fileName: "Sent Invoices Excel",
	};

	xlsx(columns, settings);
}
