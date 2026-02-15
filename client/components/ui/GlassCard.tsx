import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { Tilt } from 'react-tilt';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  enableTilt?: boolean;
}

const defaultTiltOptions = {
  reverse: false, // reverse the tilt direction
  max: 15, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.02, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: 'cubic-bezier(.03,.98,.52,.99)', // Easing on enter/exit.
};

export const GlassCard = ({
  children,
  className = '',
  hoverEffect = true,
  enableTilt = true,
  ...props
}: GlassCardProps) => {
  const CardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={
        hoverEffect && !enableTilt
          ? {
              scale: 1.02,
              borderColor: 'rgba(255, 255, 255, 0.3)',
              boxShadow: '0 0 20px rgba(56, 189, 248, 0.1)', // Light cyan glow
            }
          : {}
      }
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`
        relative overflow-hidden
        bg-white/5 backdrop-blur-xl 
        border border-white/10 rounded-2xl
        shadow-xl p-4
        ${enableTilt && hoverEffect ? 'h-full w-full' : className}
      `}
      {...props}
    >
      {/* Shine effect overlay (optional, subtle) */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {children}
    </motion.div>
  );

  if (enableTilt && hoverEffect) {
    return (
      <Tilt options={defaultTiltOptions} className={className}>
        <div className="h-full w-full relative group">
          {CardContent}

          {/* Neon Border Glow on Hover - absolutely positioned over everything */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-cyan-400/50 transition-all duration-500 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 hover:from-cyan-500/10 hover:to-purple-500/10 transition-colors duration-500 pointer-events-none" />
        </div>
      </Tilt>
    );
  }

  return CardContent;
};
