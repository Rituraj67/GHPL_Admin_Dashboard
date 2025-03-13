import React from "react";
import { motion } from "framer-motion";

const dotStyle = {
  width: 32,
  height: 32,
  margin: 8,
  borderRadius: "50%",
  background: "#2563eb",
};

const variants = {
  start: {
    scale: 0.2,
    rotate: 0,
  },
  end: {
    scale: 1,
    rotate: 360,
  },
};

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
      <div className="flex">
        {[0, 0.2, 0.4, 0.6, 0.8].map((delay, index) => (
          <motion.div
            key={index}
            style={dotStyle}
            variants={variants}
            initial="start"
            animate="end"
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              ease: "anticipate",
              duration: 1,
              delay: delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
