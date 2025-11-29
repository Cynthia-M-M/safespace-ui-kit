import { Shield, LifeBuoy, Gavel, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const resources = {
  'International Helplines': [
    { name: 'The Cyber Helpline', desc: 'Global 24/7 helpline for cybercrime and online harm.', link: 'https://www.thecyberhelpline.com/' },
    { name: 'End Cyberbullying', desc: 'Resources and support for young people affected by online bullying.', link: 'https://www.endcyberbullying.org/' },
    { name: 'WomensLaw.org', desc: 'Legal information and resources for survivors of abuse.', link: 'https://www.womenslaw.org/about-abuse/forms-abuse/cyberstalking' },
  ],
  'Mental Health Support': [
    { name: 'BetterHelp', desc: 'Online therapy with licensed professionals.', link: 'https://www.betterhelp.com/' },
    { name: '7 Cups', desc: 'Free online chat with trained listeners.', link: 'https://www.7cups.com/' },
    { name: 'The Trevor Project', desc: 'Support for LGBTQ young people.', link: 'https://www.thetrevorproject.org/' },
  ],
  'Legal & Reporting Assistance': [
    { name: 'Cyber Civil Rights Initiative', desc: 'Legal support for victims of nonconsensual pornography.', link: 'https://www.cybercivilrights.org/' },
    { name: 'Internet Crime Complaint Center (IC3)', desc: 'Report cybercrime to the FBI.', link: 'https://www.ic3.gov/' },
    { name: 'Local Law Enforcement', desc: 'Contact your local police department for immediate threats.', link: '#' },
  ],
};

const icons = {
  'International Helplines': <LifeBuoy className="w-8 h-8 text-[#007AFF]" />,
  'Mental Health Support': <Shield className="w-8 h-8 text-[#34C759]" />,
  'Legal & Reporting Assistance': <Gavel className="w-8 h-8 text-[#FF3B30]" />,
};

export default function SurvivorSupport() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#1C1C1E] mb-2">Survivor Support Network</h1>
        <p className="text-lg text-gray-600">You are not alone. Find confidential help and resources below.</p>
      </div>

      {Object.entries(resources).map(([category, items], index) => (
        <motion.section 
          key={category}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="flex items-center gap-4 mb-6">
            {icons[category as keyof typeof icons]}
            <h2 className="text-3xl font-bold text-[#1C1C1E]">{category}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, itemIndex) => (
              <motion.a
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: (index * 0.1) + (itemIndex * 0.05) }}
                className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-100 group"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-[#1C1C1E] mb-2">{item.name}</h3>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#007AFF] transition-colors" />
                </div>
                <p className="text-gray-600">{item.desc}</p>
              </motion.a>
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  );
}
