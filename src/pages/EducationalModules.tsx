import { BookOpen, Film, Mic } from 'lucide-react';

export default function EducationalModules() {
  const modules = [
    { 
      icon: <BookOpen className='w-8 h-8 text-teal-500' />, 
      title: 'Understanding Digital Violence', 
      type: 'Article'
    },
    { 
      icon: <Film className='w-8 h-8 text-teal-500' />, 
      title: 'How to Secure Your Social Media', 
      type: 'Video'
    },
    { 
      icon: <Mic className='w-8 h-8 text-teal-500' />, 
      title: 'Podcast: Survivor Stories', 
      type: 'Audio'
    },
    { 
      icon: <BookOpen className='w-8 h-8 text-teal-500' />, 
      title: 'Legal Options for Cyberstalking', 
      type: 'Article'
    },
  ];

  return (
    <div className='container mx-auto p-4 md:p-8'>
      <h1 className='text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200'>Educational Modules</h1>
      <p className='text-lg text-gray-600 dark:text-gray-400 mb-8'>Empower yourself with knowledge. Learn how to stay safe online.</p>
      <div className='space-y-4'>
        {modules.map((module, index) => (
          <div key={index} className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between hover:shadow-lg transition-shadow'>
            <div className='flex items-center'>
              {module.icon}
              <h2 className='text-lg font-semibold ml-4 text-gray-800 dark:text-gray-200'>{module.title}</h2>
            </div>
            <span className='text-sm bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 px-3 py-1 rounded-full'>{module.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}