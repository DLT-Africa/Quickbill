import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AuthPage from "./pages/AuthPage";
import LoginCard from "./components/LoginCard";
import SignUpCard from "./components/SignUpCard";
import Clients from "./components/Clients";
import SentInvoice from "./components/SentInvoice";
import InvoiceMe from "./pages/InvoiceMe";
import BillPage from "./pages/BillPage";
import Dashboard from "./pages/Dashboard";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CreateInvoicePage from "./pages/CreateInvoicePage";
import EmployeesPage from "./pages/EmployeesPage"
import NotFoundPage from "./pages/NotFoundPage";
import PayrollPage from "./pages/PayrollPage";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" component={<LoginCard />} />
        <Route path="/signup" component={<SignUpCard />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/invoice-me" element={<InvoiceMe />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-invoice" element={<CreateInvoicePage />} />
        <Route path='/sent-invoices' element={<SentInvoice />} />
        <Route path='/bills' element={<BillPage />} />
        <Route path='/clients' element={<Clients />} />
        <Route path='/employees' element={<EmployeesPage />} />
        <Route path='/payroll' element={<PayrollPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
