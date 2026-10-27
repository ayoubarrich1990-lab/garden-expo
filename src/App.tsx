import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SectorsPage } from './pages/SectorsPage';
import { ExhibitorsPage } from './pages/ExhibitorsPage';
import { VisitorsPage } from './pages/VisitorsPage';
import { PartnersPage } from './pages/PartnersPage';
import { NewsPage } from './pages/NewsPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  useEffect(() => {
    // Read page from query param or hash on load
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page') as PageId;
    if (pageParam && [
      'home', 'about', 'sectors', 'exhibitors', 'visitors', 'partners', 'news', 'contact', 'legal'
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

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navigation */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === 'sectors' && <SectorsPage onNavigate={handleNavigate} />}
        {currentPage === 'exhibitors' && <ExhibitorsPage onNavigate={handleNavigate} />}
        {currentPage === 'visitors' && <VisitorsPage onNavigate={handleNavigate} />}
        {currentPage === 'partners' && <PartnersPage onNavigate={handleNavigate} />}
        {currentPage === 'news' && <NewsPage onNavigate={handleNavigate} />}
        {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
        {currentPage === 'legal' && <LegalPage onNavigate={handleNavigate} />}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Privacy & Cookie Banner */}
      <CookieBanner />
    </div>
  );
}
