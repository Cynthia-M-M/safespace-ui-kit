import { useState, useEffect, useRef } from 'react';
import { ShieldAlert, MapPin, Mic, Send, KeyRound } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const PREDEFINED_MESSAGES = [
  'I need help immediately.',
  'I am in a dangerous situation.',
  'Please call authorities for me.',
  'Track my location now.',
];

const SAFE_WORD = 'ubuntu';

export default function EmergencyResponse() {
  const [modalOpen, setModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [alertSent, setAlertSent] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [safeWordInput, setSafeWordInput] = useState('');
  const countdownRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (modalOpen && countdown > 0 && !alertSent) {
      countdownRef.current = setTimeout(() => setCountdown(prev => prev - 1), 1000);
    } else if (countdown === 0 && !alertSent) {
      setAlertSent(true);
      toast.error('Emergency Alert Dispatched!', { description: 'Your emergency contacts have been notified.' });
    }
    return () => clearTimeout(countdownRef.current);
  }, [modalOpen, countdown, alertSent]);

  const resetState = () => {
    setModalOpen(false);
    setCountdown(5);
    setAlertSent(false);
    setLocation(null);
    setIsRecording(false);
    setCustomMessage('');
    setSafeWordInput('');
  };

  const handleCancel = () => {
    clearTimeout(countdownRef.current);
    toast.info('Emergency alert cancelled.');
    resetState();
  };

  const handleSafeWord = () => {
    if (safeWordInput.toLowerCase() === SAFE_WORD) {
      toast.success('Alert Disarmed. You are safe.', { description: 'The emergency sequence has been discreetly cancelled.' });
      resetState();
    } else {
      toast.warning('Incorrect Safe Word.');
    }
  };

  const handleGetLocation = () => {
    toast.loading('Acquiring your location...');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
        toast.success('Location Captured Successfully!');
      },
      () => {
        toast.error('Could not access location. Please enable permissions.');
      }
    );
  };

  const handleRecordAudio = () => {
    setIsRecording(true);
    toast.loading('Recording audio snippet... (10s)');
    setTimeout(() => {
      setIsRecording(false);
      toast.success('Audio snippet saved and attached to alert.');
    }, 4000); // Simulate 4s recording
  };

  const sendMessage = (msg: string) => {
    setCustomMessage(msg);
    toast.info(`Message prepared: '${msg}'`);
  }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className='fixed bottom-8 right-8 bg-[#FF3B30] text-white rounded-full w-20 h-20 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform animate-pulse z-40'>
        <ShieldAlert size={40} />
      </button>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4'>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className='bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md'>
              
              {!alertSent ? (
                <div className='text-center p-8'>
                  <h2 className='text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100'>Emergency Alert Active</h2>
                  <p className='text-9xl font-mono font-bold text-[#FF3B30] my-4'>{countdown}</p>
                  <p className='text-gray-600 dark:text-gray-400 mb-6'>Alert will be sent automatically. To cancel, use your safe word or press cancel.</p>
                  <button
                    onClick={handleCancel}
                    className='w-full bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-8 py-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors text-lg font-semibold'>
                    Cancel
                  </button>
                </div>
              ) : (
                <div className='p-6'>
                  <h2 className='text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100'>Enhance Your Alert</h2>
                  
                  {/* Location Sharing */}
                  <div className='mb-4'>
                    <button onClick={handleGetLocation} disabled={!!location} className='w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:bg-blue-300 transition-colors'>
                      <MapPin /> {location ? `Location: ${location}` : 'Share Live Location'}
                    </button>
                  </div>

                  {/* Audio Recording */}
                  <div className='mb-4'>
                    <button onClick={handleRecordAudio} disabled={isRecording} className='w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-purple-500 text-white font-semibold hover:bg-purple-600 disabled:bg-purple-400 transition-colors'>
                      <Mic /> {isRecording ? 'Recording...' : 'Record 10s Audio Snippet'}
                    </button>
                  </div>

                  {/* Pre-defined Messages */}
                  <div className='mb-4'>
                     <p className='text-sm text-gray-500 dark:text-gray-400 mb-2'>Quick Messages:</p>
                     <div className='grid grid-cols-2 gap-2'>
                      {PREDEFINED_MESSAGES.map(msg => (
                        <button key={msg} onClick={() => sendMessage(msg)} className='text-xs text-left p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'>
                          {msg}
                        </button>
                      ))}
                     </div>
                  </div>
                  
                  {/* Custom Message */}
                   <div className='relative mb-6'>
                      <input type='text' value={customMessage} onChange={(e) => setCustomMessage(e.target.value)} placeholder='Or type a custom message...' className='w-full p-3 pr-12 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600'/>
                      <button onClick={() => sendMessage(customMessage)} className='absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-green-500 text-white hover:bg-green-600'><Send size={18}/></button>
                   </div>

                  <button onClick={resetState} className='w-full bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold'>
                    All Done, Close
                  </button>
                </div>
              )}
              
               {/* Safe Word Section */}
              <div className='bg-gray-100 dark:bg-gray-800/50 p-4 rounded-b-2xl'>
                <p className='text-xs text-center text-gray-500 dark:text-gray-400 mb-2'>Discreetly cancel with your safe word.</p>
                <div className='flex gap-2'>
                  <KeyRound className='w-10 h-10 text-gray-400 dark:text-gray-500 p-2 bg-gray-200 dark:bg-gray-700 rounded-lg'/>
                  <input 
                    type='password' 
                    value={safeWordInput}
                    onChange={e => setSafeWordInput(e.target.value)}
                    placeholder='Enter Safe Word...' 
                    className='flex-grow p-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500'/>
                  <button onClick={handleSafeWord} className='px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600'>Disarm</button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
