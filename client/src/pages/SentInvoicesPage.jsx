import SentInvoiceTable from "@/components/sentIvoicesTable/SentInvoiceTable";
import SentInvoice from "../components/SentInvoice";
import SidebarWithHeader from "../components/SidebarWithHeader";

const SentInvoicesPage = () => {
	return (
		<SidebarWithHeader>
			<SentInvoiceTable />{" "}
		</SidebarWithHeader>
	);
};

export default SentInvoicesPage;
