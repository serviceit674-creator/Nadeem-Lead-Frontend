import React, { useEffect, useState } from 'react';
import LoginLeftSide from './LoginLeftSide';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, Loader2Icon, UserCheckIcon } from 'lucide-react';
import api from "../lib/axios.js";

const LoginForm = ({ title, subTitle }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('Admin'); // Role state added
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Role ko payload mein pass kiya gaya hai
            const response = await api.post("/auth/login", {
                email, 
                password,
                role: selectedRole.toLowerCase() 
            });

            if (response.data && response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.user?.role || selectedRole.toLowerCase()); 
                navigate("/"); 
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed, please check credentials");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className='min-h-screen flex flex-col md:flex-row'>
            <LoginLeftSide />

            <div className='flex-1 flex items-center justify-center p-6 sm:p-12 bg-white'>
                <div className='w-full max-w-md animate-fade-in'>
                    <Link to={'/login'} className='inline-flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm mb-10 transition-colors'>
                        <ArrowLeftIcon size={16} /> Back to portals
                    </Link>

                    <div className='mb-8'>
                        <h1 className='text-2xl sm:text-3xl font-medium text-zinc-800'>{title}</h1>
                        <p className='text-slate-500 text-sm sm:text-base mt-2'>{subTitle}</p>
                    </div>

                    {error && (
                        <div className='mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-start gap-3'>
                            <div className='w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0' />
                            {error}
                        </div>
                    )}
                    
                    <form className='space-y-5' onSubmit={handleSubmit}>
                        {/* Dropdown for Role Selection */}
                        <div>
                            <label className='block text-sm font-medium text-slate-700 mb-2'>Select Portal Role</label>
                            <div className='relative'>
                                <select 
                                    value={selectedRole}
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                    className='w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none pr-10 text-zinc-800 text-sm'
                                >
                                    <option value="Admin">Admin</option>
                                    <option value="Superadmin">Superadmin</option>
                                </select>
                                <div className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400'>
                                    <UserCheckIcon size={18} />
                                </div>
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className='block text-sm font-medium text-slate-700 mb-2'>Email address</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                placeholder='zyntrix@example.com'
                                className='w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm'
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className='block text-sm font-medium text-slate-700 mb-2'>Password</label>
                            <div className='relative'>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                    className='w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all pr-11 text-sm' 
                                    placeholder='••••••••' 
                                />
                                <button type='button' className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors'
                                    onClick={() => setShowPassword(!showPassword)}>
                                   {showPassword ? <EyeOffIcon size={18}/> : <EyeIcon size={18}/>}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button type='submit' disabled={loading}
                            className='w-full py-3 bg-linear-to-r from-indigo-600 to-indigo-500 text-white rounded-md text-sm font-semibold hover:from-indigo-700 hover:to-indigo-600 disabled:opacity-50 transition-all duration-200 shadow-lg shadow-indigo-500/25 active:scale-[0.98] flex items-center justify-center cursor-pointer'>
                            {loading && <Loader2Icon className='animate-spin w-4 h-4 mr-2'/>}
                            Sign In as {selectedRole}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;