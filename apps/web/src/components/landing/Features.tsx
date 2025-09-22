import React from 'react';
import { CheckBadgeIcon, StarIcon, GiftIcon } from '@heroicons/react/24/solid';

const commonFeatures = [
  "QR-Based Booking", "Personal Mini-Website", "Appointment Management", "Automated Notifications",
  "Manual Patient Entry", "Slot Management", "Basic Analytics", "Patient History"
];

const premiumAddons = [
  "Advanced Analytics", "Customizable Templates", "Pre-Payment Collection", "E-commerce Integration",
  "AI-Powered Chat Support", "Multi-Chamber Support", "Personalized QR Builder", "Data Export (CSV)"
];

const freeWithAddon = "Priority Support";

const Features = () => {
  return (
    <section className="py-24 bg-gray-900 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything You Need to Grow Your Practice
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-300">
            From essential tools to powerful add-ons, Veziit is designed to adapt to your needs.
          </p>
        </div>
        <div className="mt-16 space-y-16">
          <div>
            <h3 className="text-2xl font-semibold leading-7 text-indigo-400">Core Features</h3>
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 text-base text-gray-300 sm:grid-cols-2 lg:grid-cols-4">
              {commonFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-x-3">
                  <CheckBadgeIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold leading-7 text-amber-400">Premium Add-ons</h3>
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 text-base text-gray-300 sm:grid-cols-2 lg:grid-cols-4">
              {premiumAddons.map((feature) => (
                <div key={feature} className="flex items-center gap-x-3">
                  <StarIcon className="h-6 w-6 text-amber-400" aria-hidden="true" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
           <div>
            <h3 className="text-2xl font-semibold leading-7 text-cyan-400">Free with Any Add-on</h3>
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 text-base text-gray-300 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-x-3">
                  <GiftIcon className="h-6 w-6 text-cyan-400" aria-hidden="true" />
                  {freeWithAddon}
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
