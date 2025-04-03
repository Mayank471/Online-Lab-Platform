import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';

const ClassroomPage = () => {
    const [assignments, setAssignments] = useState({ active: [], missed: [], completed: [] });
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('active');
    const { classroomId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAssignments();
    }, [classroomId]);

    const fetchAssignments = async () => {
        try {
            const response = await axiosInstance.get(`/classroom/${classroomId}/assignments`);
            setAssignments(response.data);
        } catch (error) {
            console.error('Error fetching assignments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAssignmentClick = (assignmentId) => {
        navigate(`/assignment/${assignmentId}`);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="p-6 pt-24">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <button onClick={() => navigate('/classrooms')} className="btn btn-ghost">
                        Back to Classrooms
                    </button>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setActiveFilter('active')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                activeFilter === 'active' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}
                        >
                            Active ({assignments.active.length})
                        </button>
                        <button 
                            onClick={() => setActiveFilter('missed')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                activeFilter === 'missed' 
                                    ? 'bg-red-600 text-white' 
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}
                        >
                            Missed ({assignments.missed.length})
                        </button>
                        <button 
                            onClick={() => setActiveFilter('completed')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                activeFilter === 'completed' 
                                    ? 'bg-green-600 text-white' 
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}
                        >
                            Completed ({assignments.completed.length})
                        </button>
                    </div>
                </div>

                <section className="mb-8">
                    <div className="grid gap-4">
                        {assignments[activeFilter].map((assignment) => (
                            <div
                                key={assignment._id}
                                onClick={() => handleAssignmentClick(assignment._id)}
                                className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gray-200"
                            >
                                <h3 className="font-semibold text-lg mb-2 text-gray-900">{assignment.assignmentName}</h3>
                                <p className="text-gray-600 mb-3">{assignment.description}</p>
                                <p className="text-sm text-gray-500">
                                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                        {assignments[activeFilter].length === 0 && (
                            <div className="text-center p-8 text-gray-500">
                                No {activeFilter} assignments found
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ClassroomPage;
