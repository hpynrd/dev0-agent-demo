import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, Phone, Calculator, CreditCard, Users } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', icon: FileText },
    { to: '/services', label: 'Services', icon: FileText },
    { to: '/calculator', label: 'Calculator', icon: Calculator },
    { to: '/contact', label: 'Contact', icon: Phone },
    { to: '/payment', label: 'Payment', icon: CreditCard },
    { to: '/staff', label: 'Staff Portal', icon: Users },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-midwest-navy text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-midwest-gold rounded-full flex items-center justify-center">
              <FileText className="w-7 h-7 text-midwest-navy" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Heartland Notary</h1>
              <p className="text-xs text-midwest-wheat">Trusted Service Since 1995</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                  isActive(to)
                    ? 'bg-midwest-gold text-midwest-navy'
                    : 'hover:bg-midwest-gold/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-md transition-colors ${
                  isActive(to)
                    ? 'bg-midwest-gold text-midwest-navy'
                    : 'hover:bg-midwest-gold/20'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
