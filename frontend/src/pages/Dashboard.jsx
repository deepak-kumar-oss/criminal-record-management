import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCriminals, createCriminal, deleteCriminal } from '../api';

const Dashboard = () => {
    const [criminals, setCriminals] = useState([]);
    const [filteredCriminals, setFilteredCriminals] = useState([]); // State for search results
    const [searchTerm, setSearchTerm] = useState(''); // State for search input
    const [formData, setFormData] = useState({ name: '', age: '', crime: '', sentence: '', jailLocation: '', dateOfArrest: '' });
    const navigate = useNavigate();

    // Fetch all criminals once on component mount
    useEffect(() => {
        const fetchCriminals = async () => {
            try {
                const { data } = await getCriminals();
                setCriminals(data);
                setFilteredCriminals(data); // Initially, filtered list is the full list
            } catch (error) {
                console.error("Failed to fetch criminals", error);
            }
        };
        fetchCriminals();
    }, []);

    // Effect to filter criminals whenever searchTerm changes
    useEffect(() => {
        const results = criminals.filter(criminal =>
            criminal.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCriminals(results);
    }, [searchTerm, criminals]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await createCriminal(formData);
            // Add new criminal to the top of the list
            setCriminals([data.criminal, ...criminals]);
            setFormData({ name: '', age: '', crime: '', sentence: '', jailLocation: '', dateOfArrest: '' });
        } catch (error) {
            console.error("Failed to create criminal", error);
        }
    };
    
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            try {
                await deleteCriminal(id);
                 // Remove the deleted criminal from the state
                setCriminals(criminals.filter(c => c._id !== id));
            } catch (error) {
                console.error("Failed to delete criminal", error);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        window.location.reload();
    };

    return (
        <div className="container p-4 mx-auto font-mono md:p-8">
             <header className="flex flex-col items-center justify-between gap-4 mb-8 md:flex-row">
                <h1 className="text-4xl font-bold tracking-wider text-orange-500 uppercase">INMATE DATABASE</h1>
                <button onClick={handleLogout} className="px-4 py-2 font-semibold text-white bg-red-700 border-2 border-red-900 rounded-none hover:bg-red-800">LOGOUT</button>
            </header>
            
            {/* Search Bar */}
            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 text-lg text-white placeholder-gray-500 bg-gray-800 border-2 border-gray-600 focus:outline-none focus:border-orange-500"
                />
            </div>

            {/* Add Criminal Form */}
            <div className="p-6 mb-8 bg-gray-800 border-2 border-gray-700">
                <h2 className="mb-4 text-2xl font-bold text-gray-300">NEW INMATE RECORD</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="p-2 text-white bg-gray-700 border border-gray-600 rounded-none focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required className="p-2 text-white bg-gray-700 border border-gray-600 rounded-none focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    <input type="text" name="crime" value={formData.crime} onChange={handleChange} placeholder="Crime" required className="p-2 text-white bg-gray-700 border border-gray-600 rounded-none focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    <input type="text" name="sentence" value={formData.sentence} onChange={handleChange} placeholder="Sentence" required className="p-2 text-white bg-gray-700 border border-gray-600 rounded-none focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    <input type="text" name="jailLocation" value={formData.jailLocation} onChange={handleChange} placeholder="Cell Block" required className="p-2 text-white bg-gray-700 border border-gray-600 rounded-none focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    <input type="date" name="dateOfArrest" value={formData.dateOfArrest} required className="p-2 text-white bg-gray-700 border border-gray-600 rounded-none focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    <button type="submit" className="px-4 py-2 font-bold text-white uppercase bg-blue-700 border-2 border-blue-900 rounded-none md:col-span-3 hover:bg-blue-800">Add Record</button>
                </form>
            </div>

            {/* Criminals List */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCriminals.map((criminal) => (
                    <div key={criminal._id} className="p-5 overflow-hidden bg-gray-800 border-2 border-gray-700 shadow-lg">
                        <div className="p-2 mb-4 -m-5 text-xl font-bold text-center text-black uppercase bg-orange-500">{criminal.name}</div>
                        <p className="text-gray-300"><span className="font-semibold text-gray-500">AGE:</span> {criminal.age}</p>
                        <p className="mt-2 text-gray-300"><span className="font-semibold text-gray-500">CRIME:</span> {criminal.crime}</p>
                        <p className="text-gray-300"><span className="font-semibold text-gray-500">SENTENCE:</span> {criminal.sentence}</p>
                        <p className="text-gray-300"><span className="font-semibold text-gray-500">CELL BLOCK:</span> {criminal.jailLocation}</p>
                        <p className="mt-2 text-sm text-gray-500">DATE OF ARREST: {new Date(criminal.dateOfArrest).toLocaleDateString()}</p>
                        <div className="flex justify-end pt-4 mt-4 space-x-2 border-t border-gray-700">
                            <button className="px-3 py-1 text-sm font-bold text-black uppercase bg-yellow-500 rounded-none hover:bg-yellow-600">Edit</button>
                            <button onClick={() => handleDelete(criminal._id)} className="px-3 py-1 text-sm font-bold text-white uppercase bg-red-700 rounded-none hover:bg-red-800">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;