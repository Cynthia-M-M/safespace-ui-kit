import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F9F9F9]">
      <motion.div
        animate={{
          scale: [1, 1.2, 1, 1.2, 1],
          rotate: [0, 10, -10, 10, 0],
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 0.5
        }}
      >
        <Shield className="w-24 h-24 text-[#007AFF]" />
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
