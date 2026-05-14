"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  "Love divine, all loves excelling,",
  "Joy of heaven to earth come down,",
  "Fix in us Thy humble dwelling,",
  "All Thy faithful mercies crown.",
  "Jesus, Thou art all compassion,",
  "Pure, unbounded love Thou art;",
  "Visit us with Thy salvation,",
  "Enter every trembling heart.",
];

export default function Poem() {
  const titleRef = useRef(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTitleVisible(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#f8f6f2] text-[#53513C] py-20 md:py-40">

      {/* Title */}
      <div ref={titleRef} className="mx-auto max-w-screen-sm px-6 text-center mb-16">
        <p className="font-script text-[1.5rem] md:text-[6rem] leading-none text-[#53513C]/20 select-none"
          style={{
            opacity:    titleVisible ? 1 : 0,
            transform:  titleVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)",
          }}>
          Words of Praise
        </p>
        <h3 className="mt-0.1 font-display tracking-wide text-[1.25rem] md:text-[1.875rem] inline-block font-normal text-[#53513C]"
          style={{
            opacity:    titleVisible ? 1 : 0,
            transform:  titleVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)",
            transitionDelay: "0.2s",
          }}>
          LOVE AND BLESSING
        </h3>
      </div>

      {/* Poem lines — each animates independently */}
      <div className="mt-20 px-6 md:px-0 font-display text-base md:text-lg leading-10 select-none text-[#53513C] text-center mx-auto max-w-2xl font-normal flex flex-col items-center gap-1">
        {LINES.map((line, i) => (
          <PoemLine key={i} text={line} index={i} />
        ))}
      </div>

    </section>
  );
}

function PoemLine({ text, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.8 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className="block"
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)",
        transitionDelay: `${index * 0.08}s`,
      }}
    >
      {text}
    </span>
  );
}
