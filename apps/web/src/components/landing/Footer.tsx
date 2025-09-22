import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const navigation = {
        company: [
            { name: 'About', href: '#' },
            { name: 'Careers', href: '#' },
            { name: 'Contact', href: '#' },
        ],
        legal: [
            { name: 'Privacy Policy', href: '#' },
            { name: 'Terms of Service', href: '#' },
        ],
        partners: [
            { name: 'Join as BA', href: '/signup?role=ba' }, // Example of a signup link for BAs
            { name: 'BA Login', href: '/login?role=ba' },
        ],
        admin: [
            { name: 'Admin Panel', href: '/login?role=admin' },
        ]
    }

    return (
        <footer className="bg-gray-900 border-t border-white/10" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="max-w-7xl mx-auto py-12 px-6 lg:py-16 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                        <h1 className="text-3xl font-bold text-white">Veziit</h1>
                        <p className="text-gray-400 text-base">
                            The future of healthcare management.
                        </p>
                    </div>
                    <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.company.map((item) => (
                                        <li key={item.name}>
                                            <Link to={item.href} className="text-sm leading-6 text-gray-400 hover:text-white">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.legal.map((item) => (
                                        <li key={item.name}>
                                            <Link to={item.href} className="text-sm leading-6 text-gray-400 hover:text-white">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                             <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">Partners</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.partners.map((item) => (
                                        <li key={item.name}>
                                            <Link to={item.href} className="text-sm leading-6 text-gray-400 hover:text-white">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">Admin</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.admin.map((item) => (
                                        <li key={item.name}>
                                            <Link to={item.href} className="text-sm leading-6 text-gray-400 hover:text-white">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-white/10 pt-8">
                    <p className="text-base text-gray-400 xl:text-center">&copy; {new Date().getFullYear()} Veziit. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
