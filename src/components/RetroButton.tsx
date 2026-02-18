"use client";

import { motion } from "motion/react";

interface RetroButtonProps {
  href: string;
  icon?: React.ReactNode;
  label: string;
  /** Extra element rendered after the label (e.g. ExternalLink icon) */
  trailing?: React.ReactNode;
  className?: string;
}

export default function RetroButton({
  href,
  icon,
  label,
  trailing,
  className = "",
}: RetroButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3 }}
      whileTap={{ y: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`retro-btn ${className}`}
    >
      {icon}
      <span className="font-mono retro-btn-label">
        {label}
      </span>
      {trailing}
    </motion.a>
  );
}
