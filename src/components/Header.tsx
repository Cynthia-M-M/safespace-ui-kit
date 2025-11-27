import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function Header() {
  return (
    <header className='bg-white dark:bg-gray-800 shadow-md'>
      <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
        <Link to='/' className='flex items-center space-x-2'>
          <img src='https://storage.googleapis.com/dala-prod-public-storage/generated-images/a1a352fa-0110-48be-ac26-a5d7b9f91085/safespace-logo-c8t63tx-1764240022510.webp' alt='SafeSpace Logo' className='w-10 h-10' />
          <span className='text-xl font-bold text-gray-800 dark:text-white'>SafeSpace</span>
        </Link>
        <nav className='hidden md:flex items-center space-x-6'>
          <Link to='/survivor-support' className='text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400'>
            Survivor Support
          </Link>
          <Link to='/educational-modules' className='text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400'>
            Educational Modules
          </Link>
        </nav>
      </div>
    </header>
  );
}