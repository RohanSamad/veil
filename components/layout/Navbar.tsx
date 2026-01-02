"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <nav className="fixed backdrop-blur-sm b top-0 left-0 right-0 z-50 px-6 py-2 sm:py-6 md:px-12 lg:px-24 pointer-events-none">
                <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
                    {/* Logo */}
                    <Link href="/" className="group flex items-center gap-2 z-50 relative">
                        <div className="w-8 h-8 bg-[#1F2F33] rounded-full flex items-center justify-center text-[#F7F8F5] font-serif italic font-bold text-xl group-hover:scale-110 transition-transform">
                            V
                        </div>
                        <span className="text-[#1F2F33] font-serif font-bold tracking-widest text-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            VEIL
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8 bg-white/40 backdrop-blur-md px-8 py-3 rounded-full border border-[#3A5A5B]/5 shadow-sm">
                        <Link href="/roadtest" className="text-xs font-bold tracking-widest uppercase text-[#3A5A5B] hover:text-[#1F2F33] transition-colors">
                            Road-Test
                        </Link>
                        <div className="w-px h-3 bg-[#3A5A5B]/20" />
                        <Link href="/scenario" className="text-xs font-bold tracking-widest uppercase text-[#3A5A5B] hover:text-[#1F2F33] transition-colors">
                            Scenario
                        </Link>
                        <div className="w-px h-3 bg-[#3A5A5B]/20" />
                        <Link href="/debrief" className="text-xs font-bold tracking-widest uppercase text-[#3A5A5B] hover:text-[#1F2F33] transition-colors">
                            Debrief
                        </Link>
                    </div>

                    {/* Desktop Auth */}
                    <div className="hidden md:flex items-center gap-4">
                        <button className="px-6 py-2 bg-[#3A5A5B] text-[#F7F8F5] text-xs font-bold tracking-widest uppercase rounded-full hover:bg-[#1F2F33] transition-colors shadow-lg shadow-[#3A5A5B]/10">
                            Sign In
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden w-10 h-10 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center text-[#1F2F33] border border-[#3A5A5B]/10 z-50 relative"
                    >
                        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-[#F7F8F5]/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden">
                    <Link
                        href="/roadtest"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-2xl font-serif text-[#1F2F33]"
                    >
                        Road-Test
                    </Link>
                    <Link
                        href="/scenario"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-2xl font-serif text-[#1F2F33]"
                    >
                        Scenario
                    </Link>
                    <Link
                        href="/debrief"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-2xl font-serif text-[#1F2F33]"
                    >
                        Debrief
                    </Link>

                    <div className="w-12 h-px bg-[#3A5A5B]/20 my-8" />

                    <button className="px-12 py-4 bg-[#3A5A5B] text-[#F7F8F5] text-sm font-bold tracking-widest uppercase rounded-full hover:bg-[#1F2F33] transition-colors shadow-xl">
                        Sign In
                    </button>
                </div>
            )}
        </>
    );
}
