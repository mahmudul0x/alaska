import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Check, Calendar, Users, CreditCard, Phone, Mail,
  ChevronRight, Anchor, Bed, Utensils, Camera, Shield, ArrowRight,
} from "lucide-react";
import img109 from "@/assets/109.jpeg";
import img110 from "@/assets/110.jpeg";
import img103 from "@/assets/103.jpeg";

export const Route = createFileRoute("/booking")({
  component: Booking,
  head: () => ({
    meta: [
      { title: "Book Your Voyage — MV Alaska Cruise" },
      { name: "description", content: "Reserve your luxury Sundarbans cruise. Choose dates, cabin, package, and payment method." },
    ],
  }),
});

const steps = [
  { label: "Voyage", icon: Anchor },
  { label: "Cabin", icon: Bed },
  { label: "Guests", icon: Users },
  { label: "Payment", icon: CreditCard },
] as const;

function Booking() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="min-h-screen gradient-ocean flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl w-full text-center"
        >
          <div className="size-24 rounded-full gradient-gold grid place-items-center mx-auto shadow-gold mb-8">
            <Check className="size-12 text-ocean" strokeWidth={2.5} />
          </div>
          <div className="eyebrow text-gold-soft mb-4">Reservation confirmed</div>
          <h2 className="font-display text-5xl md:text-6xl text-background font-light">Bon voyage.</h2>
          <p className="mt-6 text-background/70 text-lg leading-relaxed max-w-md mx-auto">
            Our concierge will call you within 2 hours to confirm your booking and process your advance payment.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="px-8 py-4 rounded-full gradient-gold text-ocean text-xs uppercase tracking-[0.2em] font-semibold shadow-gold hover-lift">
              Return Home
            </Link>
            <Link to="/contact" className="px-8 py-4 rounded-full border border-white/25 text-background text-xs uppercase tracking-[0.2em] hover:border-gold hover:text-gold transition-colors">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ── Split hero header ── */}
      <div className="relative h-[45svh] min-h-80 overflow-hidden">
        <img src={img109} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-r from-ocean/90 via-ocean/70 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-ocean/80 via-transparent to-ocean/40" />
        <div className="relative z-10 h-full container-luxe flex flex-col justify-end pb-12 pt-32">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="eyebrow text-gold-soft mb-3">◆ Reservations
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-background text-[clamp(2rem,6vw,5rem)] font-light leading-tight">
            Begin your <em className="not-italic text-gradient-gold">voyage.</em>
          </motion.h1>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="container-luxe py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 xl:gap-20">

          {/* ── Left: form ── */}
          <div className="lg:col-span-7 xl:col-span-8">

            {/* Step indicators */}
            <div className="flex items-center gap-0 mb-12">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const active = i === step;
                const done = i < step;
                return (
                  <div key={s.label} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-2">
                      <div className={`size-12 rounded-full grid place-items-center transition-all duration-500 ${
                        done ? "gradient-gold shadow-gold" : active ? "bg-ocean shadow-luxe" : "bg-muted"
                      }`}>
                        {done
                          ? <Check className="size-5 text-ocean" strokeWidth={2.5} />
                          : <Icon className={`size-5 ${active ? "text-background" : "text-muted-foreground"}`} />}
                      </div>
                      <span className={`eyebrow text-[9px] ${active ? "text-ocean" : done ? "text-gold" : "text-muted-foreground"}`}>
                        {s.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`flex-1 h-px mx-3 mb-5 transition-colors duration-500 ${i < step ? "bg-gold" : "bg-border"}`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.35 }}
              >
                {step === 0 && <StepVoyage />}
                {step === 1 && <StepCabin />}
                {step === 2 && <StepGuests />}
                {step === 3 && <StepPayment />}
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="mt-10 flex items-center justify-between pt-8 border-t border-border">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm text-foreground hover:border-gold hover:text-gold disabled:opacity-25 disabled:pointer-events-none transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={() => step === steps.length - 1 ? setDone(true) : setStep((s) => s + 1)}
                className="flex items-center gap-2 px-8 py-3.5 rounded-full gradient-gold text-ocean text-xs uppercase tracking-[0.2em] font-semibold shadow-gold hover-lift"
              >
                {step === steps.length - 1 ? "Confirm Booking" : "Continue"}
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>

          {/* ── Right: sidebar ── */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">

            {/* Booking summary card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="rounded-2xl overflow-hidden border border-border shadow-luxe"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={img110} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-ocean to-ocean/30" />
                <div className="absolute bottom-4 left-5">
                  <div className="eyebrow text-gold-soft text-[10px]">Your booking</div>
                  <div className="font-display text-2xl text-background mt-1">MV Alaska Cruise</div>
                </div>
              </div>
              <div className="bg-card p-5 space-y-3">
                {[
                  { label: "Package", value: "Signature Voyage" },
                  { label: "Cabin", value: "Premier Balcony Suite" },
                  { label: "Duration", value: "3 nights" },
                  { label: "Guests", value: "2 Adults" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{r.label}</span>
                    <span className="font-medium">{r.value}</span>
                  </div>
                ))}
                <div className="pt-3 mt-1 border-t border-border flex justify-between items-baseline">
                  <span className="eyebrow text-[10px] text-muted-foreground">Total (25% advance)</span>
                  <span className="font-display text-2xl text-gold">৳ 21,500</span>
                </div>
              </div>
            </motion.div>

            {/* Why book card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="rounded-2xl border border-border bg-card p-6 space-y-4"
            >
              <div className="eyebrow text-gold text-[10px]">Why book direct</div>
              {[
                { icon: Shield, text: "Best price guarantee — no third-party fees" },
                { icon: Phone, text: "24/7 concierge support via phone & WhatsApp" },
                { icon: Utensils, text: "All meals included in every package" },
                { icon: Camera, text: "Complimentary wildlife expedition guide" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Icon className="size-4 text-gold shrink-0 mt-0.5" />
                  {text}
                </div>
              ))}
            </motion.div>

            {/* Contact card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="eyebrow text-gold text-[10px] mb-4">Need help booking?</div>
              <div className="space-y-3 text-sm">
                <a href="tel:+8801831694307" className="flex items-center gap-3 text-foreground hover:text-gold transition-colors">
                  <div className="size-8 rounded-full bg-ocean/10 grid place-items-center shrink-0">
                    <Phone className="size-3.5 text-gold" />
                  </div>
                  +880 1831-694307
                </a>
                <a href="mailto:mvalaskacruise@gmail.com" className="flex items-center gap-3 text-foreground hover:text-gold transition-colors">
                  <div className="size-8 rounded-full bg-ocean/10 grid place-items-center shrink-0">
                    <Mail className="size-3.5 text-gold" />
                  </div>
                  mvalaskacruise@gmail.com
                </a>
              </div>
            </motion.div>

            {/* Cabin preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="rounded-2xl overflow-hidden relative h-40 group cursor-pointer"
            >
              <img src={img103} alt="" className="absolute inset-0 h-full w-full object-cover image-zoom" />
              <div className="absolute inset-0 bg-ocean/50 group-hover:bg-ocean/40 transition-colors" />
              <Link to="/cabins" className="absolute inset-0 flex items-center justify-center gap-2 text-background text-xs uppercase tracking-[0.2em] font-semibold eyebrow">
                Browse all cabins <ChevronRight className="size-3.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 1: Voyage ── */
function StepVoyage() {
  const packages = [
    { name: "Signature Voyage", duration: "3 nights", price: "৳ 28,500", icon: Anchor, desc: "The complete Sundarbans circuit" },
    { name: "Couple's Escape", duration: "2 nights", price: "৳ 36,800", icon: Bed, desc: "Romance package with private dining" },
    { name: "Family Discovery", duration: "4 nights", price: "৳ 24,200", icon: Users, desc: "Kid-friendly with guided activities" },
    { name: "Photographer's Expedition", duration: "5 nights", price: "৳ 42,500", icon: Camera, desc: "Dawn safaris & specialist wildlife access" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-display text-4xl">Choose your voyage</h2>
        <p className="mt-2 text-muted-foreground">Select departure dates and your ideal package.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Departure date" type="date" icon={Calendar} />
        <Field label="Return date" type="date" icon={Calendar} />
      </div>

      <div>
        <div className="eyebrow text-muted-foreground text-[10px] mb-4">Select package</div>
        <div className="grid sm:grid-cols-2 gap-3">
          {packages.map((p) => {
            const Icon = p.icon;
            return (
              <label key={p.name}
                className="relative p-5 rounded-2xl border border-border cursor-pointer hover:border-gold/60 transition-all has-checked:border-gold has-checked:bg-ocean/5 group"
              >
                <input type="radio" name="package" className="sr-only" defaultChecked={p.name === "Signature Voyage"} />
                <div className="flex items-start justify-between gap-3">
                  <div className="size-9 rounded-xl bg-ocean/8 grid place-items-center shrink-0 group-has-checked:bg-gold/15">
                    <Icon className="size-4 text-ocean group-has-checked:text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm leading-snug">{p.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{p.desc}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="font-display text-lg">{p.price}</span>
                      <span className="text-xs text-muted-foreground">· {p.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 size-4 rounded-full border-2 border-border group-has-checked:border-gold group-has-checked:bg-gold transition-all" />
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Step 2: Cabin ── */
function StepCabin() {
  const cabins = [
    { name: "Premier Balcony Suite", size: "32 m²", occ: "2 Adults", price: "৳ 14,500", img: img103, tag: "Most popular" },
    { name: "Panorama View Cabin",   size: "26 m²", occ: "2 Adults", price: "৳ 11,200", img: img103, tag: "" },
    { name: "Family Suite",          size: "44 m²", occ: "4 Adults", price: "৳ 22,800", img: img109, tag: "Best for families" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-display text-4xl">Select your cabin</h2>
        <p className="mt-2 text-muted-foreground">Every cabin is river-facing with private en-suite.</p>
      </div>
      <div className="space-y-4">
        {cabins.map((c) => (
          <label key={c.name}
            className="flex gap-4 p-4 rounded-2xl border border-border cursor-pointer hover:border-gold/60 transition-all has-checked:border-gold has-checked:bg-ocean/5 group"
          >
            <input type="radio" name="cabin" className="sr-only" defaultChecked={c.name === "Premier Balcony Suite"} />
            <img src={c.img} alt={c.name} className="size-20 rounded-xl object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-display text-xl leading-tight">{c.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{c.size} · {c.occ}</div>
                </div>
                {c.tag && (
                  <span className="shrink-0 px-2 py-0.5 rounded-full bg-gold/15 text-gold eyebrow text-[9px]">{c.tag}</span>
                )}
              </div>
              <div className="mt-2 font-display text-xl text-ocean">{c.price}<span className="text-xs text-muted-foreground font-sans ml-1">/ night</span></div>
            </div>
            <div className="size-5 rounded-full border-2 border-border self-center shrink-0 group-has-checked:border-gold group-has-checked:bg-gold transition-all" />
          </label>
        ))}
      </div>
    </div>
  );
}

/* ── Step 3: Guests ── */
function StepGuests() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-display text-4xl">Guest details</h2>
        <p className="mt-2 text-muted-foreground">We'll prepare your suite to your preferences.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Full name" placeholder="Your full name" />
        <Field label="Email address" type="email" placeholder="email@example.com" />
        <Field label="Phone / WhatsApp" placeholder="+880 ..." icon={Phone} />
        <Field label="Number of guests" type="number" placeholder="2" icon={Users} />
      </div>
      <div>
        <label className="eyebrow text-muted-foreground text-[10px] block mb-2">Special requests</label>
        <textarea
          rows={4}
          placeholder="Dietary requirements, anniversary arrangement, accessibility needs…"
          className="w-full bg-background border border-border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-gold resize-none placeholder:text-muted-foreground/60 transition-colors"
        />
      </div>
      <div className="p-4 rounded-xl bg-ocean/5 border border-ocean/15 text-sm text-foreground/70 flex items-start gap-3">
        <Shield className="size-4 text-gold shrink-0 mt-0.5" />
        Your personal information is encrypted and never shared with third parties.
      </div>
    </div>
  );
}

/* ── Step 4: Payment ── */
function StepPayment() {
  const methods = [
    { name: "bKash", color: "#E2136E", sub: "Mobile banking" },
    { name: "Nagad", color: "#EC1C24", sub: "Mobile banking" },
    { name: "Rocket", color: "#8C2BAB", sub: "Mobile banking" },
    { name: "Bank Transfer", color: "#1B4332", sub: "NPSB / BEFTN" },
    { name: "SSLCommerz", color: "#0066CC", sub: "Card / online" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-display text-4xl">Payment</h2>
        <p className="mt-2 text-muted-foreground">25% advance secures your reservation. Balance due on boarding.</p>
      </div>

      {/* Summary */}
      <div className="rounded-2xl border border-border overflow-hidden">
        <div className="bg-ocean/5 px-6 py-4 border-b border-border">
          <div className="eyebrow text-[10px] text-muted-foreground">Booking summary</div>
        </div>
        <div className="p-6 space-y-3 text-sm">
          {[
            { label: "Signature Voyage × 2 guests", value: "৳ 57,000" },
            { label: "Premier Balcony Suite × 2 nights", value: "৳ 29,000" },
            { label: "Meals & excursions (included)", value: "—" },
          ].map((r) => (
            <div key={r.label} className="flex justify-between text-muted-foreground">
              <span>{r.label}</span><span>{r.value}</span>
            </div>
          ))}
          <div className="pt-4 border-t border-border flex justify-between items-baseline">
            <div>
              <div className="font-medium text-foreground">Advance payment (25%)</div>
              <div className="text-xs text-muted-foreground mt-0.5">Balance of ৳ 64,500 due on boarding</div>
            </div>
            <div className="font-display text-3xl text-gold">৳ 21,500</div>
          </div>
        </div>
      </div>

      {/* Payment methods */}
      <div>
        <div className="eyebrow text-muted-foreground text-[10px] mb-4">Choose payment method</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {methods.map((m) => (
            <label key={m.name}
              className="flex items-center gap-3 p-4 rounded-xl border border-border cursor-pointer hover:border-gold/60 transition-all has-checked:border-gold has-checked:bg-ocean/5 group"
            >
              <input type="radio" name="pay" className="sr-only" defaultChecked={m.name === "bKash"} />
              <div className="size-3 rounded-full shrink-0" style={{ background: m.color }} />
              <div className="min-w-0">
                <div className="text-sm font-medium">{m.name}</div>
                <div className="text-[10px] text-muted-foreground">{m.sub}</div>
              </div>
              <div className="size-4 rounded-full border-2 border-border ml-auto shrink-0 group-has-checked:border-gold group-has-checked:bg-gold transition-all" />
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 rounded-xl bg-ocean/5 border border-ocean/15 text-sm text-foreground/70">
        <CreditCard className="size-4 text-gold shrink-0 mt-0.5" />
        Secure SSL payment. Your card information is never stored on our servers.
      </div>
    </div>
  );
}

/* ── Shared field component ── */
function Field({
  label, type = "text", placeholder = "", icon: Icon,
}: {
  label: string; type?: string; placeholder?: string; icon?: React.ElementType;
}) {
  return (
    <div>
      <label className="eyebrow text-muted-foreground text-[10px] block mb-2">{label}</label>
      <div className="relative">
        {Icon && <Icon className="size-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />}
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full bg-background border border-border rounded-xl py-3 text-sm focus:outline-none focus:border-gold placeholder:text-muted-foreground/50 transition-colors ${Icon ? "pl-10 pr-4" : "px-4"}`}
        />
      </div>
    </div>
  );
}
