import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ClassroomsPage = () => {
    const [classrooms, setClassrooms] = useState([]);
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

    return (
        <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center mb-6">
                    <button 
                        onClick={() => navigate('/')}
                        className="btn btn-ghost text-blue-700 mr-4"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>
                    <h1 className="text-3xl font-bold text-blue-800">Available Laboratories</h1>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classrooms.map((classroom) => (
                        <div key={classroom._id} className="bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow duration-300 p-6">
                            <h4 className="text-xl font-semibold text-blue-700 mb-2">{classroom.classroomName}</h4>
                            <p className="text-gray-600 mb-4">{classroom.description}</p>
                            <div className="flex flex-col space-y-2">
                                <div className="flex items-center text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                    </svg>
                                    <span>Code: {classroom.classroomCode}</span>
                                </div>
                                <div className="flex items-center text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    <span>Students: {classroom.enrolledStudents.length}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClassroomsPage;
