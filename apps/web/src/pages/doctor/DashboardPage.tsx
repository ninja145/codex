import React from 'react';
import Sidebar from '../../components/doctor/Sidebar';
import DashboardHeader from '../../components/doctor/DashboardHeader';
import KpiCards from '../../components/doctor/KpiCards';
import AppointmentLog from '../../components/doctor/AppointmentLog';

const DashboardPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Sidebar />
      <div className="md:pl-64 flex flex-col flex-1">
        <DashboardHeader />
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Admin Banner would go here */}
              <KpiCards />
              <AppointmentLog />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
