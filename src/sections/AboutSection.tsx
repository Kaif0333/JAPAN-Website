import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionHeading from '@/components/SectionHeading';
import TimelineStop from '@/components/TimelineStop';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    days: 'Days 1–3',
    city: 'Osaka',
    photos: ['/images/timeline-osaka-1.jpg', '/images/timeline-osaka-2.jpg'] as [string, string],
  },
  {
    days: 'Days 4–6',
    city: 'Kyoto',
    photos: ['/images/timeline-kyoto-1.jpg', '/images/timeline-kyoto-2.jpg'] as [string, string],
  },
  {
    days: 'Days 7–10',
    city: 'Tokyo',
    photos: ['/images/timeline-tokyo-1.jpg', '/images/timeline-tokyo-2.jpg'] as [string, string],
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const text1Ref = useRef<HTMLParagraphElement>(null);
  const text2Ref = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    // Text block 1 entrance
    gsap.from(text1Ref.current, {
      opacity: 0,
      y: 40,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: text1Ref.current,
        start: 'top 85%',
        once: true,
      },
    });

    // Text block 2 entrance
    gsap.from(text2Ref.current, {
      opacity: 0,
      y: 40,
      duration: 0.6,
      delay: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: text2Ref.current,
        start: 'top 85%',
        once: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-deep-night"
      style={{
        padding: 'clamp(80px, 10vh, 120px) clamp(20px, 4vw, 48px)',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Heading */}
        <SectionHeading text="ABOUT THE TOUR" />

        {/* Content Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16"
          style={{ gap: 'clamp(40px, 6vw, 80px)' }}
        >
          {/* Left — Text Blocks */}
          <div className="flex flex-col gap-8">
            <p
              ref={text1Ref}
              className="text-soft-cream font-light max-w-[420px]"
              style={{
                fontSize: 'clamp(15px, 1.1vw, 17px)',
                lineHeight: 1.65,
                letterSpacing: '0.01em',
              }}
            >
              We've planned a simple and convenient 10-day itinerary for your trip to Japan. You'll visit three cities:{' '}
              <span className="text-accent-lime font-normal">Osaka, Kyoto, and Tokyo</span>.
            </p>

            <p
              ref={text2Ref}
              className="text-soft-cream font-light max-w-[420px]"
              style={{
                fontSize: 'clamp(15px, 1.1vw, 17px)',
                lineHeight: 1.65,
                letterSpacing: '0.01em',
              }}
            >
              No need to worry about routes, schedules, or finding places — everything is already organized. We'll show you where to go, what to see, and where to eat, so you can simply{' '}
              <span className="text-accent-lime font-normal">enjoy the journey</span>.
            </p>
          </div>

          {/* Right — Timeline */}
          <div className="relative">
            {timelineData.map((stop, i) => (
              <TimelineStop
                key={stop.city}
                days={stop.days}
                city={stop.city}
                photos={stop.photos}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
