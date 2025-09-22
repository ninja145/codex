import React from 'react';
import { QrCodeIcon, ClipboardDocumentListIcon, UserMinusIcon } from '@heroicons/react/24/outline';

const stats = [
  { id: 1, name: 'Total QR Scans', stat: '1,432', icon: QrCodeIcon },
  { id: 2, name: 'Total Bookings', stat: '86', icon: ClipboardDocumentListIcon },
  { id: 3, name: 'Not-Seen Patients', stat: '5', icon: UserMinusIcon },
]

const KpiCards = () => {
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.id} className="px-4 py-5 bg-gray-800 shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-400 truncate flex items-center">
              <item.icon className="h-6 w-6 text-gray-500 mr-2" aria-hidden="true" />
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-white">{item.stat}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default KpiCards;
