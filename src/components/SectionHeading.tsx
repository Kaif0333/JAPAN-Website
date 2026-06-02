import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  text: string;
  align?: 'center' | 'left';
}

export default function SectionHeading({ text, align = 'center' }: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftLineRef = useRef<HTMLDivElement>(null);
  const rightLineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
      },
    });

    tl.from(leftLineRef.current, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1,
      ease: 'power2.out',
    }, 0);

    tl.from(rightLineRef.current, {
      scaleX: 0,
      transformOrigin: 'right center',
      duration: 1,
      ease: 'power2.out',
    }, 0);

    tl.from(textRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
    }, 0.2);
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className={`flex items-center gap-6 ${align === 'center' ? 'justify-center' : 'justify-start'}`}
    >
      <div
        ref={leftLineRef}
        className="h-[1px] bg-[rgba(255,255,255,0.25)] flex-shrink-0"
        style={{ width: align === 'center' ? 'auto' : '48px', flex: align === 'center' ? '1 1 0%' : '0 0 auto' }}
      />
      <h2
        ref={textRef}
        className="text-soft-cream font-normal uppercase flex-shrink-0"
        style={{
          fontSize: 'clamp(36px, 5vw, 56px)',
          letterSpacing: '0.12em',
          lineHeight: 1.1,
        }}
      >
        {text}
      </h2>
      <div
        ref={rightLineRef}
        className="h-[1px] bg-[rgba(255,255,255,0.25)]"
        style={{ flex: '1 1 0%' }}
      />
    </div>
  );
}
