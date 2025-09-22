import React, { useState, useEffect } from 'react';
import BaSidebar from '../../components/ba/BaSidebar';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const BaDashboardPage = () => {
    const { user } = useAuth(); // Custom hook to get the current auth user
    const [baData, setBaData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBaData = async () => {
            if (user) {
                try {
                    const baDocRef = doc(db, 'ba', user.uid);
                    const baDocSnap = await getDoc(baDocRef);
                    if (baDocSnap.exists()) {
                        setBaData(baDocSnap.data());
                    }
                } catch (error) {
                    console.error("Error fetching BA data:", error);
                }
            }
            setLoading(false);
        };
        fetchBaData();
    }, [user]);

    if (loading) {
        return <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!baData) {
        return <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">Could not load Business Associate data. Please try logging in again.</div>;
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <BaSidebar baName={baData.name} />
            <div className="md:pl-64 flex flex-col flex-1">
                <main className="flex-1">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                             <h1 className="text-2xl font-semibold mb-6">Welcome, {baData.name}</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Live Data Placeholder Cards */}
                                <div className="bg-gray-800 p-6 rounded-lg">
                                    <h2 className="text-xl font-semibold text-indigo-400">Your BA Code</h2>
                                    <p className="mt-2 text-2xl font-bold text-green-400 tracking-wider">{baData.baCode}</p>
                                </div>
                                <div className="bg-gray-800 p-6 rounded-lg">
                                    <h2 className="text-xl font-semibold text-indigo-400">Total Doctors Onboarded</h2>
                                    <p className="mt-2 text-3xl font-bold">{baData.conversionStats.totalOnboarded}</p>
                                </div>
                                <div className="bg-gray-800 p-6 rounded-lg">
                                    <h2 className="text-xl font-semibold text-indigo-400">Paid Conversions</h2>
                                     <p className="mt-2 text-3xl font-bold">{baData.conversionStats.paidConversions}</p>
                                </div>
                                <div className="bg-gray-800 p-6 rounded-lg">
                                    <h2 className="text-xl font-semibold text-indigo-400">Next Payout Estimate</h2>
                                    <p className="mt-2 text-3xl font-bold">₹{baData.walletBalance}</p>
                                </div>
                                 <div className="bg-gray-800 p-6 rounded-lg">
                                    <h2 className="text-xl font-semibold text-indigo-400">Account Status</h2>
                                    <p className={`mt-2 text-lg font-bold ${baData.status === 'active' ? 'text-green-400' : 'text-yellow-400'}`}>{baData.status}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default BaDashboardPage;
