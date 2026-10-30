import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { GardenExpoLogo } from './GardenExpoLogo';
import { useApp } from '../context/AppContext';
import {
  Menu,
  X,
  ArrowRight,
  Phone,
  User,
  ShieldCheck,
  Building2,
  QrCode,
  LogOut,
  ChevronDown,
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenAuthModal }) => {
  const { currentUser, logout } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Accueil' },
    { id: 'salon', label: 'Le Salon' },
    { id: 'directory', label: 'Annuaire Exposants' },
    { id: 'editions', label: 'Éditions Précédentes' },
    { id: 'gallery', label: 'Galerie' },
    { id: 'news', label: 'Actualités' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setPortalDropdownOpen(false);
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
          <div className="flex items-center justify-between gap-6">
            {/* Zone 1: Brand wordmark / Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#367A4D] rounded-sm shrink-0"
              aria-label="Garden Expo Africa Maroc - Retour à l'accueil"
            >
              <GardenExpoLogo />
            </button>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-stone-700">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-xs font-semibold uppercase tracking-wider ${
                    currentPage === item.id
                      ? 'text-[#123D2B] border-[#123D2B]'
                      : 'border-transparent text-stone-600 hover:text-[#367A4D] hover:border-[#367A4D]'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* Espaces Portails Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                  className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-[#123D2B] py-1 border-b-2 border-transparent"
                >
                  <span>Espaces Dédiés</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {portalDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 animate-fade-in text-xs font-medium">
                    <button
                      onClick={() => handleNavClick('exhibitor_portal')}
                      className="w-full text-left px-4 py-2.5 hover:bg-stone-50 flex items-center gap-2.5 text-stone-700 hover:text-[#123D2B]"
                    >
                      <Building2 className="w-4 h-4 text-[#367A4D]" />
                      <div>
                        <div className="font-bold">Espace Exposant</div>
                        <div className="text-[11px] text-stone-400">Stand & Factures</div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleNavClick('visitor_portal')}
                      className="w-full text-left px-4 py-2.5 hover:bg-stone-50 flex items-center gap-2.5 text-stone-700 hover:text-[#123D2B]"
                    >
                      <QrCode className="w-4 h-4 text-[#367A4D]" />
                      <div>
                        <div className="font-bold">Espace Visiteur</div>
                        <div className="text-[11px] text-stone-400">E-Badge & Favoris</div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleNavClick('admin_portal')}
                      className="w-full text-left px-4 py-2.5 hover:bg-stone-50 flex items-center gap-2.5 text-stone-700 hover:text-[#123D2B]"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#367A4D]" />
                      <div>
                        <div className="font-bold">Back-Office Admin</div>
                        <div className="text-[11px] text-stone-400">Attribution des stands</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </nav>

            {/* Zone 3: User State & Action CTA */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              {currentUser ? (
                <div className="flex items-center gap-2 bg-stone-50 border border-stone-200/90 rounded-xl p-1.5 pl-3">
                  <div className="flex flex-col text-right">
                    <span className="text-xs font-bold text-[#123D2B] leading-tight">
                      {currentUser.fullName}
                    </span>
                    <span className="text-[10px] text-[#367A4D] font-bold uppercase tracking-wider">
                      {currentUser.role === 'super_admin' ? 'Super Admin' : currentUser.role === 'exhibitor' ? 'Exposant' : 'Visiteur'}
                    </span>
                  </div>

                  {currentUser.role === 'exhibitor' && (
                    <button
                      onClick={() => handleNavClick('exhibitor_portal')}
                      className="px-2.5 py-1 bg-[#123D2B] text-white rounded-lg text-xs font-semibold hover:bg-[#367A4D] transition-colors"
                    >
                      Mon Stand
                    </button>
                  )}

                  {currentUser.role === 'visitor' && (
                    <button
                      onClick={() => handleNavClick('visitor_portal')}
                      className="px-2.5 py-1 bg-[#123D2B] text-white rounded-lg text-xs font-semibold hover:bg-[#367A4D] transition-colors"
                    >
                      Mon Badge
                    </button>
                  )}

                  {currentUser.role === 'super_admin' && (
                    <button
                      onClick={() => handleNavClick('admin_portal')}
                      className="px-2.5 py-1 bg-[#123D2B] text-white rounded-lg text-xs font-semibold hover:bg-[#367A4D] transition-colors"
                    >
                      Console
                    </button>
                  )}

                  <button
                    onClick={logout}
                    className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg transition-colors"
                    title="Se déconnecter"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenAuthModal}
                  className="px-3 py-2 text-xs font-bold text-[#123D2B] border border-stone-300 hover:border-[#123D2B] rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-[#367A4D]" />
                  <span>Connexion / Démo</span>
                </button>
              )}

              <button
                onClick={() => handleNavClick('visitor_portal')}
                className="px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white bg-[#123D2B] hover:bg-[#367A4D] rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-2xs"
              >
                <span>Badge Visiteur</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#A5C96B]" />
              </button>
            </div>

            {/* Mobile menu hamburger */}
            <div className="flex xl:hidden items-center gap-2">
              <button
                onClick={onOpenAuthModal}
                className="px-2.5 py-1 text-xs font-bold text-[#123D2B] border border-stone-300 rounded-lg"
              >
                {currentUser ? currentUser.role : 'Démo'}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-600 hover:text-stone-900 focus:outline-none rounded-md"
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
        <div className="fixed inset-0 z-50 xl:hidden">
          <div
            className="fixed inset-0 bg-[#202620]/60 backdrop-blur-xs"
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
                  className={`text-left px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                    currentPage === item.id
                      ? 'bg-emerald-50 text-[#123D2B]'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-3 mt-2 border-t border-stone-100">
                <span className="text-[10px] uppercase font-bold text-stone-400 px-3 block mb-1">
                  Espaces Privés
                </span>
                <button
                  onClick={() => handleNavClick('exhibitor_portal')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-stone-700 hover:text-[#123D2B] flex items-center gap-2"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#367A4D]" /> Espace Exposant
                </button>
                <button
                  onClick={() => handleNavClick('visitor_portal')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-stone-700 hover:text-[#123D2B] flex items-center gap-2"
                >
                  <QrCode className="w-3.5 h-3.5 text-[#367A4D]" /> Espace Visiteur (E-Badge)
                </button>
                <button
                  onClick={() => handleNavClick('admin_portal')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-stone-700 hover:text-[#123D2B] flex items-center gap-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#367A4D]" /> Console Admin
                </button>
              </div>
            </nav>

            <div className="mt-auto pt-6 border-t border-stone-200 flex flex-col gap-3">
              <button
                onClick={() => handleNavClick('visitor_portal')}
                className="w-full py-2.5 px-4 text-center text-xs font-bold uppercase tracking-wider text-white bg-[#123D2B] hover:bg-[#367A4D] rounded-xl shadow-xs"
              >
                Demander mon badge officiel
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full py-2.5 px-4 text-center text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl"
              >
                Réserver un stand
              </button>

              <div className="mt-4 pt-4 border-t border-stone-100 text-xs text-stone-500 flex flex-col gap-1.5">
                <div className="font-semibold text-stone-800">Casablanca, Maroc · OFEC</div>
                <div className="flex items-center gap-1.5 text-stone-600">
                  <Phone className="w-3.5 h-3.5 text-[#367A4D]" />
                  <span>+212 5 22 20 40 50</span>
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
