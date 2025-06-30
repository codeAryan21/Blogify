import React, { useState, useRef, useEffect } from "react";

const Chatbot = ({ className = "" }) => {
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hi! Ask me anything." }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [dark, setDark] = useState(false);
    const [copiedIdx, setCopiedIdx] = useState(null);
    const chatAreaRef = useRef(null);

    useEffect(() => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async (e) => {
        if (e) e.preventDefault?.();
        if (!input.trim()) return;
        // console.log("sendMessage called");

        const newMessages = [...messages, { role: "user", content: input }];
        setMessages(newMessages);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: newMessages }),
            });
            const data = await res.json();
            setMessages([
                ...newMessages,
                { role: "assistant", content: data.reply || "Sorry, I didn't get a response." }
            ]);
        } catch (err) {
            setMessages([
                ...newMessages,
                { role: "assistant", content: "Sorry, something went wrong." }
            ]);
        }
        setLoading(false);
    };

    const handleCopy = async (text, idx) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIdx(idx);
            setTimeout(() => setCopiedIdx(null), 1200);
        } catch (err) {
            // Optionally handle error
            setCopiedIdx(null);
            console.error("Failed to copy text to clipboard:", err);
            alert("Failed to copy to clipboard. Please try again.");
        }
    };

    return (
       <div
            className={`w-full h-[500px] rounded-xl shadow p-4 flex flex-col transition-colors duration-300 ${className} ${
                dark ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
        >
            {/* Dark mode toggle */}
            <div className="flex justify-end mb-2">
                <button
                    onClick={() => setDark((d) => !d)}
                    className={`px-3 py-1 rounded text-xs font-semibold border flex items-center ${
                        dark
                            ? "bg-gray-800 text-yellow-300 border-yellow-300"
                            : "bg-yellow-100 text-gray-800 border-yellow-400"
                    }`}
                    aria-label="Toggle dark mode"
                >
                    {dark ? (
                        // Sun icon for light mode
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="currentColor" />
                            <path stroke="currentColor" strokeWidth="2" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95l-1.414-1.414M6.464 6.464L5.05 5.05m12.02 0l-1.414 1.414M6.464 17.536l-1.414 1.414" />
                        </svg>
                    ) : (
                        // Moon icon for dark mode
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke="currentColor" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Chat area */}
            <div
                ref={chatAreaRef}
                className="flex-1 overflow-y-auto mb-2 px-1"
                style={{ minHeight: 0 }}
            >
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`
                            flex mb-4 group
                            ${msg.role === "user" ? "justify-end" : "justify-start"}
                        `}
                    >
                        <div
                            className={`
                                relative max-w-[80%] px-4 py-2 rounded-2xl shadow
                                whitespace-pre-line break-words
                                ${msg.role === "user"
                                    ? dark
                                        ? "bg-blue-700 text-white rounded-br-none"
                                        : "bg-blue-100 text-blue-900 rounded-br-none"
                                    : dark
                                        ? "bg-gray-800 text-white rounded-bl-none"
                                        : "bg-gray-100 text-gray-900 rounded-bl-none"
                                }
                                border
                                ${msg.role === "user"
                                    ? dark
                                        ? "border-blue-800"
                                        : "border-blue-200"
                                    : dark
                                        ? "border-gray-700"
                                        : "border-gray-200"
                                }
                                text-sm md:text-base
                            `}
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-xs mr-2 select-none">
                                    {msg.role === "user" ? (
                                        <span className="text-blue-400">You</span>
                                    ) : (
                                        <span className="text-green-400">AI</span>
                                    )}
                                </span>
                                {/* Copy button for assistant messages */}
                                {msg.role === "assistant" && (
                                    <button
                                        className="ml-2 opacity-60 hover:opacity-100 transition-opacity"
                                        title="Copy"
                                        onClick={() => handleCopy(msg.content, idx)}
                                    >
                                        {copiedIdx === idx ? (
                                            <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
                                                <rect x="3" y="3" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
                                            </svg>
                                        )}
                                    </button>
                                )}
                            </div>
                            <span>{msg.content}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input area */}
            <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full">
                <input
                    className={`flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 min-w-0 ${
                        dark
                            ? "bg-gray-800 text-white border-gray-700 placeholder-gray-400 focus:ring-blue-700"
                            : "bg-yellow-50 text-black border-gray-300 focus:ring-blue-400"
                    }`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={loading}
                    onKeyDown={e => {
                        if (e.key === "Enter" && !loading) sendMessage(e);
                    }}
                />
                <button
                    type="button"
                    className={`w-full sm:w-auto px-5 py-2 rounded-full font-semibold shadow ${
                        dark
                            ? "bg-blue-700 text-white hover:bg-blue-800"
                            : "bg-blue-500 text-white hover:bg-blue-700"
                    }`}
                    disabled={loading}
                    onClick={sendMessage}
                >
                    {loading ? (
                        <svg className="animate-spin h-5 w-5 mx-auto" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                    ) : (
                        <svg className="h-5 w-5 mx-auto" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Chatbot;