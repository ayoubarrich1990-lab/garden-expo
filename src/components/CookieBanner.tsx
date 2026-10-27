import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('garden_expo_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('garden_expo_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleRefuse = () => {
    localStorage.setItem('garden_expo_cookie_consent', 'refused');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-white border border-stone-300 shadow-xl rounded-xl p-4 text-xs text-stone-700 animate-fade-in">
      <div className="flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-semibold text-stone-900 mb-1">
            Respect de votre vie privée & Cookies
          </p>
          <p className="text-stone-600 leading-relaxed mb-3">
            Le site officiel Garden Expo Africa utilise des témoins de connexion nécessaires à la génération des badges visiteurs et à l'analyse de navigation, en conformité avec les directives de la CNDP.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAccept}
              className="px-3 py-1.5 bg-emerald-700 text-white rounded font-medium hover:bg-emerald-800 transition-colors"
            >
              Accepter tout
            </button>
            <button
              onClick={handleRefuse}
              className="px-3 py-1.5 bg-stone-100 text-stone-700 rounded font-medium hover:bg-stone-200 transition-colors"
            >
              Uniquement nécessaires
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
