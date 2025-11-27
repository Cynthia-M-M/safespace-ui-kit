import { useState } from 'react';
import { CheckCircle, Lock, Award, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const modules = [
  {
    id: 1,
    title: 'Understanding Digital Violence',
    icon: BookOpen,
    content: 'Digital violence includes cyberbullying, doxxing, and online harassment. It can have serious real-world consequences. This module covers identifying different forms of online abuse.',
    quiz: [
      { q: 'What is Doxxing?', a: ['Sharing private info online', 'A type of computer virus', 'A social media challenge'], correct: 0 },
      { q: 'Is cyberbullying a crime?', a: ['Yes, in many places', 'No, never', 'Only if it causes physical harm'], correct: 0 },
    ]
  },
  {
    id: 2,
    title: 'Securing Your Digital Identity',
    icon: Lock,
    content: 'Learn to protect your accounts with strong passwords, two-factor authentication (2FA), and privacy settings. Your digital safety starts with a secure foundation.',
    quiz: [
      { q: 'What is 2FA?', a: ['Two-Factor Authentication', 'Two-Friend Agreement', 'A fast algorithm'], correct: 0 },
      { q: 'Which is the strongest password?', a: ['P@ssw0rd123!', 'johndoe1990', 'MyDogIsNamedBuddy'], correct: 0 },
    ]
  },
  {
    id: 3,
    title: 'Being an Online Ally',
    icon: Award,
    content: 'Discover how to support others facing online harassment. Learn about reporting content, offering support, and creating safer online communities for everyone.',
    quiz: [
      { q: 'What should you do if you witness cyberbullying?', a: ['Report it and support the victim', 'Ignore it', 'Join in'], correct: 0 },
      { q: 'Is it safe to share someone else\'s private messages?', a: ['No, it\'s a breach of privacy', 'Yes, if it\'s funny', 'Only with close friends'], correct: 0 },
    ]
  },
];

const Quiz = ({ module, onComplete }: { module: typeof modules[0], onComplete: () => void }) => {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(module.quiz.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (qIndex: number, aIndex: number) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[qIndex] = aIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const correctAnswers = module.quiz.filter((q, i) => answers[i] === q.correct).length;
    if (correctAnswers === module.quiz.length) {
      toast.success('Quiz passed! You earned a badge!');
      onComplete();
    } else {
      toast.error(`You got ${correctAnswers} of ${module.quiz.length} right. Try again!`)
      setTimeout(() => setSubmitted(false), 2000);
    }
  };

  return (
    <div className="mt-4 space-y-4">
      {module.quiz.map((q, qIndex) => (
        <div key={qIndex} className="p-4 border rounded-lg bg-gray-50">
          <p className="font-semibold">{q.q}</p>
          <div className="space-y-2 mt-2">
            {q.a.map((option, aIndex) => (
              <button 
                key={aIndex} 
                onClick={() => handleAnswer(qIndex, aIndex)}
                className={`w-full text-left p-2 rounded-md border transition-all ${
                  answers[qIndex] === aIndex ? 'bg-[#007AFF] text-white' : 'bg-white hover:bg-gray-100'
                } ${
                  submitted && (aIndex === q.correct ? 'border-green-500 bg-green-100' : (answers[qIndex] === aIndex ? 'border-red-500 bg-red-100' : ''))
                }`}>
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleSubmit} disabled={answers.includes(null)} className="w-full bg-[#007AFF] text-white py-2 px-4 rounded-md disabled:bg-gray-400">Submit Quiz</button>
    </div>
  )
}

export default function EducationalModules() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [activeModule, setActiveModule] = useState<number | null>(null);

  const handleComplete = (id: number) => {
    if (!completed.includes(id)) {
      setCompleted([...completed, id]);
    }
    setActiveModule(null);
  };

  const isUnlocked = (id: number) => {
    if (id === 1) return true;
    return completed.includes(id - 1);
  };

  return (
    <div className="space-y-8">
        <div className="text-center">
            <h1 className="text-4xl font-bold text-[#1C1C1E] mb-2">Educational Modules</h1>
            <p className="text-lg text-gray-600">Empower yourself with knowledge. Complete modules to earn badges.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {modules.map(module => (
                <motion.div 
                    key={module.id} 
                    className={`p-6 rounded-xl shadow-lg transition-all border-2 ${isUnlocked(module.id) ? 'bg-white cursor-pointer hover:shadow-2xl hover:-translate-y-1' : 'bg-gray-200 opacity-70'}`}
                    onClick={() => isUnlocked(module.id) && setActiveModule(activeModule === module.id ? null : module.id)}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <module.icon className={`w-10 h-10 ${isUnlocked(module.id) ? 'text-[#007AFF]' : 'text-gray-500'}`} />
                            <h2 className="text-xl font-bold">{module.title}</h2>
                        </div>
                        {completed.includes(module.id) ? (
                            <CheckCircle className="w-8 h-8 text-green-500" />
                        ) : (
                            !isUnlocked(module.id) && <Lock className="w-8 h-8 text-gray-500" />
                        )}
                    </div>
                    <p className="mt-4 text-gray-600">{module.content}</p>
                    <AnimatePresence>
                        {activeModule === module.id && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                <Quiz module={module} onComplete={() => handleComplete(module.id)} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    </div>
  );
}
