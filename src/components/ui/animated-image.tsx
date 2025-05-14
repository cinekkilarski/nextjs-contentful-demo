"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

interface AnimatedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimatedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = "",
  style = {},
}: AnimatedImageProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.5 }}
      className={`overflow-hidden ${fill ? "relative" : ""} ${className}`}
      style={fill ? { ...style } : style}
    >
      <Image
        src={src}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        priority={priority}
        className={fill ? "object-cover" : ""}
        sizes={fill ? "(max-width: 768px) 100vw, 700px" : undefined}
      />
      {/* Hidden text for screen readers */}
      <span className="sr-only">{alt}</span>
    </motion.div>
  );
}
