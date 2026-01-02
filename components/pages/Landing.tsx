import Link from "next/link";
import { ArrowRight, Activity, Shield, Zap, Wind, Disc } from "lucide-react";
import CTA from "@/components/layout/CTA";

export default function Landing() {
  return (
    <main className="min-h-screen bg-[#F7F8F5] text-[#3A5A5B] font-sans selection:bg-[#9FB3A1]/30">

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 sm:pt-0  min-h-[90vh]  flex items-center justify-between px-6 md:px-12 lg:px-24 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#E1E6D8] rounded-full blur-[120px] opacity-60 pointer-events-none" />
        <div className="absolute bottom-[10%] left-[-10%] w-[40vw] h-[40vw] bg-[#9FB3A1] rounded-full blur-[100px] opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-12">
         

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#1F2F33] leading-[1.1] tracking-tight">
            Clarity, not <br />
            <span className="italic opacity-80">catastrophe.</span>
          </h1>

          <p className="text-xl md:text-2xl font-light leading-relaxed max-w-2xl text-[#3A5A5B]/90">
            A behavioural clarity engine for high-functioning adults. <br />
            Decode the signal. Drop the noise. Reclaim your agency.
          </p>

          <div className="flex flex-wrap gap-8 items-center pt-8">
            <Link
              href="/scenario"
              className="group relative px-8 py-4 bg-[#1F2F33] text-[#F7F8F5] text-sm font-medium tracking-widest uppercase transition-all hover:bg-[#3A5A5B] shadow-lg shadow-[#1F2F33]/10"
            >
              Enter The System
              <ArrowRight className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/roadtest"
              className="text-sm font-medium tracking-widest uppercase text-[#3A5A5B] border-b border-transparent hover:border-[#3A5A5B] transition-all pb-1"
            >
              Road-Test a Message
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
          <img className=" w-[500px]  " src="/sd.png" alt="" />
        </div>
      </section>

      {/* 2. EXPLANATION SECTION */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-white/40 backdrop-blur-sm border-y border-[#3A5A5B]/5">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="space-y-6">
            <span className="text-xs font-bold tracking-[0.2em] text-[#9FB3A1] uppercase">The Problem</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1F2F33] leading-tight">
              You act on what you feel. <br />
              But what you feel is often a loop.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 text-lg font-light leading-relaxed text-[#3A5A5B]">
            <div className="space-y-8">
              <p>
                <strong className="text-[#1F2F33] font-medium">The emotional brain is fast, but it is often wrong.</strong><br />
                When you feel "ignored" or "anxious" in a relationship, your nervous system fires an ancient survival protocol. It screams at you to *fix it immediately*—usually by over-texting, freezing, or attacking. This is not intuition. It is a trauma loop.
              </p>
              <p>
                We mistake urgency for truth. We try to solve an internal feeling (anxiety) with an external action (demanding a reply). This never works.
              </p>
            </div>

            <div className="space-y-8">
              <p>
                <strong className="text-[#1F2F33] font-medium">VEIL is a Clarity Engine.</strong><br />
                We built a layer of intelligence that sits between your impulse and your action. It is not AI "therapy"—it is a tactical behavioral analyst.
              </p>
              <p>
                It reads the raw data of your situation (the texts, the context, the silence) and applies rigorous psychological systems theory to label the dynamic instantly. It separates the <strong>Signal</strong> (what is actually happening) from the <strong>Noise</strong> (what you fear is happening).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <span className="text-xs font-bold tracking-[0.2em] text-[#9FB3A1] uppercase block mb-4">
              The Methodology
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1F2F33]">
              From Reaction to Response
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
            <div className="space-y-6 relative group">
              <div className="w-16 h-16 rounded-full bg-[#E1E6D8] flex items-center justify-center text-[#1F2F33] mb-8 group-hover:scale-110 transition-transform duration-700">
                <Wind className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="text-xl font-serif text-[#1F2F33]">1. Pause the Loop</h3>
              <p className="font-light leading-relaxed">
                Before you send the text or make the move, input the dynamic. We interrupt the automatic firing sequence of your nervous system.
              </p>
            </div>

            <div className="space-y-6 relative group">
              <div className="w-16 h-16 rounded-full bg-[#E1E6D8] flex items-center justify-center text-[#1F2F33] mb-8 group-hover:scale-110 transition-transform duration-700 delay-100">
                <Disc className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="text-xl font-serif text-[#1F2F33]">2. The Mirror</h3>
              <p className="font-light leading-relaxed">
                See the pattern labeled clearly. "The Justice Trap." "The Anxious Pursuit." We name the game you are unconsciously playing.
              </p>
            </div>

            <div className="space-y-6 relative group">
              <div className="w-16 h-16 rounded-full bg-[#E1E6D8] flex items-center justify-center text-[#1F2F33] mb-8 group-hover:scale-110 transition-transform duration-700 delay-200">
                <Activity className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="text-xl font-serif text-[#1F2F33]">3. Sovereign Choice</h3>
              <p className="font-light leading-relaxed">
                Receive a micro-plan designed to restore dignity and agency. Action becomes a choice, not a compulsion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5 PHILOSOPHY DARK CARD */}
      <section className="py-12 px-6 md:px-12 lg:px-24">
        <div className="bg-[#3A5A5B] rounded-[2rem] p-12 md:p-24 text-[#F7F8F5] relative overflow-hidden">
          {/* Decorative Orb */}
          <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-[#9FB3A1] rounded-full blur-[100px] opacity-20 pointer-events-none translate-x-1/2 -translate-y-1/2" />

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#F7F8F5]/20 bg-[#F7F8F5]/5 backdrop-blur-sm">
              <span className="text-xs font-medium tracking-[0.2em] text-[#9FB3A1] uppercase">
                The Core Thesis
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif leading-tight">
              "You are not broken. <br /> You are just noisy."
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left pt-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium tracking-widest uppercase text-[#9FB3A1]">The Signal</h3>
                <p className="font-light text-[#F7F8F5]/80 leading-relaxed">
                  Your emotions are valid data points. Anger detects boundaries. Anxiety detects risk. Sadness detects loss. The feeling itself is true.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium tracking-widest uppercase text-[#E1E6D8]">The Noise</h3>
                <p className="font-light text-[#F7F8F5]/80 leading-relaxed">
                  The *reaction* is often a false flag. You text to fix the anxiety, not the relationship. You fight to feel safe, not to be heard. VEIL separates the two.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE INTELLIGENCE SUITE */}
      <section className="py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-24">
          <div className="text-center">
            <span className="text-xs font-bold tracking-[0.2em] text-[#9FB3A1] uppercase block mb-4">
              The Toolkit
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1F2F33]">
              Three Vectors of Clarity
            </h2>
          </div>

          <div className="space-y-32">
            {/* Feature 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 order-2 md:order-1">
                <div className="flex items-center gap-4">
                  <Shield className="w-6 h-6 text-[#3A5A5B]" />
                  <h3 className="text-2xl font-serif text-[#1F2F33]">The Road-Test</h3>
                </div>
                <p className="text-lg font-light leading-relaxed text-[#3A5A5B]">
                  Before you send that high-stakes text, run it through the filter. It scans for subtext, passive-aggression, and emotional leakage, rewriting your words to maximize dignity and minimize regret.
                </p>
                <Link href="/roadtest" className="inline-block text-xs font-bold tracking-widest uppercase border-b border-[#3A5A5B] pb-1 hover:text-[#1F2F33]">
                  Test A Message
                </Link>
              </div>
              <div className="h-64 bg-[#E1E6D8]/50 rounded-xl relative order-1 md:order-2 overflow-hidden border border-[#3A5A5B]/5">
                <div className="absolute inset-0 flex items-center justify-center text-[#3A5A5B]/20 font-serif text-6xl">01</div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="h-64 bg-[#E1E6D8]/50 rounded-xl relative overflow-hidden border border-[#3A5A5B]/5">
                <div className="absolute inset-0 flex items-center justify-center text-[#3A5A5B]/20 font-serif text-6xl">02</div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Disc className="w-6 h-6 text-[#3A5A5B]" />
                  <h3 className="text-2xl font-serif text-[#1F2F33]">The Mirror</h3>
                </div>
                <p className="text-lg font-light leading-relaxed text-[#3A5A5B]">
                  You explain the situation. We reveal the dynamic. By naming the psychological game you are playing (e.g., "The Justice Trap"), you instantly stop being a pawn in it.
                </p>
                <Link href="/scenario" className="inline-block text-xs font-bold tracking-widest uppercase border-b border-[#3A5A5B] pb-1 hover:text-[#1F2F33]">
                  Run Scenario
                </Link>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 order-2 md:order-1">
                <div className="flex items-center gap-4">
                  <Zap className="w-6 h-6 text-[#3A5A5B]" />
                  <h3 className="text-2xl font-serif text-[#1F2F33]">The Debrief</h3>
                </div>
                <p className="text-lg font-light leading-relaxed text-[#3A5A5B]">
                  The interaction is over. Now, close the learning loop. Analyze your move and the outcome to see if you maintained sovereignty or succumbed to the pattern.
                </p>
                <Link href="/debrief" className="inline-block text-xs font-bold tracking-widest uppercase border-b border-[#3A5A5B] pb-1 hover:text-[#1F2F33]">
                  Start Debrief
                </Link>
              </div>
              <div className="h-64 bg-[#E1E6D8]/50 rounded-xl relative order-1 md:order-2 overflow-hidden border border-[#3A5A5B]/5">
                <div className="absolute inset-0 flex items-center justify-center text-[#3A5A5B]/20 font-serif text-6xl">03</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE ANTI-PITCH */}
      <section className="py-32 px-6 md:px-12 lg:px-24 border-y border-[#3A5A5B]/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-xs font-bold tracking-[0.2em] text-[#9FB3A1] uppercase block mb-4">
              Distinctions
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1F2F33]">
              What VEIL Is Not.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#3A5A5B]/10">
            {/* Item 1 */}
            <div className="py-8 md:py-0 md:pr-12 space-y-6">
              <span className="text-xs font-bold tracking-widest text-[#1F2F33] block border-b border-[#3A5A5B]/10 pb-2 w-fit">01</span>
              <h3 className="text-2xl font-serif text-[#1F2F33]">Not a Therapist.</h3>
              <p className="text-[#3A5A5B] font-light leading-relaxed">
                We do not heal trauma. We clarify current behavior. It is a tactical tool, not a clinical one.
              </p>
            </div>

            {/* Item 2 */}
            <div className="py-8 md:py-0 md:px-12 space-y-6">
              <span className="text-xs font-bold tracking-widest text-[#1F2F33] block border-b border-[#3A5A5B]/10 pb-2 w-fit">02</span>
              <h3 className="text-2xl font-serif text-[#1F2F33]">Not a Friend.</h3>
              <p className="text-[#3A5A5B] font-light leading-relaxed">
                Friends validate your feelings to make you feel safe. We validate your reality to make you effective.
              </p>
            </div>

            {/* Item 3 */}
            <div className="py-8 md:py-0 md:pl-12 space-y-6">
              <span className="text-xs font-bold tracking-widest text-[#1F2F33] block border-b border-[#3A5A5B]/10 pb-2 w-fit">03</span>
              <h3 className="text-2xl font-serif text-[#1F2F33]">Not an Oracle.</h3>
              <p className="text-[#3A5A5B] font-light leading-relaxed">
                We do not predict the future magically. We predict it mechanically, based on human systems theory.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHO IT'S FOR */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#E1E6D8]/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1F2F33] mb-8">
              Built for the <br />
              <span className="italic opacity-70">Functional Adult.</span>
            </h2>
          </div>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="mt-1 w-2 h-2 rounded-full bg-[#3A5A5B]" />
              <p className="text-lg font-light leading-relaxed">
                For those who are high-performing in their career but find themselves baffled by the chaos of their interpersonal dynamics.
              </p>
            </div>
            <div className="flex gap-6 items-start">
              <div className="mt-1 w-2 h-2 rounded-full bg-[#3A5A5B]" />
              <p className="text-lg font-light leading-relaxed">
                For those tired of "venting" to friends who just agree with them. You don't want validation; you want the truth.
              </p>
            </div>
            <div className="flex gap-6 items-start">
              <div className="mt-1 w-2 h-2 rounded-full bg-[#3A5A5B]" />
              <p className="text-lg font-light leading-relaxed">
                For those who suspect that *they* might be the common denominator in their own problems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SIGNALS */}
      <section className="py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-[#1F2F33]">
              When to Open VEIL
            </h2>
          </div>
          <div className="space-y-1">
            {["It is 11:45 PM and you are staring at 'Online'.", "You have rewritten the text 4 times.", "You feel a sudden drop in your stomach when the phone buzzes.", "You are constructing a 'case' to prove you are right.", "You feel the urge to explain yourself to someone who isn't listening."].map((signal, i) => (
              <div key={i} className="py-8 border-b border-[#3A5A5B]/10 flex gap-6 items-center group cursor-default hover:bg-[#F7F8F5] transition-colors">
                <span className="text-xs font-bold text-[#9FB3A1] tracking-widest uppercase">Signal {i + 1}</span>
                <p className="text-xl md:text-2xl font-light text-[#3A5A5B] group-hover:text-[#1F2F33] transition-colors">{signal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. THE SCIENCE (Image + Text) */}
      <section className="py-32 px-6 md:px-12 lg:px-24 border-t border-[#3A5A5B]/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[600px] bg-[#E1E6D8] rounded-2xl overflow-hidden group">
            {/* Placeholder for Image */}
            <div className="absolute inset-0 bg-[#3A5A5B]/10 flex items-center justify-center text-[#3A5A5B]/30 font-serif italic text-2xl group-hover:scale-105 transition-transform duration-700">
              <img src="/brainn.png" alt="Interface" className="object-cover w-full h-full opacity-80 mix-blend-multiply" />
            </div>
          </div>
          <div className="space-y-8">
            <span className="text-xs font-bold tracking-[0.2em] text-[#9FB3A1] uppercase">The Science</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1F2F33] leading-tight">
              Biology is not Destiny.
            </h2>
            <div className="space-y-6 text-lg font-light text-[#3A5A5B] leading-relaxed">
              <p>
                Your nervous system is designed to keep you safe, not to keep you happy. It tracks threats 100x faster than it tracks safety.
              </p>
              <p>
                This is why you spiral. Your amygdala hijacks your prefrontal cortex. VEIL simply helps you hand the controls back to the pilot.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div >
      </div>
    </main>
  );
}
