import { format } from "date-fns";
import xlsx from "json-as-xlsx";
// import { people } from "@/people";

export function downloadToExcel(data) {
	let columns = [
		{
			sheet: "Persons",
			columns: [
				{
					label: "Name",
					value: "employeeId.name",
				},
				{ label: "Department", value: "employeeId.department" },
				{ label: "Job Title", value: "employeeId.jobTitle" },
				{ label: "Currency", value: "currency" },
				{ label: "Salary", value: "salary" },
				{
					label: "Payment Date",
					value: (row) => {
						if (row.paymentDate) {
							return format(row.paymentDate, "dd/MM/yyyy");
						} else {
							return "--";
                        }
					},
				},
				{ label: "Status", value: "paymentStatus" },
			],
			content: data,
		},
	];

	let settings = {
		fileName: "Payrolls Excel",
	};

	xlsx(columns, settings);
}
