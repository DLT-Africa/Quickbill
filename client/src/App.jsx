import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AuthPage from "./pages/AuthPage";
import Clients from "./components/Clients";
import SentInvoicesPage from "./pages/SentInvoicesPage";
import InvoiceMe from "./pages/InvoiceMe";
import BillPage from "./pages/BillPage";
import Dashboard from "./pages/Dashboard";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CreateInvoicePage from "./pages/CreateInvoicePage";
import EmployeesPage from "./pages/EmployeesPage";
import NotFoundPage from "./pages/NotFoundPage";
import PayrollPage from "./pages/PayrollPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import ConfirmEmail from "./components/ConfirmEmail";
import InvoiceSummaryPage from "./pages/InvoiceSummaryPage";

function App() {
  const user = useRecoilValue(userAtom) 
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/auth" element={<AuthPage />} />
				<Route path="/confirm-email" element={<ConfirmEmail />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/contact" element={<ContactPage />} />
				<Route
					path="/dashboard" element={user? <Dashboard /> :  <Navigate to='/auth'/>}
				/>
				<Route path="/clients" element={<Clients />} />
				<Route path="/invoices/create" element={<CreateInvoicePage />} />
				<Route path="/invoices/sent" element={<SentInvoicesPage />} />
				<Route path="/invoices/:invoiceId" element={<InvoiceSummaryPage />} />
				<Route path="/bills" element={<BillPage />} />
				<Route path="/employees" element={<EmployeesPage />} />
				<Route path="/payroll" element={<PayrollPage />} />
				<Route path="/invoice-me" element={<InvoiceMe />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</>
	);
}

export default App;
