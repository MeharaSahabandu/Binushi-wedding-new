"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function TimelineTitle() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll(".tl-row");

    const onScroll = () => {
      const vh = window.innerHeight;

      items.forEach((item) => {
        const rect   = item.getBoundingClientRect();
        const center = rect.top + rect.height / 2;

        // -1 = well above center (passed), 0 = at center, +1 = well below (upcoming)
        const rel = (center - vh * 0.5) / (vh * 0.6);
        const clamped = Math.max(-1, Math.min(1, rel));

        // Upcoming items come from depth; passed items drift slightly behind
        const translateZ = clamped > 0
          ? -clamped * 160          // approaching: -160px → 0
          : clamped * 30;           // passed: 0 → +30px (very subtle)

        const opacity = clamped > 0
          ? 1 - clamped * 0.7       // fade in as approaching
          : 1 + clamped * 0.25;     // slight fade as passed

        const scale = 1 - Math.max(0, clamped) * 0.08; // shrink slightly when far

        item.style.transform = `perspective(900px) translateZ(${translateZ}px) scale(${scale})`;
        item.style.opacity   = Math.max(0, opacity);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#f8f6f2] text-[#2c2c2c]">
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-40 relative">

        {/* Title Block */}
        <div className="text-center mb-16">
          <p className="font-script text-[1.5rem] md:text-[6rem] leading-none text-black/10 select-none">
            Wedding Schedule
          </p>
          <h3 className="mt-0.1 font-display tracking-wide text-[1.25rem] md:text-[1.875rem] inline-block font-normal">
            WEDDING DAY TIMELINE
          </h3>
        </div>

        {/* Block 1: Image Left / Schedule Right */}
        <div className="grid grid-cols-[1fr_1.2fr] gap-6 md:gap-12 items-stretch mb-16">
          <div className="relative h-full overflow-hidden -ml-6 md:ml-0">
            <Image src="/timelineLeft.webp" alt="Couple photo" fill priority className="object-cover object-[20%_center]" />
            <p className="absolute top-4 left-4 font-third text-white/95 text-sm md:text-base drop-shadow">
              A gentle kind<br />of forever
            </p>
          </div>

          <div className="space-y-6 md:space-y-7 bg-[#f8f6f2] h-full">
            <TimelineItem time="3:45 pm" text="Guests arrival to the church" />
            <Separator />
            <TimelineItem time="4 pm" text="Church wedding mass" />
            <Separator />
            <TimelineItem time="5 pm" text="Church high tea" />
            <Separator />
            <TimelineItem time="6:15 pm" text="Travel to the hotel from church" />
          </div>
        </div>

        {/* Block 2: Schedule Left / Image Right */}
        <div className="grid grid-cols-[1.2fr_1fr] gap-6 md:gap-12 items-stretch">
          <div className="space-y-6 md:space-y-7 bg-[#f8f6f2] h-full">
            <TimelineItem time="7 pm" text="Reception Opens" />
            <Separator />
            <TimelineItem time="7:30 pm" text="Couple entering to the reception" />
            <Separator />
            <TimelineItem time="8:15 pm" text="First dance" />
            <Separator />
            <TimelineItem time="9:30 pm" text="Dinner opens" />
            <Separator />
            <TimelineItem time="12:30 am" text="Going away" />
          </div>

          <div className="relative h-full overflow-hidden -mr-6 md:mr-0">
            <Image src="/timelineRight.webp" alt="Reception photo" fill priority className="object-cover object-[10%_center] md:object-[75%_center]" />
            <p className="absolute top-4 left-4 font-third text-white/95 text-sm md:text-base drop-shadow">
              Where love lives,<br />joy follows
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

function TimelineItem({ time, text }) {
  return (
    <div className="tl-row flex flex-col items-start gap-1" style={{ willChange: "transform, opacity" }}>
      <span className="font-display text-base md:text-lg">{time}</span>
      <p className="font-display text-base md:text-lg leading-7">{text}</p>
    </div>
  );
}

function Separator() {
  return <div className="h-px bg-[#2c2c2c]/15" />;
}
