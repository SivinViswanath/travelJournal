import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard = ({
  children,
  className = "",
  hoverEffect = true,
  ...props
}: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={
        hoverEffect
          ? {
              scale: 1.02,
              borderColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "0 0 20px rgba(56, 189, 248, 0.1)", // Light cyan glow
            }
          : {}
      }
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`
        relative overflow-hidden
        bg-white/5 backdrop-blur-xl 
        border border-white/10 rounded-2xl
        shadow-xl
        ${className}
      `}
      {...props}
    >
      {/* Shine effect overlay (optional, subtle) */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {children}
    </motion.div>
  );
};
