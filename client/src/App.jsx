import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Dashboard from "./pages/Dashboard";
import AboutPage from './pages/AboutPage'

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
        <Route path='/about' element={<AboutPage/>} />
				<Route path="/dashboard" element={<Dashboard />} />
				
			</Routes>
		</>
	);
}

export default App;
