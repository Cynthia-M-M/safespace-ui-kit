import { useState, useEffect } from 'react';
import HarassmentStatus from '../components/HarassmentStatus';
import EmergencyResponse from '../components/EmergencyResponse';
import { motion } from 'framer-motion';

type ThreatLevel = 'calm' | 'low' | 'medium' | 'high' | 'critical';

const threatLevels: ThreatLevel[] = ['calm', 'low', 'medium', 'high', 'critical'];
const threatDescriptions = {
    calm: 'No threats detected. Your digital space is secure.',
    low: 'Low-level negativity detected. We recommend caution.',
    medium: 'Moderate harassment patterns identified. Stay vigilant.',
    high: 'High-risk threats detected. Consider taking action.',
    critical: 'Immediate threat detected. Activate emergency response now.',
};

export default function Home() {
  const [threatLevel, setThreatLevel] = useState<ThreatLevel>('calm');

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * threatLevels.length);
      setThreatLevel(threatLevels[randomIndex]);
    }, 5000); // Update every 5 seconds to simulate real-time analysis

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HarassmentStatus threatLevel={threatLevel} />
        <p className="text-center text-gray-600 mt-4 text-lg">{threatDescriptions[threatLevel]}</p>
      </motion.div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Need Immediate Help?</h2>
        <p className="text-gray-600 mb-6">If you are in immediate danger, use the emergency response button.</p>
        <EmergencyResponse />
      </div>
    </div>
  );
}
