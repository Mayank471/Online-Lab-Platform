import React, { useState } from 'react';

const SettingsPage = () => {
    const [notifications, setNotifications] = useState(false);

    const handleSave = () => {
        alert('Settings saved!');
    };

    const toggleNotifications = () => {
        setNotifications(!notifications);
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Settings</h1>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700">
                        Username:
                        <input
                            type="text"
                            placeholder="Enter your username"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">
                        Email:
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">
                        Change Password:
                        <input
                            type="password"
                            placeholder="Enter new password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">
                        Notifications:
                        <button
                            type="button"
                            onClick={toggleNotifications}
                            className={`mt-1 px-4 py-2 font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                notifications
                                    ? 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500'
                                    : 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500'
                            }`}
                        >
                            {notifications ? 'On' : 'Off'}
                        </button>
                    </label>
                </div>
                <button
                    type="button"
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Save Settings
                </button>
            </form>
        </div>
    );
};

export default SettingsPage;