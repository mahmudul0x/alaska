import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Calendar, Users, CreditCard } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import deck from "@/assets/deck-sunset.jpg";

export const Route = createFileRoute("/booking")({
  component: Booking,
  head: () => ({
    meta: [
      { title: "Book Your Voyage — MV Alaska Cruise" },
      { name: "description", content: "Reserve your luxury Sundarbans cruise. Choose dates, cabin, package, and payment method." },
    ],
  }),
});

const steps = ["Voyage", "Cabin", "Guests", "Payment"] as const;

function Booking() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <>
        <PageHero eyebrow="Confirmed" title={<>Bon voyage.</>} image={deck} />
        <section className="py-32 bg-background">
          <div className="container-luxe max-w-2xl text-center">
            <div className="size-20 rounded-full gradient-gold grid place-items-center mx-auto shadow-gold">
              <Check className="size-10 text-ocean" />
            </div>
            <h2 className="mt-8 font-display text-5xl">Reservation received.</h2>
            <p className="mt-6 text-muted-foreground text-lg">
              Our concierge will call you within 2 hours to confirm your booking and process your advance payment.
            </p>
            <Link to="/" className="mt-10 inline-block px-8 py-4 rounded-full gradient-gold text-ocean text-xs uppercase tracking-[0.2em] font-semibold shadow-gold">
              Return Home
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Reserve"
        title={<>Begin your <em className="not-italic text-gradient-gold">voyage</em>.</>}
        subtitle="A four-step reservation. Confirm everything in under three minutes."
        image={deck}
      />

      <section className="py-20 bg-background">
        <div className="container-luxe max-w-4xl">
          {/* Stepper */}
          <div className="flex items-center justify-between mb-12">
            {steps.map((s, i) => (
              <div key={s} className="flex-1 flex items-center">
                <div className={`size-10 rounded-full grid place-items-center text-sm font-medium transition-colors ${
                  i <= step ? "gradient-gold text-ocean" : "bg-secondary text-muted-foreground"
                }`}>{i + 1}</div>
                <div className={`ml-3 text-sm ${i === step ? "text-foreground font-medium" : "text-muted-foreground"}`}>{s}</div>
                {i < steps.length - 1 && <div className={`flex-1 h-px mx-4 ${i < step ? "bg-gold" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-card rounded-2xl shadow-luxe p-8 md:p-12"
          >
            {step === 0 && <StepVoyage />}
            {step === 1 && <StepCabin />}
            {step === 2 && <StepGuests />}
            {step === 3 && <StepPayment />}
          </motion.div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="px-6 py-3 rounded-full border border-border text-sm disabled:opacity-30"
            >
              ← Back
            </button>
            <button
              onClick={() => (step === steps.length - 1 ? setDone(true) : setStep((s) => s + 1))}
              className="px-8 py-3 rounded-full gradient-gold text-ocean text-xs uppercase tracking-[0.2em] font-semibold shadow-gold"
            >
              {step === steps.length - 1 ? "Confirm Booking" : "Continue →"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function StepVoyage() {
  const opts = [
    { name: "Signature Voyage", price: "৳ 28,500" },
    { name: "Couple's Escape", price: "৳ 36,800" },
    { name: "Family Discovery", price: "৳ 24,200" },
    { name: "Photographer's Expedition", price: "৳ 42,500" },
  ];
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-display text-3xl">Choose your voyage</h3>
        <p className="mt-2 text-muted-foreground">Select dates and tour package.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Departure date" type="date" icon={Calendar} />
        <Field label="Return date" type="date" icon={Calendar} />
      </div>
      <div>
        <div className="eyebrow text-muted-foreground text-[10px] mb-3">Package</div>
        <div className="grid sm:grid-cols-2 gap-3">
          {opts.map((o) => (
            <label key={o.name} className="flex items-center justify-between p-4 rounded-xl border border-border cursor-pointer hover:border-gold transition-colors has-[:checked]:border-gold has-[:checked]:bg-secondary/40">
              <div>
                <input type="radio" name="package" className="sr-only" defaultChecked={o.name === "Signature Voyage"} />
                <div className="font-medium">{o.name}</div>
                <div className="text-xs text-muted-foreground mt-1">From {o.price}</div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepCabin() {
  const cabins = [
    { name: "Premier Balcony Suite", price: "৳ 14,500/night" },
    { name: "Panorama View Cabin", price: "৳ 11,200/night" },
    { name: "Family Suite", price: "৳ 22,800/night" },
  ];
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-display text-3xl">Select your cabin</h3>
        <p className="mt-2 text-muted-foreground">Every cabin is river-facing with private en-suite.</p>
      </div>
      <div className="space-y-3">
        {cabins.map((c) => (
          <label key={c.name} className="flex items-center justify-between p-5 rounded-xl border border-border cursor-pointer hover:border-gold has-[:checked]:border-gold has-[:checked]:bg-secondary/40 transition-colors">
            <div>
              <input type="radio" name="cabin" className="sr-only" defaultChecked={c.name === "Premier Balcony Suite"} />
              <div className="font-display text-xl">{c.name}</div>
              <div className="text-sm text-muted-foreground mt-1">{c.price}</div>
            </div>
            <Check className="size-5 text-gold" />
          </label>
        ))}
      </div>
    </div>
  );
}

function StepGuests() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-display text-3xl">Guest details</h3>
        <p className="mt-2 text-muted-foreground">We'll prepare your suite to your preferences.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Full name" />
        <Field label="Email" type="email" />
        <Field label="Phone" />
        <Field label="Number of guests" type="number" icon={Users} />
      </div>
      <Field label="Special requests" />
    </div>
  );
}

function StepPayment() {
  const methods = [
    { name: "bKash", color: "#E2136E" },
    { name: "Nagad", color: "#EC1C24" },
    { name: "Rocket", color: "#8C2BAB" },
    { name: "Bank Transfer", color: "#1B4332" },
    { name: "SSLCommerz", color: "#0066CC" },
  ];
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-display text-3xl">Payment</h3>
        <p className="mt-2 text-muted-foreground">25% advance secures your reservation.</p>
      </div>

      <div className="bg-secondary/40 rounded-xl p-6 border border-border">
        <div className="eyebrow text-muted-foreground text-[10px] mb-3">Booking summary</div>
        <div className="flex justify-between"><span>Signature Voyage × 2</span><span>৳ 57,000</span></div>
        <div className="flex justify-between mt-2"><span>Premier Balcony Suite × 2 nights</span><span>৳ 29,000</span></div>
        <div className="border-t border-border mt-4 pt-4 flex justify-between font-display text-2xl">
          <span>Advance (25%)</span><span className="text-gold">৳ 21,500</span>
        </div>
      </div>

      <div>
        <div className="eyebrow text-muted-foreground text-[10px] mb-3">Choose payment method</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {methods.map((m) => (
            <label key={m.name} className="p-4 rounded-xl border border-border cursor-pointer hover:border-gold has-[:checked]:border-gold has-[:checked]:bg-secondary/40 transition-colors flex items-center gap-3">
              <input type="radio" name="pay" className="sr-only" />
              <div className="size-3 rounded-full" style={{ background: m.color }} />
              <span className="text-sm font-medium">{m.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-3 text-xs text-muted-foreground">
        <CreditCard className="size-4 text-gold shrink-0 mt-0.5" />
        Secure SSL payment. Your card information is never stored on our servers.
      </div>
    </div>
  );
}

function Field({ label, type = "text", icon: Icon }: { label: string; type?: string; icon?: typeof Calendar }) {
  return (
    <div>
      <label className="eyebrow text-muted-foreground text-[10px] block mb-2">{label}</label>
      <div className="relative">
        {Icon && <Icon className="size-4 text-gold absolute left-3 top-1/2 -translate-y-1/2" />}
        <input
          type={type}
          className={`w-full bg-background border border-border rounded-lg py-3 text-sm focus:outline-none focus:border-gold ${Icon ? "pl-10 pr-4" : "px-4"}`}
        />
      </div>
    </div>
  );
}
