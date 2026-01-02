"use client";

import { useState } from "react";
import Link from "next/link";
import { ScenarioResponse } from "@/lib/types";
import { ArrowLeft, Loader2, Sparkles, Octagon, Eye, ArrowRight, Copy, Check } from "lucide-react";

export default function ScenarioPage() {
    const [situation, setSituation] = useState("");
    const [feeling, setFeeling] = useState("");
    const [intent, setIntent] = useState("");

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ScenarioResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copiedSection, setCopiedSection] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/scenario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ situation, feeling, intent }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Something went wrong");
                return;
            }

            setResult(data);
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async (text: string, section: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedSection(section);
            setTimeout(() => setCopiedSection(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="min-h-screen pt-16 bg-[#F7F8F5] text-[#3A5A5B] font-sans selection:bg-[#9FB3A1]/30">
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
                    <div className="text-xs font-bold tracking-[0.2em] text-[#9FB3A1] uppercase">
                        Protocol: The Mirror
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    {!result ? (
                        /* Input View */
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="text-center space-y-6 mb-16">
                                <h1 className="text-4xl md:text-5xl font-serif text-[#1F2F33]">
                                    Describe the Dynamic
                                </h1>
                                <p className="text-lg font-light text-[#3A5A5B]/80 max-w-xl mx-auto leading-relaxed">
                                    We do not provide comfort. We provide clarity. <br /> Describe the situation to see the structure.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-12">
                                {/* Box 1: Situation */}
                                <div className="group">
                                    <label className="block text-xs font-bold text-[#9FB3A1] uppercase tracking-widest mb-4 group-focus-within:text-[#3A5A5B] transition-colors">
                                        01 / The Reality (What happened?)
                                    </label>
                                    <textarea
                                        value={situation}
                                        onChange={(e) => setSituation(e.target.value)}
                                        placeholder="e.g. He has been silent for 3 days after I asked for more time together..."
                                        className="w-full h-32 bg-white border border-[#3A5A5B]/10 rounded-2xl p-6 text-lg text-[#1F2F33] placeholder-[#3A5A5B]/30 focus:outline-none focus:border-[#3A5A5B]/30 focus:shadow-lg transition-all resize-none font-light"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Box 2: Feeling */}
                                    <div className="group">
                                        <label className="block text-xs font-bold text-[#9FB3A1] uppercase tracking-widest mb-4 group-focus-within:text-[#3A5A5B] transition-colors">
                                            02 / The Sensation (What do you feel?)
                                        </label>
                                        <input
                                            type="text"
                                            value={feeling}
                                            onChange={(e) => setFeeling(e.target.value)}
                                            placeholder="e.g. Panicked, small, angry..."
                                            className="w-full bg-white border border-[#3A5A5B]/10 rounded-xl p-6 text-lg text-[#1F2F33] placeholder-[#3A5A5B]/30 focus:outline-none focus:border-[#3A5A5B]/30 focus:shadow-lg transition-all font-light"
                                            required
                                        />
                                    </div>

                                    {/* Box 3: Intent */}
                                    <div className="group">
                                        <label className="block text-xs font-bold text-[#9FB3A1] uppercase tracking-widest mb-4 group-focus-within:text-[#3A5A5B] transition-colors">
                                            03 / The Impulse (What do you want to do?)
                                        </label>
                                        <input
                                            type="text"
                                            value={intent}
                                            onChange={(e) => setIntent(e.target.value)}
                                            placeholder="e.g. Demand answers..."
                                            className="w-full bg-white border border-[#3A5A5B]/10 rounded-xl p-6 text-lg text-[#1F2F33] placeholder-[#3A5A5B]/30 focus:outline-none focus:border-[#3A5A5B]/30 focus:shadow-lg transition-all font-light"
                                            required
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-4 bg-red-100/50 text-red-600 text-sm rounded-xl text-center border border-red-200">
                                        {error}
                                    </div>
                                )}

                                <div className="flex justify-center pt-8">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-12 py-4 bg-[#1F2F33] text-[#F7F8F5] font-medium tracking-widest uppercase rounded-xl hover:bg-[#3A5A5B] hover:shadow-lg hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Reveal The Dynamic"}
                                        {!loading && <Sparkles className="w-4 h-4 opacity-50" />}
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        /* Result View */
                        <div className="animate-in fade-in zoom-in-95 duration-700 space-y-12">
                            {/* The Pattern Label */}
                            <div className="text-center space-y-6">
                                <div className="inline-block px-4 py-1.5 rounded-full border border-[#3A5A5B]/10 bg-white/50 backdrop-blur-sm">
                                    <span className="text-xs font-bold tracking-[0.2em] text-[#9FB3A1] uppercase">
                                        Pattern Recognized
                                    </span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-serif text-[#1F2F33] tracking-tight leading-tight">
                                    {result.pattern_label}
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#3A5A5B]/10 border border-[#3A5A5B]/10 rounded-3xl overflow-hidden shadow-sm">
                                {/* 1. The Mirror */}
                                <div className="bg-[#F7F8F5] p-8 md:p-12 hover:bg-white transition-colors relative group">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xs font-bold text-[#9FB3A1] uppercase tracking-widest">
                                            The Mirror
                                        </h3>
                                        <button
                                            onClick={() => handleCopy(result.mirror_text, 'mirror')}
                                            className="p-2 rounded-lg hover:bg-[#E1E6D8] transition-colors flex items-center gap-2 text-xs font-medium text-[#3A5A5B]"
                                            title="Copy to clipboard"
                                        >
                                            {copiedSection === 'mirror' ? (
                                                <><Check className="w-4 h-4 text-green-600" /><span className="text-green-600">Copied!</span></>
                                            ) : (
                                                <><Copy className="w-4 h-4" /><span className="opacity-0 group-hover:opacity-100 transition-opacity">Copy</span></>
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-xl leading-relaxed text-[#1F2F33] font-serif italic">
                                        "{result.mirror_text}"
                                    </p>
                                </div>

                                {/* 2. The Prediction */}
                                <div className="bg-[#E1E6D8]/30 p-8 md:p-12 hover:bg-[#E1E6D8]/50 transition-colors relative group">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xs font-bold text-[#9FB3A1] uppercase tracking-widest">
                                            The Projection
                                        </h3>
                                        <button
                                            onClick={() => handleCopy(result.prediction_text, 'prediction')}
                                            className="p-2 rounded-lg hover:bg-[#F7F8F5] transition-colors flex items-center gap-2 text-xs font-medium text-[#3A5A5B]"
                                            title="Copy to clipboard"
                                        >
                                            {copiedSection === 'prediction' ? (
                                                <><Check className="w-4 h-4 text-green-600" /><span className="text-green-600">Copied!</span></>
                                            ) : (
                                                <><Copy className="w-4 h-4" /><span className="opacity-0 group-hover:opacity-100 transition-opacity">Copy</span></>
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-xl leading-relaxed text-[#3A5A5B] font-light">
                                        {result.prediction_text}
                                    </p>
                                </div>

                                {/* 3. The EmCo Move */}
                                <div className="bg-[#1F2F33] p-8 md:p-12 md:col-span-2 text-[#F7F8F5] relative group">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xs font-bold text-[#9FB3A1] uppercase tracking-widest flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-[#9FB3A1]"></span>
                                            The Sovereign Move
                                        </h3>
                                        <button
                                            onClick={() => handleCopy(result.emco_move, 'emco')}
                                            className="p-2 rounded-lg hover:bg-[#3A5A5B] transition-colors flex items-center gap-2 text-xs font-medium text-[#F7F8F5]"
                                            title="Copy to clipboard"
                                        >
                                            {copiedSection === 'emco' ? (
                                                <><Check className="w-4 h-4 text-green-400" /><span className="text-green-400">Copied!</span></>
                                            ) : (
                                                <><Copy className="w-4 h-4" /><span className="opacity-0 group-hover:opacity-100 transition-opacity">Copy</span></>
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-2xl md:text-3xl font-light leading-relaxed">
                                        {result.emco_move}
                                    </p>
                                </div>
                            </div>

                            {/* 4. Micro-Plan */}
                            <div className="bg-white border border-[#3A5A5B]/10 rounded-3xl p-8 md:p-12 shadow-sm">
                                <h3 className="text-xs font-bold text-[#9FB3A1] uppercase tracking-widest mb-12 text-center">
                                    Micro-Plan (Next 2 Hours)
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#3A5A5B]/10">
                                    {result.micro_plan.map((step, i) => (
                                        <div key={i} className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
                                            <div className="mb-6 p-4 rounded-full bg-[#F7F8F5] text-[#3A5A5B]">
                                                {i === 0 && <Octagon className="w-6 h-6" />}
                                                {i === 1 && <Eye className="w-6 h-6" />}
                                                {i === 2 && <ArrowRight className="w-6 h-6" />}
                                            </div>
                                            <div className="text-[10px] font-bold tracking-widest uppercase text-[#3A5A5B]/40 mb-3">
                                                Step 0{i + 1}
                                            </div>
                                            <p className="text-[#1F2F33] font-medium text-lg">{step.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-center pt-8">
                                <button
                                    onClick={() => setResult(null)}
                                    className="group relative px-8 py-4 bg-[#1F2F33] text-[#F7F8F5] text-sm font-medium tracking-widest uppercase transition-all hover:bg-[#3A5A5B] shadow-lg shadow-[#1F2F33]/10"
                                >
                                    Analyze New Scenario
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
