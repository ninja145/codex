import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

const tiers = [
    {
        name: 'Starter',
        id: 'tier-starter',
        price: 'Free',
        description: 'For first-time onboarding.',
        features: ['100 bookings', 'Valid for 10 days', 'Basic Features'],
        mostPopular: false,
    },
    {
        name: 'Growth',
        id: 'tier-growth',
        price: '₹999/mo',
        description: 'For growing practices.',
        features: ['250 bookings/mo', 'Email & Chat Support', 'All Core Features'],
        mostPopular: false,
    },
    {
        name: 'Scale',
        id: 'tier-scale',
        price: '₹1,999/mo',
        description: 'For established clinics.',
        features: ['600 bookings/mo', 'Priority Support', 'Advanced Analytics', 'Customizable Templates'],
        mostPopular: true,
    },
    {
        name: 'Pro',
        id: 'tier-pro',
        price: '₹2,999/mo',
        description: 'For high-volume centers.',
        features: ['1,500 bookings/mo', 'E-commerce Integration', 'API Access'],
        mostPopular: false,
    },
    {
        name: 'Summit',
        id: 'tier-summit',
        price: '₹4,999/mo',
        description: 'For large-scale operations.',
        features: ['Unlimited bookings', 'Dedicated Account Manager', 'All Features & Add-ons'],
        mostPopular: false,
    },
];

const topups = [
    { name: '50 Bookings', price: '₹300', description: 'Lifetime validity' },
    { name: '100 Bookings', price: '₹500', description: 'Lifetime validity' },
];

const Pricing = () => {
    return (
        <section className="py-24 bg-gray-800 sm:py-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Flexible Pricing for Every Practice</h2>
                    <p className="mt-4 text-lg leading-8 text-gray-300">
                        Choose a plan that fits your needs. Cancel or upgrade anytime.
                    </p>
                </div>
                <div className="isolate mt-16 grid grid-cols-1 gap-y-8 md:grid-cols-3 lg:grid-cols-5">
                    {tiers.map((tier) => (
                        <div
                            key={tier.id}
                            className={`rounded-3xl p-8 ring-1 ring-gray-200/20 ${tier.mostPopular ? 'bg-indigo-600/10 ring-2 ring-indigo-500' : ''}`}
                        >
                            <h3 id={tier.id} className="text-lg font-semibold leading-8 text-white">{tier.name}</h3>
                            <p className="mt-4 text-sm leading-6 text-gray-300">{tier.description}</p>
                            <p className="mt-6 flex items-baseline gap-x-1">
                                <span className="text-4xl font-bold tracking-tight text-white">{tier.price.split('/')[0]}</span>
                                {tier.price.includes('/') && <span className="text-sm font-semibold leading-6 text-gray-300">/{tier.price.split('/')[1]}</span>}
                            </p>
                            <a
                                href="#"
                                className={`mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 ${tier.mostPopular ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500' : 'bg-white/10 text-white hover:bg-white/20'}`}
                            >
                                Get started
                            </a>
                            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        <CheckIcon className="h-6 w-5 flex-none text-indigo-400" aria-hidden="true" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-20 max-w-2xl mx-auto text-center">
                    <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Need a Quick Top-up?</h3>
                    <p className="mt-4 text-lg leading-8 text-gray-300">
                        Add extra bookings to your account at any time.
                    </p>
                    <div className="mt-8 flex justify-center gap-8">
                        {topups.map((topup) => (
                             <div key={topup.name} className="flex-1 rounded-xl bg-gray-700/50 p-6">
                                <h4 className="text-xl font-semibold text-white">{topup.name}</h4>
                                <p className="mt-2 text-2xl font-bold text-indigo-400">{topup.price}</p>
                                <p className="mt-2 text-sm text-gray-400">{topup.description}</p>
                                 <button className="mt-4 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                                    Buy Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
