import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import InvoiceMe from './pages/InvoiceMe';
import BillPage from './pages/BillPage'
import Dashboard from "./pages/Dashboard";
import AboutPage from './pages/AboutPage'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/invoice-me' element={<InvoiceMe />} /> 
        <Route path='/about' element={<AboutPage/>} />
				<Route path="/dashboard" element={<Dashboard />} />
        <Route path='/bills' element={<BillPage />} /> 
      </Routes>
    </>
  )
  }

  export default App

