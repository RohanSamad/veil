export default function CrisisResources() {
    return (
        <div className="min-h-screen bg-[#F7F8F5] pt-32 pb-24">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="max-w-3xl mx-auto bg-white border border-[#3A5A5B]/10 rounded-2xl p-8 md:p-16 shadow-sm">
                    <div className="mb-12 text-center">
                        <span className="text-xs font-bold tracking-[0.2em] text-red-800/60 uppercase mb-4 block">
                            Critical Resources
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif text-[#1F2F33]">Crisis Support</h1>
                    </div>

                    <div className="prose prose-slate max-w-none text-[#3A5A5B] prose-headings:font-serif prose-headings:text-[#1F2F33] prose-strong:text-[#1F2F33]">
                        <p className="text-lg mb-8 leading-relaxed">
                            VEIL is a behavioral clarity tool, not a crisis service or mental health treatment.
                            If you're experiencing a crisis, please contact professional help immediately.
                        </p>

                        <div className="space-y-6 not-prose">
                            <div className="bg-red-50 border border-red-100 rounded-xl p-8">
                                <h2 className="text-2xl font-bold text-red-900 mb-4 font-serif">If You're in Danger</h2>
                                <p className="text-red-800/80 mb-4">
                                    <strong>Emergency Services:</strong> Call 911 (US) or your local emergency number immediately.
                                </p>
                            </div>

                            <div className="bg-[#F7F8F5] rounded-xl p-8 border border-[#3A5A5B]/10">
                                <h2 className="text-2xl font-bold text-[#1F2F33] mb-4 font-serif">Suicide Prevention</h2>
                                <ul className="space-y-4 text-[#3A5A5B]">
                                    <li className="block">
                                        <strong className="block text-[#1F2F33]">National Suicide Prevention Lifeline (US):</strong>
                                        <span className="text-xl">988</span> or <span className="text-xl">1-800-273-8255</span><br />
                                        <span className="text-sm opacity-60">24/7 free and confidential support</span>
                                    </li>
                                    <li className="block border-t border-[#3A5A5B]/10 pt-4">
                                        <strong className="block text-[#1F2F33]">Crisis Text Line:</strong>
                                        Text <span className="font-bold">HOME</span> to <span className="font-bold">741741</span> <br />
                                        <span className="text-sm opacity-60">24/7 support via text</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-[#F7F8F5] rounded-xl p-8 border border-[#3A5A5B]/10">
                                <h2 className="text-2xl font-bold text-[#1F2F33] mb-4 font-serif">Domestic Violence</h2>
                                <ul className="space-y-4 text-[#3A5A5B]">
                                    <li>
                                        <strong className="block text-[#1F2F33]">National Domestic Violence Hotline (US):</strong>
                                        <span className="text-xl">1-800-799-7233</span><br />
                                        <span className="text-sm opacity-60">24/7 support for victims of domestic violence</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-[#F7F8F5] rounded-xl p-8 border border-[#3A5A5B]/10">
                                <h2 className="text-2xl font-bold text-[#1F2F33] mb-4 font-serif">Mental Health Support</h2>
                                <ul className="space-y-4 text-[#3A5A5B]">
                                    <li>
                                        <strong className="block text-[#1F2F33]">SAMHSA National Helpline:</strong>
                                        <span className="text-xl">1-800-662-4357</span><br />
                                        <span className="text-sm opacity-60">Treatment referral and information service</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-12 p-8 bg-amber-50 border border-amber-100 rounded-xl">
                            <p className="text-amber-900/80 m-0 text-sm">
                                <strong>Important:</strong> VEIL cannot and does not provide crisis intervention or mental health treatment.
                                These resources are staffed by trained professionals who can help.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
