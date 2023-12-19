import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Invoice from './components/SentInvoice'
import Clients from './components/Clients'
import SentInvoice from './components/SentInvoice'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/sentinvoice' element={<SentInvoice/>} />
        <Route path='/clients' element={<Clients/>} />
       
      </Routes>
    </>
  )
}

export default App
