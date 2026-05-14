import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bed, Wifi, Wind, Coffee, Bath, Eye } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { CTA } from "@/components/site/CTA";
import cabin from "@/assets/cabin-luxury.jpg";
import deck from "@/assets/deck-sunset.jpg";

export const Route = createFileRoute("/cabins")({
  component: Cabins,
  head: () => ({
    meta: [
      { title: "Luxury Cabins & Suites — MV Alaska Cruise" },
      { name: "description", content: "River-facing private balcony cabins, panorama suites, and honeymoon rooms aboard MV Alaska." },
    ],
  }),
});

const cabinList = [
  {
    name: "Premier Balcony Suite",
    img: cabin,
    size: "32 m²",
    occupancy: "2 Adults",
    price: "৳ 14,500",
    features: ["Private balcony", "King bed", "River-facing glass doors", "En-suite marble bath"],
  },
  {
    name: "Panorama View Cabin",
    img: deck,
    size: "26 m²",
    occupancy: "2 Adults",
    price: "৳ 11,200",
    features: ["Panoramic windows", "Queen bed", "Premium bedding", "En-suite bath"],
  },
  {
    name: "Family Suite",
    img: cabin,
    size: "44 m²",
    occupancy: "4 Adults",
    price: "৳ 22,800",
    features: ["Two bedrooms", "Living area", "Double balcony", "Dedicated butler"],
  },
];

const amenities = [
  { icon: Wifi, label: "Starlink Wi-Fi" },
  { icon: Wind, label: "Premium AC" },
  { icon: Bath, label: "En-suite bath" },
  { icon: Bed, label: "Egyptian linens" },
  { icon: Coffee, label: "Mini bar" },
  { icon: Eye, label: "Balcony view" },
];

function Cabins() {
  return (
    <>
      <PageHero
        eyebrow="Cabins & Suites"
        title={<>Your private <em className="not-italic text-gradient-gold">river</em> sanctuary.</>}
        subtitle="Wood-clad interiors, floor-to-ceiling glass, and the Sundarbans as your view."
        image={cabin}
      />

      <section className="py-28 md:py-36 bg-background">
        <div className="container-luxe">
          <SectionHeader
            align="center"
            eyebrow="Accommodations"
            title={<>Three categories. <em className="not-italic text-gradient-gold">One standard.</em></>}
            description="Every cabin features private en-suite, premium bedding, ambient lighting, and uninterrupted river views."
          />

          <div className="mt-16 grid md:grid-cols-3 gap-6 lg:gap-8">
            {cabinList.map((c, i) => (
              <motion.article
                key={c.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-luxe hover-lift"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={c.img} alt={c.name} loading="lazy" className="image-zoom absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass-dark text-gold-soft eyebrow text-[10px]">{c.size}</div>
                </div>
                <div className="p-7">
                  <h3 className="font-display text-2xl font-normal">{c.name}</h3>
                  <div className="mt-1 text-sm text-muted-foreground">{c.occupancy}</div>
                  <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                    {c.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="size-1 rounded-full bg-gold" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-5 border-t border-border flex items-end justify-between">
                    <div>
                      <div className="eyebrow text-muted-foreground text-[10px]">From / night</div>
                      <div className="font-display text-2xl">{c.price}</div>
                    </div>
                    <Link to="/booking" className="px-4 py-2.5 rounded-full bg-ocean text-background text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-gold hover:text-ocean transition-colors">Reserve</Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/40">
        <div className="container-luxe">
          <div className="text-center eyebrow text-gold mb-10">In every cabin</div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-px bg-border rounded-2xl overflow-hidden">
            {amenities.map((a) => (
              <div key={a.label} className="bg-background p-8 text-center">
                <a.icon className="size-7 text-gold mx-auto stroke-[1.2]" />
                <div className="mt-3 text-sm">{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
