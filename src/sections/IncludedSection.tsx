import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Plane, Bus, Building, Utensils, Camera, HeadphonesIcon, FileText } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import InfoCard from '@/components/InfoCard';

const cards = [
  {
    icon: Users,
    title: 'Guides',
    description: '2 awesome guides who know everything about Japan!',
  },
  {
    icon: Plane,
    title: 'Flights',
    description: 'Routes: Moscow — Osaka, Tokyo — Moscow',
  },
  {
    icon: Bus,
    title: 'Transfers',
    description: 'From the airport to the hotels',
  },
  {
    icon: Building,
    title: 'Hotels',
    description: 'Comfortable accommodation, 2 people per room',
  },
  {
    icon: Utensils,
    title: 'Breakfasts',
    description: 'Daily authentic Japanese breakfast included',
  },
  {
    icon: Camera,
    title: 'Activities',
    description: 'All entry tickets and scheduled experiences',
  },
  {
    icon: HeadphonesIcon,
    title: 'Support',
    description: '24/7 assistance during your entire trip',
  },
  {
    icon: FileText,
    title: 'Visa Support',
    description: 'Assistance with required travel documents',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as any } 
  },
};

export default function IncludedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.15, once: true });

  return (
    <section
      ref={sectionRef}
      id="included"
      className="relative bg-deep-night"
      style={{
        padding: 'clamp(80px, 10vh, 120px) clamp(20px, 4vw, 48px)',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Heading */}
        <SectionHeading text="WHAT'S INCLUDED" align="left" />

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 mt-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {cards.map((card) => (
            <motion.div key={card.title} variants={itemVariants}>
              <InfoCard
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
