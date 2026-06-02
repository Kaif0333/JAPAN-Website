import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function InfoCard({ icon: Icon, title, description }: InfoCardProps) {
  return (
    <motion.div
      className="group rounded-[16px] p-4 flex flex-col items-start text-left cursor-pointer"
      style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      whileHover={{
        y: -4,
        scale: 1.01,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      data-cursor="ring"
    >
      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mb-3 border border-white/5 group-hover:border-white/20 transition-colors duration-300">
        <Icon className="w-3.5 h-3.5 text-soft-cream" strokeWidth={1.5} />
      </div>
      <h3
        className="text-soft-cream font-medium uppercase tracking-[0.05em]"
        style={{
          fontSize: '11px',
        }}
      >
        {title}
      </h3>
      <p
        className="mt-1.5 text-warm-muted font-light"
        style={{
          fontSize: '10px',
          lineHeight: 1.4,
        }}
      >
        {description}
      </p>
    </motion.div>
  );
}
