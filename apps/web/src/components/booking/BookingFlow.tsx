import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { createBooking } from '../../firebase';

const BookingFlow = ({ doctor, onClose }: { doctor: any, onClose: () => void }) => {
    const [step, setStep] = useState(1);
    const [date, setDate] = useState({ startDate: null, endDate: null });
    const [selectedSlot, setSelectedSlot] = useState('');
    const [patientDetails, setPatientDetails] = useState({
        name: '',
        whatsapp: '',
        age: '',
        gender: '',
        purpose: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleDateChange = (newDate: any) => {
        setDate(newDate);
    };

    const handleSlotSelect = (slot: string) => {
        setSelectedSlot(slot);
        setStep(3);
    };

    const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPatientDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!patientDetails.name || !patientDetails.whatsapp) {
            setError("Please fill in your name and WhatsApp number.");
            return;
        }
        setError('');
        setSuccessMessage('');
        setLoading(true);

        try {
            const bookingData = {
                doctorId: doctor.uid,
                date: date.startDate,
                slot: selectedSlot,
                patientDetails,
            };

            const result: any = await createBooking(bookingData);

            if (result.data.status === 'success') {
                setLoading(false);
                setSuccessMessage('Booking successful! You will receive a confirmation shortly.');
                setTimeout(() => {
                    onClose();
                }, 3000);
            } else {
                throw new Error('Booking failed. Please try again.');
            }
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred during booking.');
            setLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1: // Date Selection
                return (
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Select a Date</h3>
                        <Datepicker
                            value={date}
                            onChange={handleDateChange}
                            asSingle={true}
                            useRange={false}
                            primaryColor={"indigo"}
                        />
                        <button
                            onClick={() => setStep(2)}
                            disabled={!date.startDate}
                            className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md disabled:bg-gray-400"
                        >
                            Next
                        </button>
                    </div>
                );
            case 2: // Slot Selection
                // Placeholder slots
                const slots = ["09:00 AM", "09:30 AM", "10:00 AM", "11:00 AM", "11:30 AM"];
                return (
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Select a Slot for {date.startDate}</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {slots.map(slot => (
                                <button
                                    key={slot}
                                    onClick={() => handleSlotSelect(slot)}
                                    className="p-2 border rounded-md hover:bg-indigo-500 hover:text-white dark:border-gray-600 dark:hover:bg-indigo-600"
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setStep(1)} className="mt-4 text-sm text-gray-600 dark:text-gray-400">Back</button>
                    </div>
                );
            case 3: // Patient Details
                return (
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Enter Your Details</h3>
                        <div className="space-y-4">
                            <input type="text" name="name" placeholder="Full Name*" required value={patientDetails.name} onChange={handleDetailChange} className="w-full p-2 border rounded-md bg-gray-200 dark:bg-gray-700 dark:border-gray-600" />
                            <input type="tel" name="whatsapp" placeholder="WhatsApp Number*" required value={patientDetails.whatsapp} onChange={handleDetailChange} className="w-full p-2 border rounded-md bg-gray-200 dark:bg-gray-700 dark:border-gray-600" />
                            <input type="number" name="age" placeholder="Age" value={patientDetails.age} onChange={handleDetailChange} className="w-full p-2 border rounded-md bg-gray-200 dark:bg-gray-700 dark:border-gray-600" />
                            <input type="text" name="gender" placeholder="Gender" value={patientDetails.gender} onChange={handleDetailChange} className="w-full p-2 border rounded-md bg-gray-200 dark:bg-gray-700 dark:border-gray-600" />
                            <textarea name="purpose" placeholder="Purpose of Visit" value={patientDetails.purpose} onChange={handleDetailChange} className="w-full p-2 border rounded-md bg-gray-200 dark:bg-gray-700 dark:border-gray-600" />
                        </div>
                        <button onClick={handleSubmit} disabled={loading || !!successMessage} className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md disabled:opacity-50">
                            {loading ? 'Submitting...' : 'Submit Booking'}
                        </button>
                        <button onClick={() => setStep(2)} className="mt-2 text-sm text-gray-600 dark:text-gray-400">Back</button>
                        {error && <p className="text-sm text-center text-red-500 mt-2">{error}</p>}
                        {successMessage && <p className="text-sm text-center text-green-500 mt-2">{successMessage}</p>}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Book Appointment</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">&times;</button>
                </div>
                {renderStep()}
            </div>
        </div>
    );
};

export default BookingFlow;
