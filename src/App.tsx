import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Home from './pages/Home';
import SurvivorSupport from './pages/SurvivorSupport';
import EducationalModules from './pages/EducationalModules';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200'>
        <Toaster richColors />
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/survivor-support' element={<SurvivorSupport />} />
            <Route path='/educational-modules' element={<EducationalModules />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}