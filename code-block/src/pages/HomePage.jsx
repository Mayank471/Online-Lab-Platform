import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [classCode, setClassCode] = useState('');
    const [classrooms, setClassrooms] = useState([]);
    const [showClassrooms, setShowClassrooms] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchClassrooms();
    }, []);

    const fetchClassrooms = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/classroom');
            const data = await response.json();
            setClassrooms(data);
        } catch (error) {
            console.error('Error fetching classrooms:', error);
        }
    };

    const handleJoinClick = () => {
        setIsPopupVisible(true);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
        setClassCode('');
    };

    const handleSubmit = () => {
        alert(`Class code entered: ${classCode}`);
        setIsPopupVisible(false);
        setClassCode('');
    };

    const handleViewLabs = () => {
        navigate('/classrooms');
    };

    return (
        <div className="p-6 font-sans text-base-content bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen flex flex-col items-center pt-20">
            <header className="text-center mb-10">
                <h1 className="text-5xl font-extrabold text-blue-800">Welcome to the Online Lab Platform</h1>
                <p className="text-base-content/70 mt-4 text-lg">Your gateway to interactive learning and experimentation</p>
            </header>
            <main className="w-full max-w-4xl">
                <section className="mb-12 bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-semibold text-blue-700">Explore Labs</h2>
                    <p className="text-base-content/70 mt-3 text-lg">Browse through a variety of labs and start experimenting today.</p>
                    <button className="btn btn-primary mt-6 px-6 py-3 text-lg" onClick={handleViewLabs}>View Labs</button>
                </section>
                <section className="mb-12 bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-semibold text-green-700">Join a Class</h2>
                    <p className="text-base-content/70 mt-3 text-lg">Connect with instructors and join live classes for hands-on learning.</p>
                    <button
                        className="btn btn-success mt-6 px-6 py-3 text-lg"
                        onClick={handleJoinClick}
                    >
                        Join Now
                    </button>
                </section>
            </main>

            {isPopupVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4 text-black">Enter Class Code</h3>
                        <input
                            type="text"
                            value={classCode}
                            onChange={(e) => setClassCode(e.target.value)}
                            placeholder="Enter class code"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                                onClick={handleClosePopup}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
