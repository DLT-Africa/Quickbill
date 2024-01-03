import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import Clients from "./components/Clients";
import SentInvoicesPage from "./pages/SentInvoicesPage";
import InvoiceMePage from "./pages/InvoiceMePage";
import BillPage from "./pages/BillPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CreateInvoicePage from "./pages/CreateInvoicePage";
import EmployeesPage from "./pages/EmployeesPage";
import NotFoundPage from "./pages/NotFoundPage";
import PayrollPage from "./pages/PayrollPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import InvoiceSummaryPage from "./pages/InvoiceSummaryPage";
import ActivatePage from "./components/ActivatePage";
import ProfilePage from "./pages/ProfilePage";
import CreatePayrollPage from "./pages/CreatePayrollPage";
import AccountConfirmation from "./components/AccountConfirmation";
import LinkExpired from "./components/LinkExpired";
import DashboardPage from "./pages/DashboardPage";
import ClientsPage from "./pages/ClientsPage";

function App() {
  const user = useRecoilValue(userAtom) 
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/auth" element={<AuthPage />} />
				<Route path="/confirm-email" element={<AccountConfirmation />} />
				<Route path="/link-expired/" element={<LinkExpired />} />
				<Route path="/verify-access/:token" element={<ActivatePage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/contact" element={<ContactPage />} />
				<Route
					path="/dashboard" element={user? <DashboardPage /> :  <Navigate to='/auth'/>}
				/>
				<Route path="/clients" element={<ClientsPage />} />
				<Route path="/invoices/create" element={<CreateInvoicePage />} />
				<Route path="/invoices/create/:encodedToken" element={<CreateInvoicePage />} />
				<Route path="/invoices/sent" element={<SentInvoicesPage />} />
				<Route path="/invoices/:invoiceId" element={<InvoiceSummaryPage />} />
				<Route path="/bills" element={<BillPage />} />
				<Route path="/employees" element={<EmployeesPage />} />
				<Route path="/payrolls" element={<PayrollPage />} />
				<Route path="/payrolls/create" element={<CreatePayrollPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				{/* <Route path="/account-activated" element={<ActivatePage />} /> */}
				<Route path="/invoice-me" element={<InvoiceMePage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</>
	);
}

export default App;
