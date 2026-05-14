"use client";

import { useEffect, useRef, useState } from "react";

export default function Instructions() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#53513C] text-[#F2F1EC] py-24 md:py-32 overflow-hidden">
      <div className="mx-auto px-6 max-w-5xl flex flex-col lg:flex-row items-center text-center lg:gap-24">

        {/* Location */}
        <div className="flex-1" style={{
          opacity:    visible ? 1 : 0,
          transform:  visible ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
          transitionDelay: "0s",
        }}>
          <p className="font-script text-[2rem] md:text-[3rem] leading-none text-[#FAF7EE]/40">
            Location
          </p>
          <h3 className="mt-0.1 font-display text-lg md:text-[1.875rem] tracking-wide">
            SHANGRILLA BALLROOM
          </h3>
        </div>

        {/* Divider */}
        <hr className="my-12 lg:my-0 lg:h-32 lg:border-l border-[#FAF7EE]/40" style={{
          opacity:    visible ? 1 : 0,
          transform:  visible ? "scaleY(1)" : "scaleY(0)",
          transition: "opacity 0.6s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1)",
          transitionDelay: "0.35s",
          width: undefined,
        }} />

        {/* Dress Code */}
        <div className="flex-1" style={{
          opacity:    visible ? 1 : 0,
          transform:  visible ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
          transitionDelay: "0.55s",
        }}>
          <p className="font-script text-[2rem] md:text-[3rem] leading-none text-[#FAF7EE]/40">
            Dress Code
          </p>
          <h3 className="mt-0.1 font-display text-lg md:text-[1.875rem] tracking-wide">
            FORMAL ELEGANCE
          </h3>
        </div>

      </div>
    </section>
  );
}
