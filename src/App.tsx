import React, { useState, useEffect } from 'react';
import { PageId, UserRole } from './types';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { AuthModal } from './components/AuthModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SalonPage } from './pages/SalonPage';
import { DirectoryPage } from './pages/DirectoryPage';
import { EditionsPage } from './pages/EditionsPage';
import { GalleryPage } from './pages/GalleryPage';
import { NewsPage } from './pages/NewsPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { ExhibitorDashboardPage } from './pages/ExhibitorDashboardPage';
import { VisitorDashboardPage } from './pages/VisitorDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

// Fallbacks for direct links
import { SectorsPage } from './pages/SectorsPage';
import { ExhibitorsPage } from './pages/ExhibitorsPage';
import { VisitorsPage } from './pages/VisitorsPage';
import { PartnersPage } from './pages/PartnersPage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authDefaultRole, setAuthDefaultRole] = useState<UserRole>('visitor');

  useEffect(() => {
    // Read page from query param or hash on load
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page') as PageId;
    if (pageParam && [
      'home', 'about', 'salon', 'directory', 'editions', 'gallery', 'news', 'contact',
      'exhibitor_portal', 'visitor_portal', 'admin_portal', 'legal'
    ].includes(pageParam)) {
      setCurrentPage(pageParam);
    }
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update query param without reloading
    const url = new URL(window.location.href);
    url.searchParams.set('page', page);
    window.history.pushState({}, '', url.toString());
  };

  const handleOpenAuth = (role: UserRole = 'visitor') => {
    setAuthDefaultRole(role);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F6F3] text-stone-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenAuthModal={() => handleOpenAuth('visitor')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === 'salon' && <SalonPage onNavigate={handleNavigate} />}
        {currentPage === 'directory' && <DirectoryPage onNavigate={handleNavigate} />}
        {currentPage === 'editions' && <EditionsPage onNavigate={handleNavigate} />}
        {currentPage === 'gallery' && <GalleryPage onNavigate={handleNavigate} />}
        {currentPage === 'news' && <NewsPage onNavigate={handleNavigate} />}
        {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
        {currentPage === 'legal' && <LegalPage onNavigate={handleNavigate} />}
        {currentPage === 'exhibitor_portal' && <ExhibitorDashboardPage onNavigate={handleNavigate} />}
        {currentPage === 'visitor_portal' && <VisitorDashboardPage onNavigate={handleNavigate} />}
        {currentPage === 'admin_portal' && <AdminDashboardPage onNavigate={handleNavigate} />}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Auth & Demo Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultRole={authDefaultRole}
        onNavigate={handleNavigate}
      />

      {/* Privacy & Cookie Banner */}
      <CookieBanner />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
