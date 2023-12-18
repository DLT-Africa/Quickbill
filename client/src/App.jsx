import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AboutPage from './pages/AboutPage'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage/>} />
      </Routes>
    </>
  )
}

export default App
