"use client";

import { useEffect, useRef, useState } from "react";

const DATE_CHARS = ["0", "4", " . ", "1", "2", " . ", "2", "0", "2", "5"];

export default function Invitation() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`bg-[#4b4b3a] text-[#F2F1EC] py-32 md:py-40${visible ? " inv-animate" : ""}`}
    >
      <div className="mx-auto max-w-screen-sm px-6 flex flex-col items-center text-center">

        {/* Hands — split into left & right halves, each slides in from its side */}
        <div className="relative w-32 md:w-40 h-16 md:h-20 mb-8 opacity-90">
          {/* Left half */}
          <div
            className="inv-hand-left absolute inset-0 overflow-hidden"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          >
            <img src="/hands.svg" alt="" className="w-full h-full object-contain" />
          </div>
          {/* Right half */}
          <div
            className="inv-hand-right absolute inset-0 overflow-hidden"
            style={{ clipPath: "inset(0 0 0 50%)" }}
          >
            <img src="/hands.svg" alt="" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Text */}
        <p className="inv-text font-third text-base md:text-lg leading-relaxed [text-wrap:balance] max-w-xl">
          <span className="block md:hidden">
            Surrounded by those we cherish
            <br />
            most, we&apos;ll begin our forever.
            <br />
            We can&apos;t wait to celebrate
            <br />
            this magical chapter with you.
          </span>
          <span className="hidden md:block">
            Surrounded by those we cherish most, we&apos;ll begin our forever.
            <br />
            We can&apos;t wait to celebrate this magical chapter with you.
          </span>
        </p>

        {/* Date — each character stamps in with a staggered delay */}
        <div className="mt-10 md:mt-12 font-display text-3xl md:text-5xl tracking-[0.2em] flex items-center">
          <span className="sr-only">Date: 04.12.2025</span>
          {DATE_CHARS.map((ch, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="inv-date-char inline-block"
              style={{ "--delay": `${1.5 + i * 0.1}s` }}
            >
              {ch}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
