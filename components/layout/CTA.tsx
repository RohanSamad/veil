import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const CTA = () => {
    return (
        <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#9FB3A1] text-[#1F2F33]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-[#1F2F33]/20 pb-8">
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">
              Initialize Protocol.
            </h2>
            <span className="text-xs font-bold tracking-[0.2em] uppercase mb-2">Select Entry Vector</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1F2F33]/20 border border-[#1F2F33]/20">
            {/* Card 1 */}
            <Link href="/roadtest" className="group relative bg-[#E1E6D8] p-12 h-96 hover:bg-[#F7F8F5] transition-colors flex flex-col justify-between overflow-hidden">
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-6 h-6 -rotate-45" />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase text-[#3A5A5B]">01 / Prevention</span>
              <div className="relative z-10">
                <h3 className="text-3xl font-serif mb-4">Road-Test</h3>
                <p className="font-light text-[#3A5A5B] leading-relaxed">
                  Scan your draft for emotional leakage before you hit send.
                </p>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/scenario" className="group relative bg-[#F7F8F5] p-12 h-96 hover:bg-white transition-colors flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3A5A5B]/5 rounded-bl-[100px] pointer-events-none" />
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-6 h-6 -rotate-45" />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase text-[#3A5A5B]">02 / Analysis</span>
              <div className="relative z-10">
                <h3 className="text-3xl font-serif mb-4">Scenario</h3>
                <p className="font-light text-[#3A5A5B] leading-relaxed">
                  Decode the hidden dynamics of your current situation.
                </p>
              </div>
            </Link>

            {/* Card 3 */}
            <Link href="/debrief" className="group relative bg-[#E1E6D8] p-12 h-96 hover:bg-[#F7F8F5] transition-colors flex flex-col justify-between overflow-hidden">
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-6 h-6 -rotate-45" />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase text-[#3A5A5B]">03 / Learning</span>
              <div className="relative z-10">
                <h3 className="text-3xl font-serif mb-4">Debrief</h3>
                <p className="font-light text-[#3A5A5B] leading-relaxed">
                  Analyze the outcome to recalibrate your strategy.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    )
}

export default CTA