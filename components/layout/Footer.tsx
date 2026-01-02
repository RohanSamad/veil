import Link from "next/link";
import { ArrowUpRight, Github, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#1F2F33] text-[#F7F8F5] py-20 px-6 md:px-12 lg:px-24 border-t border-[#3A5A5B]/20">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24 mb-20">
                    {/* Col 1: Brand */}
                    <div className="md:col-span-2 space-y-8">
                        <Link href="/" className="inline-block">
                            <span className="text-2xl font-serif tracking-tight">VEIL SYSTEMS</span>
                        </Link>
                        <p className="text-[#9FB3A1] font-light leading-relaxed max-w-sm">
                            An intelligence layer for your interpersonal optics.
                            We decode the signal from the noise so you can act with precision, not impulse.
                        </p>
                        <div className="flex gap-4 pt-4">
                            {/* Socials Placeholders */}
                            <div className="w-10 h-10 rounded-full border border-[#F7F8F5]/20 flex items-center justify-center hover:bg-[#F7F8F5] hover:text-[#1F2F33] transition-colors cursor-pointer">
                                <Twitter className="w-4 h-4" />
                            </div>
                            <div className="w-10 h-10 rounded-full border border-[#F7F8F5]/20 flex items-center justify-center hover:bg-[#F7F8F5] hover:text-[#1F2F33] transition-colors cursor-pointer">
                                <Github className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                    {/* Col 2: Protocol */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-bold tracking-[0.2em] text-[#9FB3A1] uppercase mb-4">
                            Protocol
                        </h4>
                        <div className="flex flex-col gap-4">
                            <Link href="/roadtest" className="text-sm text-[#F7F8F5]/80 hover:text-white transition-colors flex items-center justify-between group border-b border-[#F7F8F5]/5 pb-2">
                                Road-Test
                                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            <Link href="/scenario" className="text-sm text-[#F7F8F5]/80 hover:text-white transition-colors flex items-center justify-between group border-b border-[#F7F8F5]/5 pb-2">
                                Scenario
                                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            <Link href="/debrief" className="text-sm text-[#F7F8F5]/80 hover:text-white transition-colors flex items-center justify-between group border-b border-[#F7F8F5]/5 pb-2">
                                Debrief
                                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        </div>
                    </div>

                    {/* Col 3: Legal */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-bold tracking-[0.2em] text-[#9FB3A1] uppercase mb-4">
                            System
                        </h4>
                        <div className="flex flex-col gap-4">
                            <Link href="/legal/terms" className="text-sm text-[#F7F8F5]/50 hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="/legal/privacy" className="text-sm text-[#F7F8F5]/50 hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/legal/crisis" className="text-sm text-[#F7F8F5]/50 hover:text-white transition-colors">
                                Crisis Resources
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="pt-8 border-t border-[#F7F8F5]/10 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest uppercase text-[#F7F8F5]/30">
                    <span>&copy; 2026 VEIL SYSTEMS INC.</span>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span>Systems Operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
