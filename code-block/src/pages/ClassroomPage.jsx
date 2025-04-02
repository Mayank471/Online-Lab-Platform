import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClassroomPage = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const navigateToActiveAssignments = () => {
        navigate('/active-assignments'); // Navigate to ActiveAssignmentsPage
    };

    const navigateToMissedAssignments = () => {
        navigate('/missed-assignments'); // Navigate to MissedAssignmentsPage
    };

    const navigateToCompletedAssignments = () => {
        navigate('/completed-assignments'); // Navigate to CompletedAssignmentsPage
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#000' }}>
            <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1>Classroom</h1>
                <p>Access your assignments and start learning.</p>
            </header>
            <main>
                <section>
                    <h2>Assignments</h2>
                    <div style={{ marginBottom: '20px' }}>
                        <button 
                            onClick={navigateToActiveAssignments} 
                            style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', marginRight: '10px' }}
                        >
                            Active Assignments
                        </button>
                        <button 
                            onClick={navigateToMissedAssignments} 
                            style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', marginRight: '10px' }}
                        >
                            Missed Assignments
                        </button>
                        <button 
                            onClick={navigateToCompletedAssignments} 
                            style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px' }}
                        >
                            Completed Assignments
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ClassroomPage;
