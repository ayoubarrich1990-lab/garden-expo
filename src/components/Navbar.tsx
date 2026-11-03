import React, { useState, useEffect } from 'react';
import { PageId, Language } from '../types';
import { GardenExpoLogo } from './GardenExpoLogo';
import { useApp } from '../context/AppContext';
import {
  Menu,
  X,
  Phone,
  User,
  ShieldCheck,
  Building2,
  QrCode,
  LogOut,
  ChevronDown,
  Globe,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenAuthModal }) => {
  const { currentUser, logout, language, setLanguage } = useApp();
  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'super_admin';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; labelFr: string; labelEn: string; labelAr: string }[] = [
    { id: 'home', labelFr: 'ACCUEIL', labelEn: 'HOME', labelAr: 'الرئيسية' },
    { id: 'salon', labelFr: 'LE SALON', labelEn: 'THE EXPO', labelAr: 'عن المعرض' },
    { id: 'exhibitors', labelFr: 'EXPOSER', labelEn: 'EXHIBIT', labelAr: 'العارضون' },
    { id: 'visitors', labelFr: 'VISITER', labelEn: 'VISIT', labelAr: 'الزوار' },
    { id: 'conferences', labelFr: 'CONFÉRENCES', labelEn: 'CONFERENCES', labelAr: 'المؤتمرات' },
    { id: 'partners', labelFr: 'PARTENAIRES', labelEn: 'PARTNERS', labelAr: 'الشركاء' },
    { id: 'news', labelFr: 'ACTUALITÉS', labelEn: 'NEWS', labelAr: 'الأخبار' },
    { id: 'contact', labelFr: 'CONTACT', labelEn: 'CONTACT', labelAr: 'اتصل بنا' },
  ];

  const getLabel = (item: typeof navItems[0]) => {
    if (language === 'ar') return item.labelAr;
    if (language === 'en') return item.labelEn;
    return item.labelFr;
  };

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setPortalDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const topBarLeft = {
    fr: "Le plus grand salon de l'aménagement paysager et urbain en Afrique",
    en: "The premier landscape and urban design exhibition in Africa",
    ar: "المعرض الدولي الأكبر للتهيئة الحضرية والمساحات الخضراء في إفريقيا",
  };

  const topBarRight = {
    fr: 'Casablanca, Maroc | 2027 — Dates à confirmer',
    en: 'Casablanca, Morocco | 2027 — Dates to be confirmed',
    ar: 'الدار البيضاء، المغرب | 2027 — التواريخ ستحدد لاحقاً',
  };

  const ctaStand = {
    fr: 'DEMANDER UN STAND',
    en: 'BOOK A STAND',
    ar: 'طلب جناح عرض',
  };

  return (
    <>
      {/* SECTION 1 — BARRE SUPÉRIEURE (Dark Green #004421) */}
      <div className="bg-[#004421] text-white text-[11px] sm:text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-[#08752D]/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
          {/* À gauche */}
          <div className="text-emerald-100 font-medium text-center sm:text-left tracking-wide">
            {topBarLeft[language]}
          </div>

          {/* À droite : Lieu | Dates | Switcher FR / EN / AR */}
          <div className="flex items-center gap-3 font-semibold text-emerald-200">
            <span>{topBarRight[language]}</span>
            <span className="text-emerald-500">|</span>
            {/* Langue active interactive */}
            <div className="inline-flex items-center gap-1.5 bg-black/20 rounded-md px-1.5 py-0.5 border border-emerald-700/50">
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors ${
                  language === 'fr'
                    ? 'bg-[#39B54A] text-white shadow-xs'
                    : 'text-emerald-200 hover:text-white'
                }`}
                title="Passer en Français"
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors ${
                  language === 'en'
                    ? 'bg-[#39B54A] text-white shadow-xs'
                    : 'text-emerald-200 hover:text-white'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ar')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors ${
                  language === 'ar'
                    ? 'bg-[#39B54A] text-white shadow-xs'
                    : 'text-emerald-200 hover:text-white'
                }`}
                title="التحويل إلى العربية"
              >
                AR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2 — HEADER PRINCIPAL (Sticky, Fond Blanc) */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-stone-200 py-3'
            : 'bg-white border-stone-200 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo officiel à gauche */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-left focus:outline-none rounded shrink-0 cursor-pointer"
              aria-label="Garden Expo Africa 2027 - Accueil"
            >
              <GardenExpoLogo />
            </button>

            {/* Menu Horizontal Desktop */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-bold text-[#151515] tracking-wide">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`transition-colors uppercase whitespace-nowrap cursor-pointer py-1 relative ${
                      isActive
                        ? 'text-[#08752D]'
                        : 'text-stone-700 hover:text-[#08752D]'
                    }`}
                  >
                    {getLabel(item)}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#08752D] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Actions Droite: Bouton DEMANDER UN STAND + Accès Espace */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              {/* Bouton vert arrondi DEMANDER UN STAND */}
              <button
                onClick={() => handleNavClick('exhibitors')}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#08752D] hover:bg-[#004421] text-white text-xs font-extrabold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer active:scale-95"
              >
                {ctaStand[language]}
              </button>

              {/* Menu Espaces Dédiés & Profil */}
              <div className="relative">
                <button
                  onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                  className={`p-2 rounded-full border transition-colors ${
                    currentUser
                      ? 'bg-emerald-50 border-emerald-300 text-[#004421]'
                      : 'border-stone-200 text-stone-600 hover:text-[#004421] hover:border-stone-300'
                  }`}
                  title={currentUser ? `Connecté : ${currentUser.fullName}` : 'Espaces participants'}
                  aria-label="Espaces dédiés"
                >
                  <User className="w-4 h-4" />
                </button>

                {portalDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 py-2.5 z-50 animate-fade-in text-xs font-medium">
                    {currentUser ? (
                      <div className="px-4 py-2 border-b border-stone-100 mb-1">
                        <div className="font-bold text-[#151515] truncate">{currentUser.fullName}</div>
                        <div className="text-[11px] text-[#08752D] font-semibold uppercase">{currentUser.role}</div>
                      </div>
                    ) : null}

                    <button
                      onClick={() => handleNavClick('exhibitor_portal')}
                      className="w-full text-left px-4 py-2 hover:bg-stone-50 flex items-center gap-2.5 text-stone-700 hover:text-[#08752D]"
                    >
                      <Building2 className="w-4 h-4 text-[#08752D]" />
                      <div>
                        <div className="font-bold">Espace Exposant</div>
                        <div className="text-[10px] text-stone-400">Dossier technique & stands</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('visitor_portal')}
                      className="w-full text-left px-4 py-2 hover:bg-stone-50 flex items-center gap-2.5 text-stone-700 hover:text-[#08752D]"
                    >
                      <QrCode className="w-4 h-4 text-[#08752D]" />
                      <div>
                        <div className="font-bold">Espace Visiteur</div>
                        <div className="text-[10px] text-stone-400">Badge & planning de visite</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('admin_portal')}
                      className="w-full text-left px-4 py-2 hover:bg-stone-50 flex items-center gap-2.5 text-stone-700 hover:text-[#08752D]"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#08752D]" />
                      <div>
                        <div className="font-bold">Administration Salon</div>
                        <div className="text-[10px] text-stone-400">Vidéo slides, stands & stats</div>
                      </div>
                    </button>

                    <div className="my-1 border-t border-stone-100" />

                    {currentUser ? (
                      <button
                        onClick={() => {
                          logout();
                          setPortalDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-rose-50 flex items-center gap-2 text-rose-600 font-bold"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Se déconnecter</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setPortalDropdownOpen(false);
                          onOpenAuthModal();
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-emerald-50 flex items-center gap-2 text-[#08752D] font-bold"
                      >
                        <User className="w-4 h-4" />
                        <span>Connexion rapide</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => handleNavClick('exhibitors')}
                className="px-3 py-1.5 rounded-full bg-[#08752D] text-white text-[10px] font-bold uppercase sm:hidden"
              >
                Stand
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-700 hover:text-[#08752D] focus:outline-none"
                aria-label="Ouvrir le menu de navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-stone-200 px-4 pt-4 pb-6 space-y-3 animate-fade-in shadow-xl">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-stone-100">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-left rounded-lg text-xs font-bold uppercase tracking-wider ${
                    currentPage === item.id
                      ? 'bg-emerald-50 text-[#08752D]'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {getLabel(item)}
                </button>
              ))}
            </div>

            {/* CTA Mobile Stand */}
            <button
              onClick={() => handleNavClick('exhibitors')}
              className="w-full py-3 rounded-full bg-[#08752D] text-white text-xs font-bold uppercase tracking-wider shadow-md text-center"
            >
              {ctaStand[language]}
            </button>

            {/* Portails Mobile */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
              <button onClick={() => handleNavClick('exhibitor_portal')} className="hover:text-[#08752D]">
                Portail Exposant
              </button>
              <span>•</span>
              <button onClick={() => handleNavClick('visitor_portal')} className="hover:text-[#08752D]">
                Portail Visiteur
              </button>
              <span>•</span>
              <button onClick={() => handleNavClick('admin_portal')} className="hover:text-[#08752D]">
                Administration
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
