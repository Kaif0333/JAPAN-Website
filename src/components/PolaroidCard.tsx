import { motion } from 'framer-motion';

interface PolaroidCardProps {
  image: string;
  caption: string;
  rotation: number;
}

export default function PolaroidCard({ image, caption, rotation }: PolaroidCardProps) {
  return (
    <motion.div
      className="flex-shrink-0 bg-white rounded-[12px] overflow-hidden cursor-pointer group"
      style={{
        width: 'clamp(100px, 12vw, 160px)',
        rotate: rotation,
        boxShadow: '0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)',
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02, 
        boxShadow: '0 20px 40px rgba(255, 184, 197, 0.2)',
        zIndex: 10 
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      data-cursor="view"
    >
      <div className="p-[6px] pb-0">
        <img
          src={image}
          alt={caption}
          className="w-full aspect-[3/4] object-cover rounded-[6px]"
          loading="lazy"
        />
      </div>
      <p
        className="text-deep-night text-center py-[6px] font-medium uppercase"
        style={{
          fontSize: 'clamp(10px, 0.85vw, 12px)',
          letterSpacing: '0.05em',
        }}
      >
        {caption}
      </p>
    </motion.div>
  );
}
