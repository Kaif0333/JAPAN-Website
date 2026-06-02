import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TimelineStopProps {
  days: string;
  city: string;
  photos: [string, string];
  index: number;
}

export default function TimelineStop({ days, city, photos, index }: TimelineStopProps) {
  const stopRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(stopRef, { threshold: 0.3, once: true });

  return (
    <motion.div
      ref={stopRef}
      className="relative pl-8 pb-12 last:pb-0"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.2 }}
    >
      {/* Dotted line segment */}
      <div
        className="absolute left-[3px] top-2 bottom-0 w-[1px]"
        style={{
          background: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.25) 0px, rgba(255,255,255,0.25) 4px, transparent 4px, transparent 8px)',
        }}
      />

      {/* Dot */}
      <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-accent-lime" />

      {/* Label */}
      <div className="mb-4">
        <span
          className="text-warm-muted font-medium uppercase block"
          style={{
            fontSize: 'clamp(11px, 0.9vw, 13px)',
            letterSpacing: '0.15em',
          }}
        >
          {days}
        </span>
        <span
          className="text-soft-cream font-normal"
          style={{
            fontSize: 'clamp(15px, 1.1vw, 17px)',
            letterSpacing: '0.01em',
            fontWeight: 400,
          }}
        >
          {city}
        </span>
      </div>

      <div
        className="relative group"
        style={{ width: 'clamp(160px, 20vw, 260px)', height: 'clamp(100px, 12vw, 160px)' }}
        data-cursor="ring"
      >
        <motion.img
          src={photos[0]}
          alt={`${city} view 1`}
          className="absolute top-0 left-0 rounded-lg object-cover cursor-pointer"
          style={{
            width: 'clamp(100px, 14vw, 180px)',
            height: 'clamp(70px, 10vw, 120px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
            zIndex: 1,
          }}
          initial={{ rotate: -2 }}
          whileHover={{
            scale: 1.15,
            rotate: -4,
            zIndex: 10,
            boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
          }}
          transition={{ duration: 0.3 }}
          loading="lazy"
        />
        <motion.img
          src={photos[1]}
          alt={`${city} view 2`}
          className="absolute rounded-lg object-cover cursor-pointer"
          style={{
            width: 'clamp(100px, 14vw, 180px)',
            height: 'clamp(70px, 10vw, 120px)',
            top: '20px',
            left: 'clamp(40px, 5vw, 70px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
            zIndex: 2,
          }}
          initial={{ rotate: 2 }}
          whileHover={{
            scale: 1.15,
            rotate: 4,
            zIndex: 10,
            boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
          }}
          transition={{ duration: 0.3 }}
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}
