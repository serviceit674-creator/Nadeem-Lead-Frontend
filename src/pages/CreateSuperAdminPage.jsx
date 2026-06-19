import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom"; 
import {
    Save,
    Mail,
    Lock,
    User,
    Loader2,
    Eye,
    EyeOff,
    ShieldCheck,
    AlertCircle,
    ArrowLeft,
} from "lucide-react";

const CreateSuperAdminPage = () => {
    const navigate = useNavigate(); 
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [selectedRole, setSelectedRole] = useState("superadmin"); 

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    // रियल-टाइम वैलिडेशन हेल्पर्स
    const isEmailValid = useMemo(
        () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
        [form.email],
    );
    const isPasswordStrong = useMemo(
        () => form.password.length >= 8,
        [form.password],
    );

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isEmailValid || !isPasswordStrong) return;

        try {
            setLoading(true);
            // यहाँ आप अपना लोकल या कस्टम सबमिट लॉजिक रख सकते हैं
            setTimeout(() => {
                navigate("/super-admins"); 
            }, 500);
        } catch (error) {
            console.error("Error creating admin:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        // max-w-7xl और px-4 sm:px-6 lg:px-8 से लेफ्ट-राइट मार्जिन एकदम परफेक्ट सेट हो गया है
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-500">
            
            {/* हेडर सेक्शन */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-0 z-30">
                <div className="flex items-center gap-4">
                    {/* सुधरा हुआ मॉडर्न बैक बटन */}
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-md shadow-blue-100 active:scale-95 cursor-pointer"
                    >
                        <ArrowLeft size={16} />
                        Back
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 capitalize">Create {selectedRole}</h1>
                        <p className="text-sm text-gray-500 font-medium">
                            Provision a new high-privilege account
                        </p>
                    </div>
                </div>
            </div>

            {/* मुख्य ग्रिड लेआउट (Left Info & Right Form) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* लेफ्ट साइडबार (Info) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden group">
                        <ShieldCheck
                            size={120}
                            className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="relative z-10">
                            <div className="bg-blue-500/20 p-3 w-fit rounded-xl mb-6">
                                <ShieldCheck size={28} className="text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Privileged Access</h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                System administrators can manage system configurations, roles, and
                                sensitive user data. Proceed with caution.
                            </p>
                        </div>
                    </div>

                    <div className="bg-blue-50/60 border border-blue-100 p-5 rounded-2xl flex gap-3">
                        <AlertCircle className="text-blue-600 shrink-0 mt-0.5" size={20} />
                        <p className="text-xs text-blue-800 leading-relaxed font-medium">
                            An invitation email will be sent to the user once the account is
                            created.
                        </p>
                    </div>
                </div>

                {/* राइट साइड (फॉर्म कंटेनर) */}
                <div className="lg:col-span-8">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-md space-y-6 relative overflow-hidden"
                    >
                        {/* रोल सिलेक्शन ड्रॉपडाउन (सुंदर और साफ़ डिज़ाइन) */}
                  

                        {/* पूरा नाम इनपुट */}
                        <div className="space-y-2 group">
                            <label className="text-sm font-bold text-gray-700 ml-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <User
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors"
                                    size={20}
                                />
                                <input
                                    name="name"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                    className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl pl-12 pr-4 py-3 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm text-gray-800"
                                />
                            </div>
                        </div>

                        {/* ईमेल इनपुट */}
                        <div className="space-y-2 group">
                            <label className="text-sm font-bold text-gray-700 ml-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail
                                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${form.email && !isEmailValid ? "text-red-400" : "text-gray-400 group-focus-within:text-blue-600"}`}
                                    size={20}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="admin@company.com"
                                    className={`w-full bg-gray-50/50 border rounded-2xl pl-12 pr-4 py-3 focus:bg-white focus:ring-4 outline-none transition-all text-sm text-gray-800 ${form.email && !isEmailValid
                                        ? "border-red-300 focus:ring-red-500/10 focus:border-red-500"
                                        : "border-gray-200 focus:ring-blue-500/10 focus:border-blue-500"
                                        }`}
                                />
                            </div>
                        </div>

                        {/* पासवर्ड इनपुट */}
                        <div className="space-y-2 group">
                            <label className="text-sm font-bold text-gray-700 ml-1">
                                Secure Password
                            </label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors"
                                    size={20}
                                />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="•••••••••••"
                                    className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl pl-12 pr-12 py-3 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm text-gray-800"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {form.password && (
                                <p
                                    className={`text-[11px] font-bold ml-1 uppercase tracking-wider ${isPasswordStrong ? "text-green-500" : "text-amber-500"}`}
                                >
                                    {isPasswordStrong
                                        ? "✓ Strong Password"
                                        : "! Minimum 8 characters required"}
                                </p>
                            )}
                        </div>

                        {/* सबमिट बटन */}
                        <button
                            type="submit"
                            disabled={loading || !isEmailValid || !isPasswordStrong}
                            className="w-full relative flex items-center justify-center gap-3 bg-blue-600 text-white py-3.5 rounded-2xl font-bold hover:bg-blue-700 transition-all disabled:opacity-40 disabled:grayscale shadow-lg shadow-blue-200 active:scale-[0.98] cursor-pointer text-sm"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={22} />
                            ) : (
                                <>
                                    <Save size={20} />
                                    Authorize & Create {selectedRole === "superadmin" ? "SuperAdmin" : "Admin"}
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateSuperAdminPage;