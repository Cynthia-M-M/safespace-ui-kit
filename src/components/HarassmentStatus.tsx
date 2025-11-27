import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, TrendingUp, TrendingDown, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

// Mock sentiment data for demonstration
const sentiments = ['Positive', 'Neutral', 'Negative', 'Hostile'];
const sentimentConfig = {
  Positive: { color: 'text-green-500', icon: <TrendingUp /> },
  Neutral: { color: 'text-gray-500', icon: <Circle /> },
  Negative: { color: 'text-yellow-500', icon: <TrendingDown /> },
  Hostile: { color: 'text-red-500', icon: <AlertTriangle /> },
};

export default function HarassmentStatus() {
  const [isDetected, setIsDetected] = useState(false);
  const [sentiment, setSentiment] = useState('Positive');

  useEffect(() => {
    const interval = setInterval(() => {
      const newIsDetected = Math.random() > 0.7;
      setIsDetected(newIsDetected);
      if (newIsDetected) {
        const newSentiment = sentiments[Math.floor(Math.random() * (sentiments.length -1)) + 1];
        setSentiment(newSentiment);
      } else {
        setSentiment('Positive');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const statusConfig = {
    safe: {
      bgColor: 'bg-green-100 dark:bg-green-900/50',
      textColor: 'text-green-700 dark:text-green-300',
      borderColor: 'border-green-500',
      icon: <Shield className='w-8 h-8 mr-4' />,
      title: 'Monitoring Active: All Clear',
      message: 'UbuntuNet is actively monitoring your digital spaces. No threats detected.',
    },
    detected: {
      bgColor: 'bg-red-100 dark:bg-red-900/50',
      textColor: 'text-red-700 dark:text-red-300',
      borderColor: 'border-red-500',
      icon: <AlertTriangle className='w-8 h-8 mr-4' />,
      title: 'ALERT: Harmful Content Detected',
      message: 'Potential digital violence has been identified. Reviewing options.',
    },
  };

  const currentStatus = isDetected ? statusConfig.detected : statusConfig.safe;
  const currentSentiment = sentimentConfig[sentiment as keyof typeof sentimentConfig];

  return (
    <motion.div 
      layout
      className={cn('p-6 rounded-xl border-l-4 shadow-lg transition-all duration-500', currentStatus.bgColor, currentStatus.borderColor)}>
      <div className='flex items-center'>
        {currentStatus.icon}
        <div>
          <h3 className={cn('font-bold text-xl', currentStatus.textColor)}>{currentStatus.title}</h3>
          <p className={cn('text-sm', currentStatus.textColor, 'opacity-80')}>{currentStatus.message}</p>
        </div>
      </div>
      <AnimatePresence>
        {isDetected && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginTop: 0 }} 
            animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }} 
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className='overflow-hidden'>
            <div className='border-t border-gray-300 dark:border-gray-700 pt-4'>
              <h4 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>AI Sentiment Analysis</h4>
              <div className='flex items-center'>
                <div className={cn('w-6 h-6 mr-3', currentSentiment.color)}>{currentSentiment.icon}</div>
                <span className={cn('font-medium text-lg', currentSentiment.color)}>{sentiment}</span>
              </div>
              <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-3'>
                <motion.div 
                  className={cn('h-2.5 rounded-full', {
                    'bg-green-500': sentiment === 'Positive',
                    'bg-gray-500': sentiment === 'Neutral',
                    'bg-yellow-500': sentiment === 'Negative',
                    'bg-red-500': sentiment === 'Hostile',
                  })}
                  initial={{ width: '0%' }}
                  animate={{ width: sentiment === 'Positive' ? '25%' : sentiment === 'Neutral' ? '50%' : sentiment === 'Negative' ? '75%' : '100%' }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
