import React from 'react';

const stats = [
  { name: 'Doctors Onboarded', value: '1,200+' },
  { name: 'Patients Served', value: '50,000+' },
  { name: 'Bookings Managed', value: '250,000+' },
  { name: 'Positive Reviews', value: '98%' },
];

const About = () => {
  return (
    <section className="py-24 bg-gray-800 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Trusted by Professionals Nationwide
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              We are committed to providing a seamless and efficient experience for both doctors and patients.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col">
                <dt className="text-base leading-7 text-gray-400">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-indigo-400 sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-20 text-center">
             <figure className="max-w-2xl mx-auto">
                <blockquote className="text-xl italic font-semibold text-white">
                    <p>
                        “Veziit has revolutionized my practice. Managing appointments has never been easier. The QR system is brilliant and my patients love the simplicity.”
                    </p>
                </blockquote>
                <figcaption className="mt-10">
                    <div className="mt-3 text-base text-gray-400">
                        <span className="font-bold text-white">Dr. Anjali Sharma</span>, General Physician
                    </div>
                </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
