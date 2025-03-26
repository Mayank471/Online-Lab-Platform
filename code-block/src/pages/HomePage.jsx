import React from 'react';

const HomePage = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#000' }}>
            <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1>Welcome to the Online Lab Platform</h1>
                <p>Your gateway to interactive learning and experimentation</p>
            </header>
            <main>
                <section style={{ marginBottom: '20px' }}>
                    <h2>Explore Labs</h2>
                    <p>Browse through a variety of labs and start experimenting today.</p>
                    <button style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px' }}>View Labs</button>
                </section>
                <section style={{ marginBottom: '20px' }}>
                    <h2>Join a Class</h2>
                    <p>Connect with instructors and join live classes for hands-on learning.</p>
                    <button style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#28A745', color: '#fff', border: 'none', borderRadius: '5px' }}>Join Now</button>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
