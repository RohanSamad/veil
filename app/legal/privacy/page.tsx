import Link from "next/link";

export default function Privacy() {
    return (
        <div className="min-h-screen bg-[#F7F8F5] pt-32 pb-24">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="max-w-3xl mx-auto bg-white border border-[#3A5A5B]/10 rounded-2xl p-8 md:p-16 shadow-sm">
                    <div className="mb-12 text-center">
                        <span className="text-xs font-bold tracking-[0.2em] text-[#9FB3A1] uppercase mb-4 block">
                            Legal Protocol
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif text-[#1F2F33]">Privacy Policy</h1>
                    </div>

                    <div className="prose prose-slate max-w-none text-[#3A5A5B] prose-headings:font-serif prose-headings:text-[#1F2F33] prose-strong:text-[#1F2F33]">
                        <section className="mb-12">
                            <h2 className="text-2xl mt-0">We Don't Store Your Messages</h2>
                            <p className="text-lg">
                                <strong>By default, we do NOT store the raw text of messages you paste into VEIL.</strong>
                            </p>
                            <p>
                                This is a core privacy principle. Your messages are analyzed in real-time and discarded after generation.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2>What We Do Store</h2>
                            <ul>
                                <li><strong>Pattern tags:</strong> Labels like "Silence Anxiety" or "Reactive Escalation"</li>
                                <li><strong>Usage counts:</strong> How many times you've used the tool (for rate limiting)</li>
                                <li><strong>Trace IDs:</strong> Anonymous identifiers for debugging</li>
                                <li><strong>IP addresses:</strong> Temporarily, for rate limiting only (24 hours)</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2>Optional Data Sharing</h2>
                            <p>
                                In future versions, you may opt-in to save scenarios for personalized coaching.
                                This will always be explicit and optional. We will never store your data without your consent.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2>Third-Party Services</h2>
                            <p>We use:</p>
                            <ul>
                                <li><strong>OpenAI:</strong> For message analysis (subject to OpenAI's privacy policy)</li>
                                <li><strong>Vercel:</strong> For hosting and rate limiting</li>
                            </ul>
                            <p>
                                These services process your messages temporarily but do not store them long-term.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2>Your Rights</h2>
                            <p>Because we don't store your messages, there's nothing to delete. For rate limiting data:</p>
                            <ul>
                                <li>IP-based limits reset automatically after 24 hours</li>
                                <li>If you create an account (future), you can delete it anytime</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2>Contact</h2>
                            <p>
                                Questions about privacy? Contact us at: <Link href="mailto:privacy@veil.quest" className="text-[#1F2F33] font-bold hover:underline">privacy@veil.quest</Link>
                            </p>
                        </section>

                        <div className="mt-12 p-8 bg-[#E1E6D8]/30 border border-[#9FB3A1]/20 rounded-xl">
                            <p className="text-[#3A5A5B] text-center italic font-serif text-lg">
                                "We built VEIL to help you, not to collect data about you."
                            </p>
                        </div>

                        <div className="mt-6 p-6 bg-[#F7F8F5] border border-[#3A5A5B]/10 rounded-xl text-center">
                            <p className="text-xs font-bold tracking-widest uppercase text-[#3A5A5B]/50 m-0">
                                Last Updated: January 2, 2026
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
