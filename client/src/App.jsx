import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AuthPage from './pages/AuthPage'
import LoginCard from './components/LoginCard'
import SignUpCard from "./components/SignUpCard";


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        
        <Route path='/auth' element={<AuthPage />} />
        <Route path="/login" component={<LoginCard />} />
        <Route path="/signup" component={<SignUpCard />} />
      </Routes>
    </>
  )
}

export default App
