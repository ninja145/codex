import React from 'react';
import { HomeIcon, PresentationChartBarIcon, UserCircleIcon, CogIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/ba/dashboard', icon: HomeIcon },
  { name: 'Reports', href: '/ba/reports', icon: PresentationChartBarIcon },
  { name: 'Profile', href: '/ba/profile', icon: UserCircleIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const BaSidebar = ({ baName = 'BA Name' }) => {
    const location = useLocation();

    return (
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            <div className="flex flex-col flex-grow pt-5 bg-gray-800 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                    <h1 className="text-2xl font-bold text-white">Veziit BA</h1>
                </div>
                <div className="mt-5 flex-1 flex flex-col">
                    <nav className="flex-1 px-2 pb-4 space-y-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={classNames(
                                    location.pathname.startsWith(item.href) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                )}
                            >
                                <item.icon
                                    className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-300"
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
                 <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
                    <div className="flex-shrink-0 w-full group block">
                        <div className="flex items-center">
                             <div>
                                <img className="inline-block h-9 w-9 rounded-full" src="https://via.placeholder.com/150" alt="" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-white">{baName}</p>
                                <p className="text-xs font-medium text-gray-400 group-hover:text-gray-300">View profile</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BaSidebar;
