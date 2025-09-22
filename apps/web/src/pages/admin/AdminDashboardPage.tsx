import React from 'react';

const AdminDashboardPage = () => {
    return (
        <div className="bg-gray-900 text-white min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Placeholder Cards */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-amber-400">Manage Doctors</h2>
                    <p className="mt-2 text-gray-300">View, edit, and manage all doctor accounts.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-amber-400">Manage Bookings</h2>
                    <p className="mt-2 text-gray-300">Oversee all bookings and resolve issues.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-amber-400">Manage BAs</h2>
                    <p className="mt-2 text-gray-300">Manage Business Associate accounts and performance.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-amber-400">Manage Features & Pricing</h2>
                    <p className="mt-2 text-gray-300">Configure subscription tiers, features, and add-ons.</p>
                </div>
                 <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-amber-400">Content Management</h2>
                    <p className="mt-2 text-gray-300">Upload tutorial videos, manage banners, etc.</p>
                </div>
                 <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-amber-400">Razorpay Keys</h2>
                    <p className="mt-2 text-gray-300">Manage Razorpay API keys.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg col-span-1 md:col-span-2">
                    <h2 className="text-xl font-semibold text-amber-400">Reports & Analytics</h2>
                    <p className="mt-2 text-gray-300">View platform-wide reports and analytics.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg col-span-1 md:col-span-2 lg:col-span-4">
                    <h2 className="text-xl font-semibold text-amber-400">Audit Logs</h2>
                    <p className="mt-2 text-gray-300">View a log of all critical actions performed on the platform.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
