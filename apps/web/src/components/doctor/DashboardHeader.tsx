import React from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const DashboardHeader = () => {
    // Placeholder data
    const doctor = {
        name: 'Dr. Anjali Sharma',
        degree: 'MBBS, MD',
        specialty: 'General Physician',
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    };
    const tier = {
        name: 'Growth',
        progress: 78,
        total: 100,
        validity: '25 Aug 2023 - 24 Sep 2023',
    };

    return (
        <header className="w-full">
            <div className="relative z-10 flex-shrink-0 h-16 bg-gray-800 border-b border-gray-700 shadow-sm flex">
                <div className="flex-1 flex justify-between px-4 sm:px-6">
                    <div className="flex-1 flex items-center">
                        {/* Profile */}
                        <img className="h-10 w-10 rounded-full" src={doctor.imageUrl} alt="" />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-white">{doctor.name}</p>
                            <p className="text-xs font-medium text-gray-400">{doctor.degree} &bull; {doctor.specialty}</p>
                        </div>
                    </div>

                    <div className="ml-4 flex items-center md:ml-6">
                        {/* Tier Progress */}
                        <div className="flex items-center">
                            <div>
                                <p className="text-sm font-medium text-white">
                                    {tier.name} Plan: <span className="text-indigo-400">{tier.progress}/{tier.total}</span> bookings
                                </p>
                                <p className="text-xs text-gray-400">Validity: {tier.validity}</p>
                            </div>
                             <button
                                type="button"
                                className="ml-4 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700"
                            >
                                Upgrade
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
