import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { generatePinResetCode, verifyPinResetCode } from '../firebase';

const ForgetPinPage = () => {
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [newPin, setNewPin] = useState('');
    const [confirmNewPin, setConfirmNewPin] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handlePhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const result: any = await generatePinResetCode({ phone });
            if (result.data.status === 'success' && result.data.resetCode) {
                setGeneratedCode(result.data.resetCode);
                setStep(2);
            } else {
                throw new Error('Could not generate reset code.');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPin !== confirmNewPin) {
            setError("New PINs do not match.");
            return;
        }
        setError('');
        setLoading(true);
        try {
            const result: any = await verifyPinResetCode({ phone, resetCode, newPin });
            if (result.data.status === 'success') {
                setMessage('PIN reset successfully! Redirecting to login...');
                setTimeout(() => navigate('/login'), 3000);
            } else {
                throw new Error('Could not reset PIN.');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                    Reset your PIN
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {step === 1 && (
                        <form className="space-y-6" onSubmit={handlePhoneSubmit}>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Enter your Phone Number</label>
                                <div className="mt-1">
                                    <input id="phone" name="phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white" disabled={loading} />
                                </div>
                            </div>
                            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                            <div>
                                <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                                    {loading ? 'Generating...' : 'Generate Reset Code'}
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 2 && (
                        <>
                            <div className="text-center p-4 mb-4 border border-dashed border-gray-600 rounded-lg">
                                <p className="text-sm text-gray-400">Your single-use reset code is:</p>
                                <p className="text-3xl font-bold tracking-widest text-green-400 my-2">{generatedCode}</p>
                                <p className="text-xs text-gray-500">This code is valid for 30 minutes.</p>
                            </div>
                            <form className="space-y-6" onSubmit={handleResetSubmit}>
                                <div>
                                    <label htmlFor="resetCode" className="block text-sm font-medium text-gray-300">6-Digit Reset Code</label>
                                    <div className="mt-1">
                                        <input id="resetCode" name="resetCode" type="text" maxLength={6} required value={resetCode} onChange={(e) => setResetCode(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white" disabled={loading} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="newPin" className="block text-sm font-medium text-gray-300">New 4-Digit PIN</label>
                                    <div className="mt-1">
                                        <input id="newPin" name="newPin" type="password" maxLength={4} required value={newPin} onChange={(e) => setNewPin(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white" disabled={loading} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="confirmNewPin" className="block text-sm font-medium text-gray-300">Confirm New PIN</label>
                                    <div className="mt-1">
                                        <input id="confirmNewPin" name="confirmNewPin" type="password" maxLength={4} required value={confirmNewPin} onChange={(e) => setConfirmNewPin(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white" disabled={loading} />
                                    </div>
                                </div>
                                {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                                {message && <p className="text-sm text-green-500 text-center">{message}</p>}
                                <div>
                                    <button type="submit" disabled={loading || !!message} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                                        {loading ? 'Resetting...' : 'Reset PIN'}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                     <div className="mt-6 text-center">
                        <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
                            Back to Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPinPage;
