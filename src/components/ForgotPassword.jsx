import React, { useState } from "react";
import { account } from "../appwrite/configuration";
import { Link } from "react-router-dom";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await account.createRecovery(email, window.location.origin + "/reset-password");
            setSent(true);
        } catch (err) {
            setError(err.message || "Failed to send reset email.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-teal-100 px-4">
            <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-2xl shadow-2xl p-8 border border-teal-100">

                <div className="flex flex-col items-center mb-6">
                    {/* New icon: Envelope (mail) */}
                    <svg width="48" height="48" fill="none" className="mb-2 text-teal-500" viewBox="0 0 24 24">
                        <rect width="20" height="14" x="2" y="5" rx="3" stroke="currentColor" strokeWidth="2" />
                        <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h2 className="text-2xl font-extrabold text-teal-700 mb-1">Forgot Password?</h2>

                    <p className="text-gray-500 text-center text-sm">
                        Enter your email and we’ll send you a link to reset your password.
                    </p>

                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {sent ? (
                        <div className="text-teal-600 text-center font-semibold">
                            Check your email for a password reset link.
                        </div>
                    ) : (
                        <>
                            <div>
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                                    Email Address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                                    disabled={loading}
                                    autoFocus
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-lg font-semibold shadow transition disabled:opacity-60"
                                disabled={loading}
                            >
                                {loading ? "Sending..." : "Send Reset Link"}
                            </button>
                            {error && <p className="text-red-600 text-center mt-2">{error}</p>}
                        </>
                    )}
                </form>

                <div className="mt-8 text-center">
                    <Link to="/login" className="text-teal-500 hover:underline text-sm font-medium">
                        &larr; Back to Login
                    </Link>
                </div>
                
            </div>
        </div>
    );
}

export default ForgotPassword;