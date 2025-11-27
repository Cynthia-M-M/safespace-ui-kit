import HarassmentStatus from '../components/HarassmentStatus';
import EmergencyResponse from '../components/EmergencyResponse';

export default function Home() {

  return (
    <div className='container mx-auto p-4 md:p-8 max-w-4xl'>
      <div className='space-y-8'>
        <header>
            <h1 className='text-4xl font-bold text-gray-800 dark:text-gray-100'>Dashboard</h1>
            <p className='text-lg text-gray-600 dark:text-gray-400'>Real-time digital safety overview.</p>
        </header>
        
        <HarassmentStatus />
        
        <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg'>
            <h2 className='text-2xl font-bold mb-4'>What do these statuses mean?</h2>
            <ul className='space-y-3 text-gray-700 dark:text-gray-300'>
                <li className='flex items-start'><strong className='w-24 font-semibold text-green-600'>All Clear:</strong><span>Our AI is monitoring and has not found any harmful content.</span></li>
                <li className='flex items-start'><strong className='w-24 font-semibold text-yellow-600'>Negative:</strong><span>Content with negative sentiment has been detected.</span></li>
                <li className='flex items-start'><strong className='w-24 font-semibold text-red-600'>Hostile:</strong><span>Content that is aggressive or threatening has been detected and may require action.</span></li>
            </ul>
        </div>
      </div>
      
      <EmergencyResponse />
    </div>
  );
}
