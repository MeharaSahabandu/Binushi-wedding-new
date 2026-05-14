"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const sectionRef = useRef(null);
  const [style, setStyle] = useState({ opacity: 1, transform: "translateY(0px)" });

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const height = section.offsetHeight;
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / height, 1);

      setStyle({
        opacity: 1 - progress * 1.4,
        transform: `translateY(-${progress * 80}px)`,
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[100dvh] w-full" style={style}>
      {/* Background image */}
      <Image
        src="/heroImage.webp"
        alt="Binushi and Ruchelle"
        fill
        priority
        sizes="100vw"
        className="object-cover grayscale"
      />

      {/* Readability gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/60" />

      {/* Text overlay */}
      <div className="absolute inset-x-0 bottom-16 md:bottom-20 flex flex-col items-center">
        {/* Title */}
        <h1 className="animate-hero-title font-display text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-tight tracking-wide text-center drop-shadow">
          {/* Mobile (stacked) */}
          <span className="block lg:hidden">
            BINUSHI
            <span className="block text-2xl font-normal -my-1">&amp;</span>
            RUCHELLE
          </span>

          {/* Large screens (inline, same size) */}
          <span className="hidden lg:inline">BINUSHI &amp; RUCHELLE</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-hero-subtitle font-script italic text-white/90 text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-2 text-center px-6 drop-shadow">
          Forever begins with this magical moment
        </p>
      </div>
    </section>
  );
}
