import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const dur = 1800;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

const stats = [
  { v: 12, s: "+", l: "Years on the river" },
  { v: 8, s: "", l: "Premium destinations" },
  { v: 24, s: "", l: "Luxury cabin suites" },
  { v: 6500, s: "+", l: "Guests hosted" },
];

export function Stats() {
  return (
    <section className="relative py-20 md:py-28 bg-background border-y border-border">
      <div className="container-luxe">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-background py-12 px-6 text-center"
            >
              <div className="font-display text-5xl md:text-6xl font-light text-ocean">
                <Counter to={s.v} suffix={s.s} />
              </div>
              <div className="mt-3 eyebrow text-muted-foreground">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
