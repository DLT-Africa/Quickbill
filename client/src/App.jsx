import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Invoice from './components/Invoice'
import Clients from './components/Clients'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/sentinvoice' element={<Invoice/>} />
        <Route path='/clients' element={<Clients/>} />
       
      </Routes>
    </>
  )
}

export default App
