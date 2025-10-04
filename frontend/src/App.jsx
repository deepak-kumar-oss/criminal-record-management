import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';

function App() {
    const token = localStorage.getItem('token');

    return (
        <Router>
            <div className="bg-gray-900 min-h-screen text-white">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route 
                        path="/" 
                        element={token ? <Dashboard /> : <Navigate to="/login" />} 
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;