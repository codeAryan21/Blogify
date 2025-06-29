import React, { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { account } from "../appwrite/configuration";
import { Eye, EyeOff } from "lucide-react";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (password !== confirm) {
            setError("Passwords do not match.");
            return;
        }
        setLoading(true);
        try {
            await account.updateRecovery(userId, secret, password, confirm);
            setSuccess(true);
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.message || "Failed to reset password.");
        }
        setLoading(false);
    };

    if (!userId || !secret) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-teal-100 px-4">
                <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8 border border-teal-100 text-center">
                    <p className="text-red-600 font-semibold mb-4">Invalid or missing reset link.</p>
                    <Link to="/forgot-password" className="text-teal-500 hover:underline text-sm font-medium">
                        &larr; Back to Forgot Password
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-teal-100 px-4">
            <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8 border border-teal-100">

                <div className="flex flex-col items-center mb-6">
                    {/* Lock icon */}
                    <svg width="48" height="48" fill="none" className="mb-2 text-teal-500" viewBox="0 0 24 24">
                        <rect x="5" y="11" width="14" height="8" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <h2 className="text-2xl font-extrabold text-teal-700 mb-1">Reset Password</h2>
                    <p className="text-gray-500 text-center text-sm">
                        Enter your new password below.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {success ? (
                        <div className="text-teal-600 text-center font-semibold">
                            Password reset! Redirecting to login...
                        </div>
                    ) : (
                        <>
                            <div className="relative">
                                <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                                    New Password
                                </label>

                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="New password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition pr-10"
                                    disabled={loading}
                                />

                                <button
                                    type="button"
                                    className="absolute top-[38px] right-3 text-gray-500"
                                    tabIndex={-1}
                                    onClick={() => setShowPassword((v) => !v)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>

                            </div>

                            <div className="relative">
                                <label htmlFor="confirm" className="block text-gray-700 font-medium mb-1">
                                    Confirm New Password
                                </label>

                                <input
                                    id="confirm"
                                    type={showConfirm ? "text" : "password"}
                                    placeholder="Confirm new password"
                                    value={confirm}
                                    onChange={e => setConfirm(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition pr-10"
                                    disabled={loading}
                                />

                                <button
                                    type="button"
                                    className="absolute top-[38px] right-3 text-gray-500"
                                    tabIndex={-1}
                                    onClick={() => setShowConfirm((v) => !v)}
                                >
                                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>

                            </div>

                            <button
                                type="submit"
                                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-lg font-semibold shadow transition disabled:opacity-60"
                                disabled={loading}
                            >
                                {loading ? "Resetting..." : "Reset Password"}
                            </button>
                            {error && <p className="text-red-600 text-center mt-2">{error}</p>}
                        </>
                    )}
                </form>
                
            </div>
        </div>
    );
}

export default ResetPassword;