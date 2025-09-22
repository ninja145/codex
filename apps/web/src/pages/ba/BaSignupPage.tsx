import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { baSignup } from '../../firebase';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

const BaSignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        pin: '',
        confirmPin: '',
        email: '',
        address: '',
        dob: '',
        aadhaar: '',
        pan: '',
        bankDetails: '',
        nomineeDetails: '',
    });
    const [files, setFiles] = useState({
        imageUrl: null,
        aadhaarFront: null,
        aadhaarBack: null,
        panCard: null,
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files: inputFiles } = e.target;
        if (inputFiles && inputFiles.length > 0) {
            setFiles(prev => ({ ...prev, [name]: inputFiles[0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.pin !== formData.confirmPin) {
            setError("PINs do not match.");
            return;
        }
        // TODO: Add more robust validation
        setError('');
        setLoading(true);

        try {
            // TODO: Implement actual file uploads to Firebase Storage and get URLs
            const imageUrl = 'https://via.placeholder.com/150';

            const result: any = await baSignup({ ...formData, imageUrl });

            if (result.data.status === 'success' && result.data.token) {
                await signInWithCustomToken(auth, result.data.token);
                navigate('/ba/dashboard');
            } else {
                throw new Error('BA Signup failed.');
            }
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const FileInput = ({ label, name }: { label: string, name: keyof typeof files }) => (
         <div>
            <label className="block text-sm font-medium text-gray-300">{label}</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <div className="flex text-sm text-gray-500">
                        <label htmlFor={name} className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-indigo-400 hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-800 focus-within:ring-indigo-500 p-1">
                            <span>Upload a file</span>
                            <input id={name} name={name} type="file" className="sr-only" onChange={handleFileChange} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    {files[name] && <p className="text-xs text-gray-400">{(files[name] as File).name}</p>}
                </div>
            </div>
        </div>
    );


    return (
        <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                    Become a Business Associate
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl">
                <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Details */}
                            <input type="text" name="name" placeholder="Full Name*" required value={formData.name} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white" />
                            <input type="tel" name="phone" placeholder="WhatsApp Number*" required value={formData.phone} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white" />
                            <input type="email" name="email" placeholder="Email*" required value={formData.email} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white" />
                             <input type="date" name="dob" placeholder="Date of Birth" required value={formData.dob} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white" />
                            <textarea name="address" placeholder="Full Address" value={formData.address} onChange={handleChange} className="md:col-span-2 appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white" />

                            {/* Security */}
                            <input type="password" name="pin" placeholder="4-Digit PIN*" maxLength={4} required value={formData.pin} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white" />
                            <input type="password" name="confirmPin" placeholder="Confirm PIN*" maxLength={4} required value={formData.confirmPin} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white" />

                            {/* KYC Details */}
                            <input type="text" name="aadhaar" placeholder="Aadhaar Number*" required value={formData.aadhaar} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white" />
                            <input type="text" name="pan" placeholder="PAN Number" value={formData.pan} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white" />

                           {/* File Uploads */}
                           <div className="md:col-span-2"><FileInput label="Profile Picture" name="imageUrl" /></div>
                           <div className="md:col-span-2"><FileInput label="Aadhaar Card (Front)" name="aadhaarFront" /></div>
                           <div className="md:col-span-2"><FileInput label="Aadhaar Card (Back)" name="aadhaarBack" /></div>
                           <div className="md:col-span-2"><FileInput label="PAN Card" name="panCard" /></div>

                            {/* Financial Details */}
                            <textarea name="bankDetails" placeholder="Bank Details (Account No, IFSC)" value={formData.bankDetails} onChange={handleChange} className="md:col-span-2 appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white" />
                            <textarea name="nomineeDetails" placeholder="Nominee Details" value={formData.nomineeDetails} onChange={handleChange} className="md:col-span-2 appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white" />
                        </div>

                        {error && <p className="text-sm text-red-500 text-center pt-4">{error}</p>}

                        <div>
                            <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                                {loading ? 'Submitting Application...' : 'Submit for Review'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BaSignupPage;
