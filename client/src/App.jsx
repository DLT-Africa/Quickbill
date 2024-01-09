import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import SentInvoicesPage from "./pages/SentInvoicesPage";
import InvoiceMePage from "./pages/InvoiceMePage";
import BillPage from "./pages/BillPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CreateInvoicePage from "./pages/CreateInvoicePage";
import EmployeesPage from "./pages/EmployeesPage";
import PayrollPage from "./pages/PayrollPage";
import InvoiceSummaryPage from "./pages/InvoiceSummaryPage";
import ActivatePage from "./components/authentications/ActivatePage";
import ProfilePage from "./pages/ProfilePage";
import CreatePayrollPage from "./pages/CreatePayrollPage";
import AccountConfirmation from "./components/authentications/AccountConfirmation";
import LinkExpired from "./components/authentications/LinkExpired";
import DashboardPage from "./pages/DashboardPage";
import ClientsPage from "./pages/ClientsPage";
import GoogleAuth from "./components/authentications/GoogleAuth";
import Payrolls from "./components/payrolls/Payrolls";
import PageNotFound from "./pages/PageNotFound";



function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/test" element={<Payrolls />} />
				<Route path="/auth" element={<AuthPage />} />
				<Route path="/auth/google-verify" element={<GoogleAuth />} />
				<Route path="/confirm-email" element={<AccountConfirmation />} />
				<Route path="/link-expired/" element={<LinkExpired />} />
				<Route path="/verify-access/:token" element={<ActivatePage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/contact" element={<ContactPage />} />
				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="/clients" element={<ClientsPage />} />
				<Route path="/invoices/create" element={<CreateInvoicePage />} />
				<Route
					path="/invoices/create/:encodedToken"
					element={<CreateInvoicePage />}
				/>
				<Route path="/invoices/sent" element={<SentInvoicesPage />} />
				<Route path="/invoices/:invoiceId" element={<InvoiceSummaryPage />} />
				<Route path="/bills" element={<BillPage />} />
				<Route path="/employees" element={<EmployeesPage />} />
				<Route path="/payrolls" element={<PayrollPage />} />
				<Route path="/payrolls/create" element={<CreatePayrollPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/invoice-me" element={<InvoiceMePage />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</>
	);
}

export default App;
