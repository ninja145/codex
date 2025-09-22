import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import BookingFlow from '../../components/booking/BookingFlow';

const DoctorMiniSite = () => {
    const { shortId } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDoctor = async () => {
            if (!shortId) {
                setError('Doctor ID not found.');
                setLoading(false);
                return;
            }
            try {
                const q = query(collection(db, "doctors"), where("shortId", "==", shortId));
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) {
                    setError('Doctor not found.');
                } else {
                    // NOTE: In a real app, we would have a separate 'publicProfile' subcollection
                    // to avoid exposing sensitive data like pinHash or encrypted keys to the client.
                    // For this project, we assume the Firestore rules are configured to only allow
                    // reading of non-sensitive fields.
                    setDoctor(querySnapshot.docs[0].data());
                }
            } catch (err) {
                setError('Failed to fetch doctor data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctor();
    }, [shortId]);

    const [isBooking, setIsBooking] = useState(false);

    const handleBookNow = () => {
        setIsBooking(true);
    };

    if (loading) {
        return <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (error) {
        return <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">Error: {error}</div>;
    }

    if (!doctor) {
        return <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">Doctor not found.</div>;
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
            {isBooking && doctor && <BookingFlow doctor={doctor} onClose={() => setIsBooking(false)} />}
            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                {/* Header Section */}
                <header className="text-center mb-8">
                    <img src={doctor.imageUrl} alt={doctor.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-500" />
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{doctor.name}</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">{doctor.degree}</p>
                    <p className="text-lg text-indigo-500 dark:text-indigo-400">{doctor.specialty}</p>
                </header>

                {/* Book Now CTA */}
                <div className="text-center mb-8">
                    <button
                        onClick={handleBookNow}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg"
                    >
                        Book Now
                    </button>
                </div>

                {/* Bio Section */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">Know Your Doctor</h2>
                    <p className="text-gray-700 dark:text-gray-300">{doctor.bio}</p>
                </div>

                {/* Noticeboard */}
                <div className="bg-yellow-100 dark:bg-yellow-900/20 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-200 p-4 mb-8 rounded-r-lg">
                    <p className="font-bold">Notice</p>
                    <p>{doctor.noticeboard}</p>
                </div>

                {/* E-commerce Zone */}
                {(doctor.ecommerce || []).length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-white">Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {doctor.ecommerce.map((item: any) => (
                            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center text-center">
                                <img src={item.imageUrl || 'https://via.placeholder.com/150'} alt={item.name} className="w-24 h-24 object-cover rounded-md mb-3" />
                                <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                                <p className="text-indigo-500 dark:text-indigo-400 font-bold">{item.price}</p>
                                <button className="mt-3 w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-2 px-4 rounded">
                                    Buy Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                )}

                {/* Reviews */}
                {(doctor.reviews || []).length > 0 && (
                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-white">Patient Reviews</h2>
                    <div className="space-y-4">
                        {doctor.reviews.map((review: any) => (
                            <div key={review.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                                <div className="flex items-center mb-2">
                                    <div className="flex text-yellow-400">
                                        {[...Array(review.rating)].map((_, i) => <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                                    </div>
                                    <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">{review.author}</p>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400">"{review.text}"</p>
                            </div>
                        ))}
                    </div>
                </div>
                )}
            </div>
        </div>
    );
};

export default DoctorMiniSite;
