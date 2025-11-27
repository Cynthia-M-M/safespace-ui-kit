import { ShieldCheck } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='animate-pulse'>
        <img src='https://storage.googleapis.com/dala-prod-public-storage/generated-images/a1a352fa-0110-48be-ac26-a5d7b9f91085/safespace-logo-c8t63tx-1764240022510.webp' alt='SafeSpace Logo' className='w-32 h-32 mb-4' />
      </div>
      <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-200'>SafeSpace</h1>
      <p className='text-gray-600 dark:text-gray-400'>Your AI-powered shield against digital violence.</p>
    </div>
  );
}