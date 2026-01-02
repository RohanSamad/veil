"use client";

import { useState } from "react";
import Link from "next/link";
import { RoadTestResponse } from "@/lib/types";
import { ArrowLeft, Loader2, Sparkles, Copy, Check } from "lucide-react";

export default function RoadTestPage() {
    const [message, setMessage] = useState("");
    const [context, setContext] = useState("");
    const [intensity, setIntensity] = useState(5);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [testMode, setTestMode] = useState(false);

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<RoadTestResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [remaining, setRemaining] = useState<number | null>(null);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        // Prepare payload - only send advanced fields if visible/set
        const payload: any = {
            message,
            local_time: new Date().toISOString(),
        };

        if (showAdvanced) {
            if (context) payload.context = context;
            payload.user_intensity = intensity;
        }

        // Add test mode flag
        if (testMode) {
            payload.test_mode = true;
        }

        try {
            const response = await fetch("/api/road-test", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Something went wrong/System busy.");
                return;
            }

            setResult(data);
            const remainingHeader = response.headers.get("X-RateLimit-Remaining");
            if (remainingHeader) {
                setRemaining(parseInt(remainingHeader));
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const getVerdictStyles = (verdict: string) => {
        switch (verdict) {
            case "send":
                return "bg-[#9FB3A1]/20 border-[#9FB3A1] text-[#1F2F33]"; // Green-ish
            case "wait":
                return "bg-yellow-100/50 border-yellow-400 text-[#1F2F33]"; // Yellow
            case "rewrite":
                return "bg-orange-100/50 border-orange-400 text-[#1F2F33]"; // Orange
            case "hard_stop":
                return "bg-red-100/50 border-red-400 text-[#1F2F33]"; // Red
            default:
                return "bg-[#E1E6D8] border-[#3A5A5B]/20 text-[#3A5A5B]"; // Neutral
        }
    };

    const handleCopy = async (text: string, index: number) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="min-h-screen bg-[#F7F8F5] pt-16 text-[#3A5A5B] font-sans selection:bg-[#9FB3A1]/30">
            <div className="container mx-auto px-6 py-12 md:px-12 lg:px-24">
                {/* Header */}
                <div className="flex justify-between items-center mb-16">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase hover:text-[#1F2F33] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Base
                    </Link>
                    {/* <div className="flex items-center gap-4">
                        <button
                            onClick={() => setTestMode(!testMode)}
                            className={`px-4 py-1.5 rounded-full border text-xs font-bold tracking-widest uppercase transition-all ${testMode
                                    ? 'bg-amber-100 border-amber-400 text-amber-800'
                                    : 'bg-white/50 border-[#3A5A5B]/10 text-[#3A5A5B] hover:bg-white'
                                }`}
                        >
                            {testMode ? ' TEST MODE ON' : 'Test Mode'}
                        </button>
                        {remaining !== null && (
                            <div className="px-4 py-1.5 rounded-full border border-[#3A5A5B]/10 bg-white/50 text-xs font-medium tracking-wide">
                                {remaining} attempts remaining
                            </div>
                        )}
                    </div> */}
                </div>

                <div className="max-w-3xl mx-auto space-y-12">
                    {!result ? (
                        // INPUT STATE
                        <>
                            <div className="text-center space-y-6">
                                <h1 className="text-4xl md:text-5xl font-serif text-[#1F2F33]">
                                    Road-Test Protocol
                                </h1>
                                <p className="text-lg font-light text-[#3A5A5B]/80 max-w-xl mx-auto leading-relaxed">
                                    Paste the text you are rewriting in your head. <br /> We scan it for emotional leakage and strategic error.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                                <div className="relative group">
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type or paste message draft..."
                                        className="w-full h-48 px-6 py-6 bg-white border border-[#3A5A5B]/10 rounded-2xl text-[#1F2F33] placeholder-[#3A5A5B]/40 focus:outline-none focus:border-[#3A5A5B]/30 focus:shadow-xl transition-all resize-none shadow-sm"
                                        required
                                        maxLength={1000}
                                    />
                                    <div className="absolute bottom-4 right-4 text-xs font-medium text-[#3A5A5B]/40">
                                        {message.length}/1000
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowAdvanced(!showAdvanced)}
                                        className="text-xs font-bold tracking-widest uppercase text-[#3A5A5B]/60 hover:text-[#1F2F33] transition-colors"
                                    >
                                        {showAdvanced ? "— Hide Context" : "+ Add Context"}
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={loading || !message}
                                        className="w-full md:w-auto px-12 py-4 bg-[#1F2F33] text-[#F7F8F5] font-medium tracking-widest uppercase rounded-xl hover:bg-[#3A5A5B] hover:shadow-lg hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Run Analysis"}
                                        {!loading && <Sparkles className="w-4 h-4 opacity-50" />}
                                    </button>
                                </div>

                                {showAdvanced && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 animate-in fade-in slide-in-from-top-2">
                                        <div className="space-y-3">
                                            <label className="text-xs font-bold tracking-widest uppercase text-[#9FB3A1]">Context</label>
                                            <input
                                                type="text"
                                                value={context}
                                                onChange={(e) => setContext(e.target.value)}
                                                placeholder="e.g. 3rd date, boss, ex-partner..."
                                                className="w-full px-4 py-3 bg-white border border-[#3A5A5B]/10 rounded-xl text-[#1F2F33] placeholder-[#3A5A5B]/30 focus:outline-none focus:border-[#3A5A5B]/30 transition-all"
                                                maxLength={100}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-bold tracking-widest uppercase text-[#9FB3A1]">Your Intensity (1-10)</label>
                                            <div className="flex items-center gap-4 bg-white border border-[#3A5A5B]/10 rounded-xl p-3 px-4">
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max="10"
                                                    value={intensity}
                                                    onChange={(e) => setIntensity(parseInt(e.target.value))}
                                                    className="w-full h-1 bg-[#E1E6D8] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#3A5A5B]"
                                                />
                                                <span className="text-sm font-serif font-bold text-[#1F2F33] w-6 text-center">{intensity}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {error && (
                                    <div className="p-4 bg-red-100/50 text-red-600 text-sm rounded-xl text-center border border-red-200">
                                        {error}
                                    </div>
                                )}
                            </form>
                        </>
                    ) : (
                        // RESULT STATE
                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">

                            {/* Verdict Card */}
                            <div className={`rounded-3xl p-8 md:p-12 border ${getVerdictStyles(result.verdict.traffic_light)} shadow-sm`}>
                                <div className="flex items-start md:items-center gap-6 mb-8 flex-col md:flex-row">
                                    <div className="text-7xl shadow-sm bg-white/50 w-24 h-24 flex items-center justify-center rounded-2xl">
                                        {result.verdict.traffic_light_emoji}
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-3xl md:text-4xl font-serif font-bold uppercase tracking-tight">
                                            {result.verdict.traffic_light.replace("_", " ")}
                                        </h2>
                                        <div className="flex flex-wrap gap-2 text-xs font-bold tracking-widest uppercase opacity-60">
                                            <span>{result.label.quick_label}</span>
                                            <span>•</span>
                                            <span>{result.label.pattern_tag}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xl md:text-2xl font-light leading-relaxed opacity-90">
                                    {result.verdict.rationale}
                                </p>
                            </div>

                            {/* Rewrites */}
                            {result.rewrites && result.rewrites.length > 0 && (
                                <div className="space-y-8">
                                    <span className="text-xs font-bold tracking-[0.2em] text-[#9FB3A1] uppercase block text-center">
                                        Proposed Alternatives
                                    </span>
                                    <div className="grid grid-cols-1 gap-6">
                                        {result.rewrites.map((rewrite, idx) => (
                                            <div key={idx} className="bg-white p-8 rounded-2xl border border-[#3A5A5B]/10 hover:shadow-lg transition-shadow relative group">
                                                <div className="mb-4 flex items-center justify-between">
                                                    <span className="inline-block px-3 py-1 bg-[#E1E6D8] rounded-full text-[10px] font-bold tracking-widest uppercase text-[#3A5A5B]">
                                                        {rewrite.tone}
                                                    </span>
                                                    <button
                                                        onClick={() => handleCopy(rewrite.text, idx)}
                                                        className="p-2 rounded-lg hover:bg-[#F7F8F5] transition-colors flex items-center gap-2 text-xs font-medium text-[#3A5A5B]"
                                                        title="Copy to clipboard"
                                                    >
                                                        {copiedIndex === idx ? (
                                                            <>
                                                                <Check className="w-4 h-4 text-green-600" />
                                                                <span className="text-green-600">Copied!</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Copy className="w-4 h-4" />
                                                                <span className="opacity-0 group-hover:opacity-100 transition-opacity">Copy</span>
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                                <p className="text-lg text-[#1F2F33] leading-relaxed font-medium">
                                                    "{rewrite.text}"
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Coaching Question */}
                            {result.coaching_question && (
                                <div className="bg-[#3A5A5B] text-[#F7F8F5] p-10 rounded-3xl text-center space-y-6">
                                    <span className="text-xs font-bold tracking-widest uppercase opacity-60">
                                        The Pivot
                                    </span>
                                    <p className="text-2xl md:text-3xl font-serif leading-tight">
                                        "{result.coaching_question}"
                                    </p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex justify-center gap-6 pt-8">
                                <button
                                    onClick={() => {
                                        setResult(null);
                                        setMessage("");
                                        setContext("");
                                        setIntensity(5);
                                    }}
                                    className="group relative px-8 py-4 bg-[#1F2F33] text-[#F7F8F5] text-sm font-medium tracking-widest uppercase transition-all hover:bg-[#3A5A5B] shadow-lg shadow-[#1F2F33]/10"
                                >
                                    Run New Analysis
                                </button>
                            </div>

                            {remaining === 0 && (
                                <p className="text-center text-red-500 text-sm mt-4">
                                    Limit reached. Please restart session.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
