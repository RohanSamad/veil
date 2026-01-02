export default function Terms() {
    return (
        <div className="min-h-screen bg-[#F7F8F5] pt-32 pb-24">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="max-w-3xl mx-auto bg-white border border-[#3A5A5B]/10 rounded-2xl p-8 md:p-16 shadow-sm">
                    <div className="mb-12 text-center">
                        <span className="text-xs font-bold tracking-[0.2em] text-[#9FB3A1] uppercase mb-4 block">
                            Legal Protocol
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif text-[#1F2F33]">Terms of Service</h1>
                    </div>

                    <div className="prose prose-slate max-w-none text-[#3A5A5B] prose-headings:font-serif prose-headings:text-[#1F2F33] prose-strong:text-[#1F2F33]">
                        <section className="mb-12">
                            <h2 className="text-2xl mt-0">1. What VEIL Is</h2>
                            <p>
                                VEIL is a behavioral clarity tool. It helps you understand emotional patterns in your communication.
                                <strong> It is not therapy, not dating advice, and does not diagnose or treat any condition.</strong>
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2>2. Your Responsibility</h2>
                            <p>
                                You are responsible for your own decisions and communications. VEIL provides perspective, not commands.
                                The final choice is always yours.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2>3. Privacy</h2>
                            <p>
                                By default, we do not store the raw text of messages you paste. We store only:
                            </p>
                            <ul>
                                <li>Anonymized pattern tags</li>
                                <li>Usage counts (for rate limiting)</li>
                                <li>Trace IDs (for debugging)</li>
                            </ul>
                            <p>
                                See our Privacy Policy for full details.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2>4. No Guarantees</h2>
                            <p>
                                VEIL is powered by AI and rules-based logic. While we aim for accuracy, we cannot guarantee:
                            </p>
                            <ul>
                                <li>That our predictions will be correct</li>
                                <li>That your outcomes will match our analysis</li>
                                <li>That following our suggestions will lead to desired results</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2>5. Prohibited Use</h2>
                            <p>You may not use VEIL to:</p>
                            <ul>
                                <li>Manipulate or deceive others</li>
                                <li>Harass, threaten, or abuse anyone</li>
                                <li>Violate any laws or regulations</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2>6. Limitation of Liability</h2>
                            <p>
                                VEIL and its creators are not liable for any outcomes resulting from your use of this tool,
                                including but not limited to relationship outcomes, emotional distress, or any other consequences.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2>7. Changes to Terms</h2>
                            <p>
                                We may update these terms at any time. Continued use constitutes acceptance of updated terms.
                            </p>
                        </section>

                        <div className="mt-12 p-6 bg-[#F7F8F5] border border-[#3A5A5B]/10 rounded-xl text-center">
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
