import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { GardenExpoLogo } from './GardenExpoLogo';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À Propos' },
    { id: 'sectors', label: 'Secteurs' },
    { id: 'exhibitors', label: 'Exposants' },
    { id: 'visitors', label: 'Visiteurs' },
    { id: 'partners', label: 'Partenaires' },
    { id: 'news', label: 'Actualités' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-200 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-stone-200 py-3'
            : 'bg-white border-stone-200/80 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Brand wordmark / Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-sm"
              aria-label="Garden Expo Africa Maroc - Retour à l'accueil"
            >
              <GardenExpoLogo />
            </button>

            {/* Zone 2: Navigation Links (Clean single-line prose) */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                    currentPage === item.id
                      ? 'text-emerald-800 font-semibold border-emerald-700'
                      : 'border-transparent hover:text-emerald-700 hover:border-emerald-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Zone 3: 1 Primary Action */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <button
                onClick={() => handleNavClick('exhibitors')}
                className="px-3.5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors whitespace-nowrap shrink-0"
              >
                Réserver un stand
              </button>
              <button
                onClick={() => handleNavClick('visitors')}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-xs"
              >
                <span>Badge Visiteur</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => handleNavClick('visitors')}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 rounded-md"
              >
                Badge
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-600 hover:text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-md"
                aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl flex flex-col p-6 z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <GardenExpoLogo showSubtitle={false} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-stone-500 hover:text-stone-900"
                aria-label="Fermer le menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 py-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-emerald-50 text-emerald-800 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-stone-200 flex flex-col gap-3">
              <button
                onClick={() => handleNavClick('visitors')}
                className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md shadow-xs"
              >
                Demander mon badge gratuit
              </button>
              <button
                onClick={() => handleNavClick('exhibitors')}
                className="w-full py-2.5 px-4 text-center text-sm font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-md"
              >
                Devenir exposant
              </button>

              <div className="mt-4 pt-4 border-t border-stone-100 text-xs text-stone-500 flex flex-col gap-1.5">
                <div className="font-semibold text-stone-800">Casablanca, Maroc</div>
                <div className="flex items-center gap-1.5 text-stone-600">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>+212 661 482 497</span>
                </div>
                <div>contact@gardenexpo.ma</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
