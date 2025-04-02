import React, { useState } from 'react';

const SettingsPage = () => {
    const [notifications, setNotifications] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [isAboutPopupOpen, setIsAboutPopupOpen] = useState(false);

    const toggleNotifications = () => {
        setNotifications(!notifications);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleSave = () => {
        alert('Settings saved!');
    };

    return (
        <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
            {/* Sidebar */}
            <aside className={`w-64 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'} p-6 shadow-md`}>
                <h2 className="text-xl font-bold mb-6">Settings</h2>
                <nav className="space-y-4">
                    <a href="#account" className="block hover:text-blue-500">
                        Account Settings
                    </a>
                    <a href="#notifications" className="block hover:text-blue-500">
                        Notifications
                    </a>
                    <a href="#theme" className="block hover:text-blue-500">
                        Theme
                    </a>
                    <a href="#security" className="block hover:text-blue-500">
                        Security
                    </a>
                    <a href="#about" className="block hover:text-blue-500">
                        About
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Settings</h1>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Save
                    </button>
                </header>

                <div className="space-y-8">
                    {/* Account Section */}
                    <section id="account">
                        <h2 className="text-xl font-semibold">Account</h2>
                        <p className="text-sm">Manage your account details and preferences.</p>
                        <button
                            onClick={() => setIsEditProfileOpen(true)}
                            className={`mt-2 px-4 py-2 ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'} rounded-md hover:${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
                        >
                            Edit Profile
                        </button>
                    </section>

                    {/* Notifications Section */}
                    <section id="notifications">
                        <h2 className="text-xl font-semibold">Notifications</h2>
                        <p className="text-sm">Control your notification preferences.</p>
                        <button
                            onClick={toggleNotifications}
                            className={`mt-2 px-4 py-2 rounded-md shadow ${
                                notifications
                                    ? 'bg-green-500 text-white hover:bg-green-600'
                                    : 'bg-gray-500 text-white hover:bg-gray-600'
                            }`}
                        >
                            {notifications ? 'Enabled' : 'Disabled'}
                        </button>
                    </section>

                    {/* Theme Section */}
                    <section id="theme">
                        <h2 className="text-xl font-semibold">Theme</h2>
                        <p className="text-sm">Switch between light and dark mode.</p>
                        <button
                            onClick={toggleDarkMode}
                            className={`mt-2 px-4 py-2 rounded-md shadow ${
                                darkMode
                                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                                    : 'bg-gray-500 text-white hover:bg-gray-600'
                            }`}
                        >
                            {darkMode ? 'Dark Mode' : 'Light Mode'}
                        </button>
                    </section>

                    {/* Security Section */}
                    <section id="security">
                        <h2 className="text-xl font-semibold">Security</h2>
                        <p className="text-sm">Update your password and secure your account.</p>
                        <button
                            onClick={() => setIsChangePasswordOpen(true)}
                            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Change Password
                        </button>
                    </section>

                    {/* About Section */}
                    <section id="about">
                        <h2 className="text-xl font-semibold">About</h2>
                        <p className="text-sm">Learn more about the platform and its features.</p>
                        <button
                            onClick={() => setIsAboutPopupOpen(true)}
                            className={`mt-2 px-4 py-2 ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'} rounded-md hover:${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
                        >
                            View Details
                        </button>
                    </section>
                </div>
            </main>

            {/* Edit Profile Popup */}
            {isEditProfileOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-white">
                        <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
                        <input
                            type="text"
                            placeholder="Enter new username"
                            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-gray-900"
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setIsEditProfileOpen(false)}
                                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setIsEditProfileOpen(false)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Change Password Popup */}
            {isChangePasswordOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-white">
                        <h3 className="text-xl font-semibold mb-4">Change Password</h3>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-gray-900"
                        />
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-gray-900"
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setIsChangePasswordOpen(false)}
                                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setIsChangePasswordOpen(false)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* About Popup */}
            {isAboutPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-white">
                        <h3 className="text-xl font-semibold mb-4">About the Platform</h3>
                        <p className="text-sm leading-relaxed">
                            The Online Lab Platform is a web-based application designed to facilitate coding assignments and their automated evaluation. 
                            It allows instructors (professors, teaching assistants) to create and manage assignments while enabling students to submit 
                            their code and receive instant feedback through a backend evaluation engine.
                        </p>
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={() => setIsAboutPopupOpen(false)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsPage;