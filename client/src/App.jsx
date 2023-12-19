import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import InvoicePage from './pages/InvoicePage'
import BillPage from './pages/BillPage'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/invoice' element={<InvoicePage />} /> 
        <Route path='/bill' element={<BillPage />} /> 
      </Routes>
    </>
  )
}

export default App
