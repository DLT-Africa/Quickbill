import React from "react";
import SidebarWithHeader from "../components/SidebarWithHeader";
import InvoiceSummary from "../components/invoiceSummary/InvoiceSummary";

const InvoiceSummaryPage = () => {
	return (
		<SidebarWithHeader>
			<InvoiceSummary />
		</SidebarWithHeader>
	);
};

export default InvoiceSummaryPage;
