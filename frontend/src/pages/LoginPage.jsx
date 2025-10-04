import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { jailerLogin } from '../api';

const LoginPage = () => {
    const [formData, setFormData] = useState({ name: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await jailerLogin(formData);
            localStorage.setItem('token', data.token);
            navigate('/');
            window.location.reload();
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed!');
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen font-mono bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 border-4 border-gray-700">
                <h1 className="text-3xl font-bold text-center text-orange-500 uppercase">Warden Login</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold tracking-widest text-gray-400">USERNAME</label>
                        <input type="text" name="name" onChange={handleChange} required className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border-2 border-gray-600 rounded-none focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold tracking-widest text-gray-400">PASSWORD</label>
                        <input type="password" name="password" onChange={handleChange} required className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border-2 border-gray-600 rounded-none focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    </div>
                    {error && <p className="text-sm text-red-400">{error}</p>}
                    <button type="submit" className="w-full py-3 font-bold text-white uppercase bg-orange-600 rounded-none hover:bg-orange-700 focus:outline-none">
                        Access Terminal
                    </button>
                </form>
                <p className="text-sm text-center text-gray-500">
                    No account? <Link to="/signup" className="font-medium text-blue-400 hover:underline">Register new Warden</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;