import React from 'react';

const HomePage = () => {
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
                    <button className="btn btn-primary mt-6 px-6 py-3 text-lg">View Labs</button>
                </section>
                <section className="mb-12 bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-semibold text-green-700">Join a Class</h2>
                    <p className="text-base-content/70 mt-3 text-lg">Connect with instructors and join live classes for hands-on learning.</p>
                    <button className="btn btn-success mt-6 px-6 py-3 text-lg">Join Now</button>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
