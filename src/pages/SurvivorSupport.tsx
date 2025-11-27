import { LifeBuoy, Phone, MessageSquare } from 'lucide-react';

export default function SurvivorSupport() {
  const resources = [
    { 
      icon: <LifeBuoy className='w-8 h-8 text-teal-500' />, 
      title: '24/7 Helpline', 
      description: 'Speak to a trained professional anytime.',
      contact: 'Call: 1-800-SAFE-SPACE'
    },
    { 
      icon: <MessageSquare className='w-8 h-8 text-teal-500' />, 
      title: 'Anonymous Chat', 
      description: 'Connect with a peer support volunteer.',
      contact: 'Click to chat'
    },
    { 
      icon: <Phone className='w-8 h-8 text-teal-500' />, 
      title: 'Local Shelters', 
      description: 'Find a safe place near you.',
      contact: 'View directory'
     },
  ];

  return (
    <div className='container mx-auto p-4 md:p-8'>
      <h1 className='text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200'>Survivor Support Resources</h1>
      <p className='text-lg text-gray-600 dark:text-gray-400 mb-8'>You are not alone. Here are some resources to help you.</p>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {resources.map((resource, index) => (
          <div key={index} className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
            <div className='flex items-center mb-4'>
              {resource.icon}
              <h2 className='text-xl font-semibold ml-4 text-gray-800 dark:text-gray-200'>{resource.title}</h2>
            </div>
            <p className='text-gray-600 dark:text-gray-400 mb-4'>{resource.description}</p>
            <button className='w-full bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors'>
              {resource.contact}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}