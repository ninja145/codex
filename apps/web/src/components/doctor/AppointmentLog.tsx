import React from 'react';
import {
    CheckCircleIcon,
    ClockIcon,
    StarIcon,
    EyeIcon,
    ArrowPathIcon,
    XCircleIcon
} from '@heroicons/react/24/solid';

const appointments = [
    {
        id: 1,
        patient: { name: 'Rohan Patel', phone: '9876543210', age: 34, gender: 'Male' },
        purpose: 'Fever and cough',
        notifications: {
            confirmation: { mode: 'auto', status: 'sent' },
            reminder: { mode: 'auto_toggleable', enabled: true, status: 'scheduled' },
            review: { mode: 'auto', status: 'pending' },
            seen: { mode: 'doctor_control', status: 'pending' },
            followup: { mode: 'doctor_control', enabled: false, status: 'pending' },
            cancellation: { mode: 'doctor_control', status: 'pending' },
        }
    },
    {
        id: 2,
        patient: { name: 'Priya Singh', phone: '8765432109', age: 28, gender: 'Female' },
        purpose: 'Follow-up consultation',
        notifications: {
            confirmation: { mode: 'auto', status: 'sent' },
            reminder: { mode: 'auto_toggleable', enabled: true, status: 'sent' },
            review: { mode: 'auto', status: 'pending' },
            seen: { mode: 'doctor_control', status: 'complete' },
            followup: { mode: 'doctor_control', enabled: true, status: 'scheduled' },
            cancellation: { mode: 'doctor_control', status: 'pending' },
        }
    },
];

const NotificationSwitch = ({ type, status, enabled }: { type: string, status: string, enabled?: boolean }) => {
    const iconMap = {
        confirmation: CheckCircleIcon,
        reminder: ClockIcon,
        review: StarIcon,
        seen: EyeIcon,
        followup: ArrowPathIcon,
        cancellation: XCircleIcon,
    };
    const Icon = iconMap[type as keyof typeof iconMap];

    const colorClass = status === 'sent' || status === 'complete' || status === 'scheduled' ? 'text-green-400' : 'text-gray-500';
    const disabledClass = enabled === false ? 'opacity-50' : '';

    return (
        <button className={`p-1 rounded-full hover:bg-gray-700 ${disabledClass}`}>
            <Icon className={`h-5 w-5 ${colorClass}`} />
        </button>
    );
};

const AppointmentLog = () => {
    return (
        <div className="mt-8 bg-gray-800 shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-white">Today's Appointments</h3>
            </div>
            <div className="border-t border-gray-700">
                <ul role="list" className="divide-y divide-gray-700">
                    {appointments.map((appointment) => (
                        <li key={appointment.id} className="p-4 hover:bg-gray-700/50">
                            <div className="flex items-center justify-between">
                                <p className="text-md font-medium text-indigo-400 truncate">{appointment.patient.name}</p>
                                <div className="ml-2 flex-shrink-0 flex space-x-1">
                                    <NotificationSwitch type="confirmation" {...appointment.notifications.confirmation} />
                                    <NotificationSwitch type="reminder" {...appointment.notifications.reminder} />
                                    <NotificationSwitch type="seen" {...appointment.notifications.seen} />
                                    <NotificationSwitch type="followup" {...appointment.notifications.followup} />
                                    <NotificationSwitch type="review" {...appointment.notifications.review} />
                                    <NotificationSwitch type="cancellation" {...appointment.notifications.cancellation} />
                                </div>
                            </div>
                            <div className="mt-1">
                                <p className="text-sm text-gray-400">
                                    {appointment.patient.phone} &bull; {appointment.patient.age}y {appointment.patient.gender} &bull; {appointment.purpose}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AppointmentLog;
