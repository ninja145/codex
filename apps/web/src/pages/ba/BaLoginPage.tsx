import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { baLogin } from '../../firebase';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

const BaLoginPage = () => {
    const [formData, setFormData] = useState({
        phone: '',
        pin: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result: any = await baLogin({ phone: formData.phone, pin: formData.pin });
            if (result.data.status === 'success' && result.data.token) {
                await signInWithCustomToken(auth, result.data.token);
                navigate('/ba/dashboard');
            } else {
                throw new Error('Login failed. Please check your credentials.');
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
                    BA Portal Sign In
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone Number</label>
                            <div className="mt-1">
                                <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white" disabled={loading} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="pin" className="block text-sm font-medium text-gray-300">4-Digit PIN</label>
                            <div className="mt-1">
                                <input id="pin" name="pin" type="password" maxLength={4} required value={formData.pin} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white" disabled={loading} />
                            </div>
                        </div>

                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                        <div>
                            <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                                {loading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </div>
                    </form>
                     <div className="mt-6 text-center">
                        <Link to="/ba/signup" className="font-medium text-indigo-400 hover:text-indigo-300">
                           Don't have a BA account? Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BaLoginPage;
