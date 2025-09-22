import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doctorSignup } from '../firebase'; // Assuming firebase.ts is in src
import { signInWithCustomToken, getAuth } from 'firebase/auth';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        pin: '',
        confirmPin: '',
        email: '',
        toc: false,
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.pin !== formData.confirmPin) {
            setError("PINs do not match.");
            return;
        }
        if (!formData.toc) {
            setError("You must accept the Terms and Conditions.");
            return;
        }
        setError('');
        setLoading(true);

        try {
            const { name, phone, pin, email } = formData;
            const result: any = await doctorSignup({ name, phone, pin, email });

            if (result.data.status === 'success' && result.data.token) {
                await signInWithCustomToken(auth, result.data.token);
                // Redirect to dashboard
                navigate('/doctor/dashboard');
            } else {
                throw new Error('Signup failed. Please try again.');
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                    Create your Doctor account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* ... form fields are same as before ... */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                            <div className="mt-1">
                                <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white" disabled={loading} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone Number</label>
                            <div className="mt-1">
                                <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white" disabled={loading} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email address</label>
                            <div className="mt-1">
                                <input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white" disabled={loading} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="pin" className="block text-sm font-medium text-gray-300">4-Digit PIN</label>
                            <div className="mt-1">
                                <input id="pin" name="pin" type="password" maxLength={4} required value={formData.pin} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white" disabled={loading} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirmPin" className="block text-sm font-medium text-gray-300">Confirm PIN</label>
                            <div className="mt-1">
                                <input id="confirmPin" name="confirmPin" type="password" maxLength={4} required value={formData.confirmPin} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white" disabled={loading} />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input id="toc" name="toc" type="checkbox" checked={formData.toc} onChange={handleChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" disabled={loading} />
                            <label htmlFor="toc" className="ml-2 block text-sm text-gray-400">
                                I agree to the <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300">Terms and Conditions</a>
                            </label>
                        </div>

                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                        <div>
                            <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                                {loading ? 'Signing up...' : 'Sign up'}
                            </button>
                        </div>
                    </form>
                    {/* ... rest of the component is same ... */}
                     <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-600" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-800 text-gray-400">
                                    Already have an account?
                                </span>
                            </div>
                        </div>
                        <div className="mt-6">
                            <Link to="/login" className="w-full flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
