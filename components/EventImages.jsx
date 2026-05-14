"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const items = [
  { src: "/preshootCover.webp", title: "Pre Shoot",   alt: "Pre-shoot photo",   href: "/preshoot"   },
  { src: "/engageCover.webp",   title: "Engagement",  alt: "Engagement photo",  href: "/engagement" },
];

export default function EventImages() {
  return (
    <section className="bg-[#f8f6f2]">
      <div className="flex flex-col md:flex-row">
        {items.map(({ src, title, alt, href }, i) => (
          <EventCard key={title} src={src} title={title} alt={alt} href={href} index={i} />
        ))}
      </div>
    </section>
  );
}

function EventCard({ src, title, alt, href, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // First card slides from left, second from right
  const fromX = index === 0 ? "-60px" : "60px";

  return (
    <Link
      ref={ref}
      href={href}
      className="relative w-full aspect-[4/3] md:aspect-[16/9] block overflow-hidden"
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateX(0) scale(1)" : `translateX(${fromX}) scale(0.97)`,
        transition: "opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)",
        transitionDelay: `${index * 0.15}s`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/30" />

      <figcaption className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-script text-white drop-shadow text-5xl md:text-7xl lg:text-8xl tracking-wide"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
            transitionDelay: `${0.35 + index * 0.15}s`,
          }}
        >
          {title}
        </span>
      </figcaption>
    </Link>
  );
}
