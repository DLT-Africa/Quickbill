import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Clients from "./components/Clients";
import SentInvoice from "./components/SentInvoice";
import InvoiceMe from "./pages/InvoiceMe";
import BillPage from "./pages/BillPage";
import Dashboard from "./pages/Dashboard";
import AboutPage from "./pages/AboutPage";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />

				<Route path="/invoice-me" element={<InvoiceMe />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/sentinvoice" element={<SentInvoice />} />
				<Route path="/clients" element={<Clients />} />
				<Route path="/bills" element={<BillPage />} />
			</Routes>
		</>
	);
}

export default App;
