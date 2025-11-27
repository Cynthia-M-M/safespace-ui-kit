import { NavLink } from 'react-router-dom';
import { Shield, BookOpen, HeartHandshake } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Shield },
  { href: '/education', label: 'Education', icon: BookOpen },
  { href: '/support', label: 'Support', icon: HeartHandshake },
];

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-[#007AFF]" />
            <span className="text-2xl font-bold text-[#1C1C1E]">SafeSpace</span>
          </NavLink>
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#007AFF] text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
