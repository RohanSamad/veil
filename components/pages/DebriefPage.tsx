"use client";

import { useState } from "react";
import Link from "next/link";
import { DebriefResponse } from "@/lib/types";
import { ArrowLeft, Loader2, Sparkles, CheckCircle2, XCircle, HelpCircle, Copy, Check } from "lucide-react";

export default function DebriefPage() {
    const [action, setAction] = useState("");
    const [outcome, setOutcome] = useState("");
    const [match, setMatch] = useState<"yes" | "no" | "unsure">("unsure");

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<DebriefResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copiedSection, setCopiedSection] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/debrief", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action_taken: action, outcome, prediction_match: match }),
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
                        Protocol: The Debrief
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    {!result ? (
                        /* Input View */
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="text-center space-y-6 mb-16">
                                <h1 className="text-4xl md:text-5xl font-serif text-[#1F2F33]">
                                    Close the Loop
                                </h1>
                                <p className="text-lg font-light text-[#3A5A5B]/80 max-w-xl mx-auto leading-relaxed">
                                    Reality is the only data that matters. <br /> Analyze what happened to calibrate your future strategy.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-12">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Box 1: Action */}
                                    <div className="group">
                                        <label className="block text-xs font-bold text-[#9FB3A1] uppercase tracking-widest mb-4 group-focus-within:text-[#3A5A5B] transition-colors">
                                            01 / The Action (What did you do?)
                                        </label>
                                        <input
                                            type="text"
                                            value={action}
                                            onChange={(e) => setAction(e.target.value)}
                                            placeholder="e.g. I sent the text exactly as rewritten."
                                            className="w-full bg-white border border-[#3A5A5B]/10 rounded-xl p-6 text-lg text-[#1F2F33] placeholder-[#3A5A5B]/30 focus:outline-none focus:border-[#3A5A5B]/30 focus:shadow-lg transition-all font-light"
                                            required
                                        />
                                    </div>

                                    {/* Box 2: Outcome */}
                                    <div className="group">
                                        <label className="block text-xs font-bold text-[#9FB3A1] uppercase tracking-widest mb-4 group-focus-within:text-[#3A5A5B] transition-colors">
                                            02 / The Outcome (What happened?)
                                        </label>
                                        <input
                                            type="text"
                                            value={outcome}
                                            onChange={(e) => setOutcome(e.target.value)}
                                            placeholder="e.g. They replied immediately."
                                            className="w-full bg-white border border-[#3A5A5B]/10 rounded-xl p-6 text-lg text-[#1F2F33] placeholder-[#3A5A5B]/30 focus:outline-none focus:border-[#3A5A5B]/30 focus:shadow-lg transition-all font-light"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Box 3: Prediction Match */}
                                <div className="group ">
                                    <label className="block text-xs font-bold text-[#9FB3A1] uppercase tracking-widest mb-6 text-center">
                                        03 / The Prediction (Did it match?)
                                    </label>
                                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                                        {[
                                            { val: "yes", label: "Yes", icon: CheckCircle2 },
                                            { val: "no", label: "No", icon: XCircle },
                                            { val: "unsure", label: "Unsure", icon: HelpCircle }
                                        ].map((opt) => (
                                            <button
                                                key={opt.val}
                                                type="button"
                                                onClick={() => setMatch(opt.val as any)}
                                                className={`px-8 py-4 rounded-xl border transition-all flex items-center gap-3 ${match === opt.val
                                                    ? "bg-[#1F2F33] border-[#1F2F33] text-[#F7F8F5] shadow-lg scale-105"
                                                    : "bg-white border-[#3A5A5B]/10 text-[#3A5A5B] hover:bg-[#F7F8F5]"
                                                    }`}
                                            >
                                                <opt.icon className="w-4 h-4" />
                                                <span className="text-xs font-bold tracking-widest uppercase">{opt.label}</span>
                                            </button>
                                        ))}
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
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Crystallize Lesson"}
                                        {!loading && <Sparkles className="w-4 h-4 opacity-50" />}
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        /* Result View */
                        <div className="animate-in fade-in zoom-in-95 duration-700 space-y-12">

                            <div className="text-center space-y-6">
                                <div className="inline-block px-4 py-1.5 rounded-full border border-[#3A5A5B]/10 bg-white/50 backdrop-blur-sm">
                                    <span className="text-xs font-bold tracking-[0.2em] text-[#9FB3A1] uppercase">
                                        Debrief Complete
                                    </span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-serif text-[#1F2F33] tracking-tight leading-tight">
                                    {result.outcome_label}
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#3A5A5B]/10 border border-[#3A5A5B]/10 rounded-3xl overflow-hidden shadow-sm">

                                {/* 1. The Lesson */}
                                <div className="bg-[#F7F8F5] p-8 md:p-12 md:col-span-2 relative group">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xs font-bold text-[#9FB3A1] uppercase tracking-widest">
                                            The Lesson
                                        </h3>
                                        <button
                                            onClick={() => handleCopy(result.lesson_text, 'lesson')}
                                            className="p-2 rounded-lg hover:bg-[#E1E6D8] transition-colors flex items-center gap-2 text-xs font-medium text-[#3A5A5B]"
                                            title="Copy to clipboard"
                                        >
                                            {copiedSection === 'lesson' ? (
                                                <><Check className="w-4 h-4 text-green-600" /><span className="text-green-600">Copied!</span></>
                                            ) : (
                                                <><Copy className="w-4 h-4" /><span className="opacity-0 group-hover:opacity-100 transition-opacity">Copy</span></>
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-2xl leading-relaxed text-[#1F2F33] font-serif italic max-w-2xl mx-auto text-center">
                                        "{result.lesson_text}"
                                    </p>
                                </div>

                                {/* 2. Next Step */}
                                <div className="bg-[#1F2F33] p-8 md:p-12 md:col-span-2 text-[#F7F8F5] text-center relative group">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xs font-bold text-[#9FB3A1] uppercase tracking-widest flex items-center gap-2 ml-auto mr-auto">
                                            <span className="w-2 h-2 rounded-full bg-[#9FB3A1]"></span>
                                            Next Sovereign Move
                                        </h3>
                                        <button
                                            onClick={() => handleCopy(result.next_step_text, 'nextstep')}
                                            className="p-2 rounded-lg hover:bg-[#3A5A5B] transition-colors flex items-center gap-2 text-xs font-medium text-[#F7F8F5] absolute right-8 top-8"
                                            title="Copy to clipboard"
                                        >
                                            {copiedSection === 'nextstep' ? (
                                                <><Check className="w-4 h-4 text-green-400" /><span className="text-green-400">Copied!</span></>
                                            ) : (
                                                <><Copy className="w-4 h-4" /><span className="opacity-0 group-hover:opacity-100 transition-opacity">Copy</span></>
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-xl md:text-2xl font-light leading-relaxed">
                                        {result.next_step_text}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-center pt-8">
                                <button
                                    onClick={() => setResult(null)}
                                    className="group relative px-8 py-4 bg-[#1F2F33] text-[#F7F8F5] text-sm font-medium tracking-widest uppercase transition-all hover:bg-[#3A5A5B] shadow-lg shadow-[#1F2F33]/10"
                                >
                                    Log New Debrief
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
